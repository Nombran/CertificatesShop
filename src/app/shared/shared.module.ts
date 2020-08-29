import { NgModule } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        AppRoutingModule
    ],
    exports: [
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        HeaderComponent
    ]
})
export class SharedModule { }