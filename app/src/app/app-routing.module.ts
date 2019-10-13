import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFormComponent } from './components/upload-form/upload-form.component';


const routes: Routes = [
  { path: 'upload',   component: UploadFormComponent },
  { path: '',   redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
