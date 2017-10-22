import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';

import Admin from './admin/admin.component';
import AdminForm from './admin/admin-form/admin-form.component';

import { ConfigurationService } from './services/configuration.service';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: Admin
  }
];

@NgModule({
  declarations: [
    AppComponent,
    Admin,
    AdminForm
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HomeModule
  ],
  providers: [ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
