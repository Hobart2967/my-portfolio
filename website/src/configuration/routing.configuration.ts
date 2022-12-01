import { APP_INITIALIZER, NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AboutMeComponent } from '../views/about-me/about-me.component';
import { DataPrivacyComponent } from '../views/data-privacy/data-privacy.component';
import { HomeComponent } from '../views/home/home.component';
import { PortfolioComponent } from '../views/portfolio/portfolio.component';
import { SkillsComponent } from '../views/skills/skills.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'about-me',
  component: AboutMeComponent
}, {
  path: 'skills',
  component: SkillsComponent
}, {
  path: 'portfolio',
  component: PortfolioComponent
}, {
  path: 'data-privacy-legal',
  component: DataPrivacyComponent
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (router: Router) => {
        return () => {
          router.events
            .pipe(filter(x => x instanceof NavigationEnd))
            .subscribe(x => window.scrollTo({ top: 0 }));
        }
      },
      deps: [Router]
    }
  ]
})
export class AppRoutingModule { }
