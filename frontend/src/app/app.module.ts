import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { AuthComponent } from '../auth/auth.component'
import { Routes, RouterModule } from '@angular/router'
import { UsersComponent } from '../users/users.component'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module';

const appRoutes: Routes = [
  { path: '', component: UsersComponent },
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
  declarations: [AppComponent], 
  bootstrap: [AppComponent]
})
export class AppModule {}
