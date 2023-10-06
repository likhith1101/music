import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { FormsModule } from '@angular/forms';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './auth.interceptor';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component'; 

@NgModule({
  declarations: [
  
    AppComponent,
    SongComponent,
    PlaylistComponent,
    LoginComponent,
    NavbarComponent,
    SearchComponent,
    AdminComponent,
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
 

      {
  
        provide: HTTP_INTERCEPTORS,
  
        useClass: AuthInterceptor,  
  
        multi: true,
  
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
