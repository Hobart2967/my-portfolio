import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './configuration/routing.configuration';
import { TypingAnimationDirective } from './directives/typing-animation/typing-animation.directive';
import { HomeComponent } from './views/home/home.component';
import { PortfolioWrapperComponent } from './views/portfolio-wrapper/portfolio-wrapper.component';

@NgModule({
  declarations: [
    PortfolioWrapperComponent,
    HomeComponent,
    TypingAnimationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [PortfolioWrapperComponent]
})
export class AppModule { }
