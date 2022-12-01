import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SelectiveStrategyService } from './core/services/selective-strategy.service';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectiveStrategyService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
