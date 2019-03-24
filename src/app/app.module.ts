import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment/comment.component';
import { PostComponent } from './post/post.component';
import { PostContentComponent } from './post-content/post-content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IndexViewComponent } from './index-view/index-view.component';
import { BreifPostComponent } from './breif-post/breif-post.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    CommentEditorComponent,
    CommentSectionComponent,
    CommentComponent,
    PostComponent,
    PostContentComponent,
    IndexViewComponent,
    BreifPostComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
