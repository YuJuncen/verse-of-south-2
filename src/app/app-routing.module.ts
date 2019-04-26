import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { IndexViewComponent } from './index-view/index-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexPostListComponent } from './index-post-list/index-post-list.component';
import { SearchPostListComponent } from './search-post-list/search-post-list.component';
import { ArchivedPostListComponent } from './archived-post-list/archived-post-list.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'about', component: AboutPageComponent},
  { path: '', component: IndexViewComponent , children: [
    {path: '', component: IndexPostListComponent},
    {path: 'search', component: SearchPostListComponent},
    {path: 'archive/:year/:month', component: ArchivedPostListComponent}
  ]},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
