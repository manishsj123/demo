import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  
import { RouterModule } from '@angular/router';

const appConfig = {
  providers: [], 
};

const enhancedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule, RouterModule.forRoot(routes)),
  ],
};

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));
