import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './features/login/pages/login-page.component';
import { RegistrationPageComponent } from './features/registration/pages/registration-page.component'
import { SearchCertificatesPage } from './features/certificates/pages/search-page/search-certificates.component'
import { CreateTagPageComponent } from './features/tags/pages/create-page/create-page.component';
import { CreateCertificatePageComponent } from './features/certificates/pages/create-page/create-page.component';
import { EditCertificatePageComponent } from './features/certificates/pages/edit-page/edit-page.component'

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'certificates', component: SearchCertificatesPage},
  {path: 'tags/create', component: CreateTagPageComponent},
  {path: 'certificates/create', component: CreateCertificatePageComponent},
  {path: 'certificates/:id/edit', component: EditCertificatePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
