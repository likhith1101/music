import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongComponent } from './song/song.component'; 
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
{ path:'songs',component : SongComponent},
{ path:'login',component: LoginComponent},
{ path:'search',component: SearchComponent},
{ path:'admin', component: AdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
