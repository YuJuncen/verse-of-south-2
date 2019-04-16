import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment/comment.component';
import { PostContentComponent } from './post-content/post-content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IndexViewComponent } from './index-view/index-view.component';
import { BreifPostComponent } from './breif-post/breif-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexPostListComponent } from './index-post-list/index-post-list.component';
import { SearchPostListComponent } from './search-post-list/search-post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { ArchivedPostListComponent } from './archived-post-list/archived-post-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    CommentEditorComponent,
    CommentSectionComponent,
    CommentComponent,
    PostContentComponent,
    IndexViewComponent,
    BreifPostComponent,
    NotFoundComponent,
    IndexPostListComponent,
    SearchPostListComponent,
    ArchiveListComponent,
    ArchivedPostListComponent,
    PostListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'verse-of-south'}),
    HttpClientModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
