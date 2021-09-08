import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './configuration/routing.configuration';
import { NavComponent } from './controls/nav/nav.component';
import { DynamicContentDirective } from './directives/dynamic-content.directive';
import { OverlayContainer as OverlayContainerComponent } from './controls/overlay-container/overlay-container.component';
import { TypingAnimationDirective } from './directives/typing-animation/typing-animation.directive';
import { GetPathCoordinatesPipe } from './pipes/get-path-coordinates.pipe';
import { IsVisibleAtPipe } from './pipes/is-visible-at.pipe';
import { NavigationMemoryService } from './services/navigation-memory.service';
import { OverlayService } from './services/overlay.service';
import { AboutMeComponent } from './views/about-me/about-me.component';
import { CareerPathStation as CareerPathStationComponent } from './views/about-me/career-path-station/career-path-station.component';
import { HomeComponent } from './views/home/home.component';
import { PortfolioWrapperComponent } from './views/portfolio-wrapper/portfolio-wrapper.component';
import { ModalComponent } from './controls/modal/modal.component';
import { ModalService } from './services/modal.service';
import { SkillsComponent } from './views/skills/skills.component';
import { PortfolioComponent } from './views/portfolio/portfolio.component';

@NgModule({
  declarations: [
    NavComponent,
    PortfolioWrapperComponent,
    OverlayContainerComponent,
    DynamicContentDirective,
    ModalComponent,

    HomeComponent,

    AboutMeComponent,
    CareerPathStationComponent,

    PortfolioComponent,

    SkillsComponent,

    TypingAnimationDirective,

    GetPathCoordinatesPipe,
    IsVisibleAtPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    NavigationMemoryService,
    OverlayService,
    ModalService
  ],
  bootstrap: [PortfolioWrapperComponent]
})
export class AppModule { }
