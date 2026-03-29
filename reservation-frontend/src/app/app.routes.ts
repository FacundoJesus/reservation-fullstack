import { Routes } from '@angular/router';
import { ReservationCreateComponent } from './component/reservation-create.component';
import { ReservationListComponent } from './component/reservation-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reservas',
    pathMatch: 'full'
  },
  {
    path: 'reservas',
    component: ReservationListComponent
  },
  {
    path: 'reservas/nuevo',
    component: ReservationCreateComponent
  }
];
