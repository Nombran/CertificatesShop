import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './features/login/pages/login-page.component';
import { RegistrationPageComponent } from './features/registration/pages/registration-page.component'
import { SearchCertificatesPage } from './features/certificates/pages/search-page/search-certificates.component'
import { CreateTagPageComponent } from './features/tags/pages/create-page/create-page.component';
import { CreateCertificatePageComponent } from './features/certificates/pages/create-page/create-page.component';
import { EditCertificatePageComponent } from './features/certificates/pages/edit-page/edit-page.component'
import { ShoppingCardPageComponent } from './features/shopping-card/pages/shopping-card-page/shop-card.component'
import { ItemDetailsPageComponent } from './features/certificates/pages/item-details-page/item-details.component'
import { PastOrdersPageComponent } from './features/orders/pages/past-orders/past-orders.component';
import { OrderDetailsPageComponent } from './features/orders/pages/order-details/order-details.component'
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard'
import { IsLoggedGuard } from './core/guards/is-logged.guard'

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'certificates',
    children: [
      {
        path: 'created',
        component: SearchCertificatesPage,
      },
      {
        path: 'create',
        component: CreateCertificatePageComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'card',
        component: ShoppingCardPageComponent,
        canActivate: [UserGuard]
      },
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            component: EditCertificatePageComponent,
            canActivate: [AdminGuard]
          },
          {
            path: 'details',
            component: ItemDetailsPageComponent
          },
        ]
      },
      {
        path: '',
        component: SearchCertificatesPage
      }
    ]
  },
  {
    path: 'tags/create',
    component: CreateTagPageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'orders',
    children: [
      {
        path: ':id/details',
        component: OrderDetailsPageComponent,
        canActivate: [UserGuard]
      },
      {
        path: '',
        component: PastOrdersPageComponent,
        canActivate: [UserGuard]
      }
    ]
  },
  { path: '**', redirectTo: 'certificates' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
