import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from '../views/about-me/about-me.component';
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
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
