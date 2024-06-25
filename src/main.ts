import { enableProdMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
     import { bootstrapApplication } from '@angular/platform-browser';
     import { RouteReuseStrategy, provideRouter } from '@angular/router';
     import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
     import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
     import { routes } from './app/app.routes';
     import { AppComponent } from './app/app.component';
     import { environment } from './environments/environment';
     import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
     import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
     import { Capacitor } from '@capacitor/core';
     import { InitializeAppService } from './app/services/initialize.app.service';
     import { SQLiteService } from './app/services/sqlite.service';
     import { StorageService } from './app/services/storage.service';
     import { DbnameVersionService } from './app/services/dbname-version.service';
     import { addIcons } from 'ionicons';
     import { arrowUndoOutline, closeCircle, trash, close, settings, 
        settingsOutline, hammerOutline, personOutline, bookOutline,
        homeOutline, cashOutline, medkitOutline, beerOutline, 
        helpCircleOutline,addSharp, closeCircleOutline, createOutline,
        calendarOutline, listCircleOutline,
        checkmarkDoneOutline,
        timerOutline,
        arrowForwardOutline,
        arrowBackOutline,
        } from 'ionicons/icons'; 
   
     if (environment.production) {
         enableProdMode();
     }
     // --> Below only required if you want to use a web platform
     const platform = Capacitor.getPlatform();
     if(platform === "web") {
         // Web platform
         // required for toast component in Browser
         pwaElements(window);

         // required for jeep-sqlite Stencil component
         // to use a SQLite database in Browser
         jeepSqlite(window);

         window.addEventListener('DOMContentLoaded', async () => {
             const jeepEl = document.createElement("jeep-sqlite");
             document.body.appendChild(jeepEl);
             await customElements.whenDefined('jeep-sqlite');
             jeepEl.autoSave = true;
         });
     }
     // Above only required if you want to use a web platform <--
    
     // Define the APP_INITIALIZER factory
     export function initializeFactory(init: InitializeAppService) {
         return () => init.initializeApp();
     }
     addIcons({
        'close-circle': closeCircle,
        'trash': trash,
        'arrow-undo-outline': arrowUndoOutline,
        'close': close,
        'close-circle-outline': closeCircleOutline,
        'settings': settings,
        'settings-outline': settingsOutline,
        'hammer-outline': hammerOutline,
        'person-outline': personOutline,
        'book-outline': bookOutline,
        'home-outline': homeOutline,
        'cash-outline': cashOutline,
        'medkit-outline': medkitOutline,
        'beer-outline': beerOutline,
        'help-circle-outline': helpCircleOutline,
        'add-sharp': addSharp,
        'create-outline': createOutline,
        'calendar-outline': calendarOutline,
        'list-circle-outline': listCircleOutline,
        'checkmark-done-outline': checkmarkDoneOutline,
        'timer-outline': timerOutline,
        'arrow-fordward-outline': arrowForwardOutline,  
        'arrow-back-outline': arrowBackOutline,   
      });

     bootstrapApplication(AppComponent, {
         providers: [SQLiteService,
             InitializeAppService,
             StorageService,
             DbnameVersionService,
             { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
             importProvidersFrom(IonicModule.forRoot({}), BrowserAnimationsModule,),
             provideRouter(routes),
             {
             provide: APP_INITIALIZER,
             useFactory: initializeFactory,
             deps: [InitializeAppService],
             multi: true
             }
         ],
     });