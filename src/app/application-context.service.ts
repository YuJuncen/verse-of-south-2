import { Injectable, Output, EventEmitter } from '@angular/core';

class ContextValue<T> {
  constructor(public value: T,  public replaceable: boolean = true) {}
}

class ConfilctedKey<T> {
  constructor(public keyname: string, public oldValue: T, public replaced: boolean) { }
  static failedToReplace(keyname: string) { return new ConfilctedKey(keyname, null, false); }
  static replaced<T>(victim: string, oldvalue: T) { return new ConfilctedKey(victim, oldvalue, true); }
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationContextService {
  @Output() confilct : EventEmitter<ConfilctedKey<any>> = new EventEmitter(); 
  private values : Map<string, ContextValue<any>> = new Map();
  constructor() { }

  public putValue(name: string, value: any, config: {replaceable: boolean} = {replaceable: true}) : boolean {
    if (this.values[name]) {
      if (this.values.get(name).replaceable) {
        this.confilct.emit(ConfilctedKey.replaced(name, this.values.get(name).value));
        this.values.set(name, new ContextValue(value, config.replaceable))
        return true;
      } 
      this.confilct.emit(ConfilctedKey.failedToReplace(name));
      return false;
    }
    this.values.set(name, new ContextValue(value, config.replaceable));
    return true;
  }

  public getValue<T>(name: string, defaultValue: T = null) : T {
    try {
      return <T>this.values.get(name).value;
    } catch (e) {
      return defaultValue;
    }
  }
}
