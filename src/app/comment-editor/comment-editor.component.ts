import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import config from '../app.config';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { Observable, Subject, merge, of } from 'rxjs';
import { tap, map, shareReplay, catchError, finalize } from 'rxjs/operators';
import { Comment } from '../comment-section/comment';
import { PostReadService } from '../post-read.service';
import { ApplicationContextService } from '../application-context.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnInit {
  @Input("replyTo") replyTo$: Observable<Comment>;
  @Output("newComment") newComment = new EventEmitter<Comment>();
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
    to: new FormControl('', Validators.required),
    replyTo: new FormControl('')
  });
  siteKey: string = config.recaptchaWebsiteKey;
  constructor(
    private snake: MatSnackBar,
    private post : PostReadService, 
    private ctx: ApplicationContextService,
    private aroute : ActivatedRoute) { }

  discardReply() {
    this.discardReply$.next([]);
  }

  get author() {
    return this.commentForm.get('author');
  }
  get content() {
    return this.commentForm.get('content');
  }
  get email() {
    return this.commentForm.get('email');
  }
  get recaptcha() {
    return this.commentForm.get('recaptcha');
  }
  get replyTo() {
    return this.commentForm.get('replyTo');
  }
  get errors() {
    return JSON.stringify(Object.entries(this.commentForm.controls).map(c => [c[0], JSON.stringify(c[1].errors)]).join(" || "));
  }
  get to() {
    return this.commentForm.get("to");
  }

  resetAll() {
    this.author.reset();
    this.email.reset();
    this.recaptcha.reset();
    this.discardReply$.next([]);
    this.content.reset();
  }

  toPublish() {
    if (this.commentForm.valid) {
      console.info(`congruations! you just published : ${JSON.stringify(this.commentForm.value)}`)
      this.post.postCommment(this.author.value, this.content.value, this.to.value, {
        email: this.email.value || null,
        replyTo: this.replyTo.value || null,
        recaptcha: this.recaptcha.value
      }).pipe(
        catchError( (e) => {
          console.error(e);
          this.snake.open(`失败了，具体的记录应该在控制台里面……`, "……", this.ctx.getValue('error-snackbar-config'));
          return of(null);
        }),
        finalize(this.resetAll)
      ).subscribe(c => {
        if (c) this.newComment.emit(c);
      })
    } else {
      console.warn(`congruations! you cannot publish your comment since: ${this.errors}`)
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
    this.aroute.params
      .pipe(
        tap(p => console.debug("params: ", p)),
        map(p => Number.parseInt(p['id'])),
        catchError(_ => of(-1))
      )
      .subscribe(id => this.to.setValue(id))
  }

}
