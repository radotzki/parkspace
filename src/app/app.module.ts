import { Meme } from './../pages/meme/meme';
import { TimePicker } from './../pages/time-picker/time-picker';
import { Api } from './../providers/api';
import { FloorTwoModule } from './../pages/floor-two/floor-two.module';
import { FloorThreeModule } from './../pages/floor-three/floor-three.module';
import { ChooseFloorModule } from './../pages/choose-floor/choose-floor.module';
import { LoginModule } from './../pages/login/login.module';
import { Auth } from './../providers/auth';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        TimePicker,
        Meme,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        LoginModule,
        ChooseFloorModule,
        FloorTwoModule,
        FloorThreeModule,
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TimePicker,
        Meme,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Auth,
        Api,
    ]
})
export class AppModule { }
