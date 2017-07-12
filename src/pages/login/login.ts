import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {

    constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Login');
    }

    login(name: string, email: string, phone: string) {
        this.auth.activeUser = { name, email, phone };
    }

}
