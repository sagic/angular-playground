import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app-routes';
import {
  PreloadAllModules,
  provideRouter,
  // withDebugTracing,
  withPreloading,
} from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules)
      // withDebugTracing()
    ),
  ],
});
