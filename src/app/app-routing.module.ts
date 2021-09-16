import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuardService } from './shared/guards/guest-guard.service';
import { AuthGuardService } from './shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'guest',
    loadChildren: () => import('./modules/unregistered-user/unregistered-user.module').then(m => m.UnregisteredUserModule),
    canActivate: [GuestGuardService]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/registered-user/registered-user.module').then(m => m.RegisteredUserModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**', redirectTo: 'guest'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
