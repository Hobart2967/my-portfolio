import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './configuration/routing.configuration';
import { NavComponent } from './controls/nav/nav.component';
import { TypingAnimationDirective } from './directives/typing-animation/typing-animation.directive';
import { GetPathCoordinatesPipe } from './pipes/get-path-coordinates.pipe';
import { IsVisibleAtPipe } from './pipes/is-visible-at.pipe';
import { AboutMeComponent } from './views/about-me/about-me.component';
import { HomeComponent } from './views/home/home.component';
import { PortfolioWrapperComponent } from './views/portfolio-wrapper/portfolio-wrapper.component';

@NgModule({
  declarations: [
    PortfolioWrapperComponent,
    HomeComponent,
    TypingAnimationDirective,
    NavComponent,
    AboutMeComponent,

    GetPathCoordinatesPipe,
    IsVisibleAtPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [PortfolioWrapperComponent]
})
export class AppModule { }
