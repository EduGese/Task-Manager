import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'completed-tasks',
    loadComponent: () => import('./pages/completed-tasks/completed-tasks.page').then( m => m.CompletedTasksPage)
  },
];
