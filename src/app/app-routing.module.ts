import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SelectiveStrategyService } from './core/services/selective-strategy.service';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'institute', canActivate: [AuthGuard], loadChildren: () => import('./modules/institute/institute.module').then(m => m.InstituteModule) },
  { path: 'manage', canActivate: [AuthGuard], loadChildren: () => import('./modules/manage/manage.module').then(m => m.ManageModule) },
  { path: 'plans', canActivate: [AuthGuard], loadChildren: () => import('./modules/plans/plans.module').then(m => m.PlansModule) },
  { path: 'institute-members', canActivate: [AuthGuard], loadChildren: () => import('./modules/institute-member/institute-member.module').then(m => m.InstituteMemberModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectiveStrategyService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
