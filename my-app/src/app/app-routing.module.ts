import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DashboardComponent }   from './dashboard.component';
import { TransformersComponent }      from './transformers.component';
import { TransformerDetailComponent }  from './transformer-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
    path: 'transformers',
    component: TransformersComponent
    },
    {
    path: 'dashboard',
    component: DashboardComponent
    },
    {
    path: 'detail/:id',
    component: TransformerDetailComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}