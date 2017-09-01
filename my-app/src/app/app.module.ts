import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TransformerDetailComponent } from './transformer-detail.component';
import { TransformersComponent } from "./transformers.component";
import { TransformerService } from "./transformer.service";
import { DashboardComponent } from "./dashboard.component";

import { AppRoutingModule } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    TransformerDetailComponent,
    TransformersComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ TransformerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
