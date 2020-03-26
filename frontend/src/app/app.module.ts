import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component'
import { AuthComponent } from '../auth/auth.component'
import { Routes, RouterModule } from '@angular/router'
import { UsersComponent } from '../users/users.component'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/auth/auth.service'
import { JwtInterceptor } from './jwt.interceptor'
import { JwtGuard } from './jwt.guard'

const appRoutes: Routes = [
  { path: '', component: UsersComponent, canActivate: [JwtGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    UsersModule,
    AuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    JwtGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  declarations: [AppComponent], 
  bootstrap: [AppComponent]
})
export class AppModule {}
