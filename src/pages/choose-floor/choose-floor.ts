import { Meme } from './../meme/meme';
import { Api } from './../../providers/api';
import { Auth } from './../../providers/auth';
import { FloorThree } from './../floor-three/floor-three';
import { FloorTwo } from './../floor-two/floor-two';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

const spacesFloorTwo = 30;
const spacesFloorThree = 10;

@IonicPage()
@Component({
    selector: 'page-choose-floor',
    templateUrl: 'choose-floor.html',
})
export class ChooseFloor {
    text: string;
    showExit: boolean;
    emptySpacesFloorTwo: number;
    emptySpacesFloorThree: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private auth: Auth,
        private api: Api,
    ) { }

    ionViewDidLoad() {
        this.text = `Good ${this.getGreetingTime()}, ${this.auth.activeUser.name}!`;
        this.auth.activeParkingObservable.subscribe(resp => this.showExit = !!resp);
        this.api.getParkings().subscribe(resp => {
            this.emptySpacesFloorTwo = resp
                .filter(p => p.level === 2)
                .reduce((sum, p) => p.occupiedBy ? sum - 1 : sum, spacesFloorTwo);

            this.emptySpacesFloorThree = resp
                .filter(p => p.level === 3)
                .reduce((sum, p) => p.occupiedBy ? sum - 1 : sum, spacesFloorThree);
        })
    }

    getGreetingTime() {
        var afternoon = 12;
        var evening = 17;
        var currentHour = (new Date()).getHours();

        if (currentHour >= afternoon && currentHour <= evening) {
            return "Afternoon";
        } else if (currentHour >= evening) {
            return "Evening";
        } else {
            return "Morning";
        }
    }

    choose(floor: number) {
        if (floor === 2) {
            this.navCtrl.push(FloorTwo);
        } else {
            this.navCtrl.push(FloorThree);
        }
    }

    exit() {
        this.api.exitParking(this.auth.parking).then(() => {
            this.auth.parking = null;
            this.modalCtrl.create(Meme).present();
        });
    }

}
