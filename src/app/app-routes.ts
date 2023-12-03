import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (mod) => mod.HomePageComponent
      ),
  },
  {
    path: 'stories/data-grid-story',
    loadComponent: () =>
      import(
        './pages/stories/data-grid-story-page/data-grid-story-page.component'
      ).then((mod) => mod.DataGridStoryPageComponent),
  },
  {
    path: 'stories/progress-story',
    loadComponent: () =>
      import(
        './pages/stories/progress-story-page/progress-story-page.component'
      ).then((mod) => mod.ProgressStoryPageComponent),
  },
];
