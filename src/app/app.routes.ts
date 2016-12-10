import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishedGoodsRoutes }    from './finished-goods/finished-goods.routes';


// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/fgp',
    pathMatch: 'full'
  },
  ...FinishedGoodsRoutes
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);