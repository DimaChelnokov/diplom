import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component'
import { AuthComponent } from './auth/auth.component'
import { Routes, RouterModule } from '@angular/router'
import { UsersComponent } from './users/users.component'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module';
import { AuthService } from 'src/app/auth/auth.service'
import { JwtInterceptor } from './jwt.interceptor'
import { JwtGuard } from './jwt.guard'
import { RegModule } from './reg/reg.module'
import { RegComponent } from './reg/reg.component'
import { AccComponent } from 'src/app/acc/acc.component'
import { AccModule } from 'src/app/acc/acc.module'
import { GroupsComponent } from './groups/groups.component'
import { GroupsModule } from './groups/groups.module'

const appRoutes: Routes = [
  { path: '', component: UsersComponent, canActivate: [JwtGuard] },
  { path: 'users', component: UsersComponent, canActivate: [JwtGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [JwtGuard] },
  { path: 'reg', component: RegComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: AccComponent, canActivate: [JwtGuard] },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    UsersModule,
    AuthModule,
    RegModule,
    AccModule,
    GroupsModule,
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
