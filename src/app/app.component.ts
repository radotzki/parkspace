import { ChooseFloor } from './../pages/choose-floor/choose-floor';
import { Login } from './../pages/login/login';
import { Auth } from './../providers/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private auth: Auth,
    ) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.auth.activeGroupObservable.subscribe(user => {
            if (!user) {
                this.rootPage = Login;
            } else {
                this.rootPage = ChooseFloor;
            }
        });
    }
}
