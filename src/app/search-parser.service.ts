import { Injectable } from '@angular/core';
import { parse, text } from 'bennu';
import { stream } from 'nu-stream';

@Injectable({
  providedIn: 'root'
})
export class SearchParserService {
  constructor() { }

  /*
    search-string ::= search-term*\w+
    search-term ::= '#{'tag-name'}' | search-title | 'r{'regex'}'
  */
  private toArray = s => parse.always(stream.toArray(s).join(''));
  private regex = parse.bind(this.bracketed('r{', '}'), s => parse.always(({type: 'regex', term: s})));
  private tag = parse.bind(this.bracketed('#{', '}'), s => parse.always(({type: 'tag', term: s})));
  private title = parse.bind(parse.bind(parse.many(parse.anyToken), this.toArray), s => parse.always(({type: 'plain', term: s})));
  private searchTerm = parse.choice(this.regex, this.tag, this.title);
  bracketed(left, right) {
    const p = parse.next(text.string(left), parse.manyTill(parse.anyToken, text.string(right)));
    return parse.bind(p, this.toArray);
  }
  parse(s: string): object {
    const r = {tag: [], regex: [], plain: []};
    const tokens = s.split(/\s+/);
    const parseResult = tokens.map(s => parse.run(this.searchTerm, s));
    parseResult.filter(s => s.term.length !== 0).forEach(({type, term}) => r[type].push(term));
    return r;
  }
}
