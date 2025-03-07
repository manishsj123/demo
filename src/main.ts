import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  
import { RouterModule } from '@angular/router';
import { CONFIG, DataService, NgeExplorerConfig } from 'ngx-explorer';
import { FileExplorerService } from './app/file-m/file-explorer.service';

const appConfig = {
  providers: [], 
};

const enhancedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule, RouterModule.forRoot(routes)),
    { provide: DataService, useClass: FileExplorerService },
    {
      provide: CONFIG,
      useValue: {
        homeNodeName: 'Home',
        defaultView: 'Icons',
        multipleSelection: true,
        features: {
          delete: true,
          upload: true,
          download: true,
          rename: true,
          createDir: true,
        },
      } as NgeExplorerConfig,
    },
  ],
};

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));