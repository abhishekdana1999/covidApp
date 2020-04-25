import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SecurityModule } from "./security/security.module";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";
import { AuthService } from "./services/auth.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";
import { TabsPageModule } from './tabs/tabs.module';
import { DataService } from './services/data-services.service';
import { HttpClientModule } from '@angular/common/http';
import { NetworkService } from './services/network.service';
import { Network } from '@ionic-native/network/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ThemeService } from './services/theme.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Contacts } from "@ionic-native/contacts/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HTTP } from "@ionic-native/http/ngx"
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx"
@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    
   
    TabsPageModule,
    AppRoutingModule,
    SecurityModule,
    HttpClientModule,
    
    IonicSelectableModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    Network,
    AuthService,
    NetworkService,
    Geolocation,
    NativeGeocoder,
    ThemeService,
    DataService,
    InAppBrowser,
    Contacts,
    AndroidPermissions,
    ScreenOrientation,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent ],
})
export class AppModule {}
