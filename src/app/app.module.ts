import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './support';

import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './support';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { EmployeeComponent } from './employee/employee.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    EmployeeComponent,
    HomeComponent,
    LoginComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
