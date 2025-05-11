import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';

// Configuracion de Firebase para la aplicacion y la inicilizacion de la aplicacion
bootstrapApplication(AppComponent, {
  providers: [
    // Designacion del proveedor de Firebase
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // Proveedor de rutas
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // Proveedor de Ionic
    provideIonicAngular(),
    // Estrategia de reuso de rutas
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
});