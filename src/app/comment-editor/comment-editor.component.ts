import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import config from '../app.config';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { Observable, Subject, merge } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { Comment } from '../comment-section/comment';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnInit {
  @Input("replyTo") replyTo$: Observable<Comment>;
  discardReply$ : Subject<[]> = new Subject<[]>();
  whoToReply$: Observable<string>;
  hasSomeoneToReply$: Observable<boolean>;

  commenting = false;
  commentForm: FormGroup =  new FormGroup({
    // 如果能够从服务器获取配置就好了……
    author: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    content: new FormControl('', [Validators.required, Validators.maxLength(2048)]),
    email: new FormControl('', [Validators.email, Validators.maxLength(64)]),
    recaptcha: new FormControl('', Validators.required),
    replyTo: new FormControl('')
  });
  siteKey: string = config.recaptchaWebsiteKey;
  constructor(private form: FormBuilder) { }
  discardReply() {
    this.discardReply$.next([]);
  }

  toPublish() {
    if (this.commentForm.valid) {
      alert(`congruations! you just published : ${JSON.stringify(this.commentForm.value)}`)
    } else {
      alert(`congruations! you cannot publish your comment since: ${JSON.stringify(this.commentForm.errors)}`)
    }
    console.log(this.commentForm);
  }

  ngOnInit() {
    this.replyTo$ = this.replyTo$.pipe(
      tap(p => console.debug(`replying to ${p.publisherName}`)), 
      shareReplay(1)
    );
    this.hasSomeoneToReply$ = merge(
      this.replyTo$.pipe(map(_ => true)), 
      this.discardReply$.pipe(map(_ => false)))
    this.whoToReply$ = this.replyTo$.pipe(map(c => c.publisherName));
    merge(this.replyTo$.pipe(map(c => c.id)), this.discardReply$.pipe(map(any => -1)))
      .subscribe(i => {
        const replyToInput = this.commentForm.get('replyTo');
        if (i < 0) replyToInput.reset();
        else replyToInput.setValue(i);
      })
  }

}
