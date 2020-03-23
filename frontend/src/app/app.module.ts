import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { AuthComponent } from './auth/auth.component'

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, AuthComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
