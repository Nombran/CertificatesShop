import { NgModule } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        HeaderComponent
    ]
})
export class SharedModule { }