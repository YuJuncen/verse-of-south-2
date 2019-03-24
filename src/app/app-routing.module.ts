import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { IndexViewComponent } from './index-view/index-view.component'
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [ 
  { path: "post/:id", component: PostDetailComponent } ,
  { path: "", component: IndexViewComponent },
  { path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
