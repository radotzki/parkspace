import { TimePicker } from './../time-picker/time-picker';
import { Auth } from './../../providers/auth';
import { Api } from './../../providers/api';
import { Parking } from './../../interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-floor-three',
    templateUrl: 'floor-three.html',
})
export class FloorThree {
    parkingsFront: Parking[];
    parkingsRear: Parking[];
    parked: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private api: Api,
        private auth: Auth,
    ) { }

    ionViewDidLoad() {
        this.parked = !!this.auth.parking;
        this.api.getParkings()
            .map(resp => resp.filter(p => p.level === 3))
            .map(resp => resp.sort((a, b) => a.serial > b.serial ? 1 : -1))
            .subscribe(resp => {
                this.parkingsFront = resp.filter(p => !p.serial.includes('A'))
                this.parkingsRear = resp.filter(p => p.serial.includes('A'))
            });
    }

    select(parking: Parking) {
        if (parking.occupiedBy) {
            return;
        }

        let modal = this.modalCtrl.create(TimePicker)
        modal.present();
        modal.onDidDismiss(expires => {
            if (!expires) {
                return;
            }

            this.api.selectParking(parking, this.auth.activeUser, expires)
                .then(() => {
                    this.auth.parking = parking;
                    this.parked = true;

                    if (!parking.serial.includes('A')) {
                        const blockedParking = this.parkingsRear.find(p => p.serial.replace('A', '') === parking.serial);
                        const blockedUser = blockedParking ? blockedParking.occupiedBy : null;

                        if (blockedUser) {
                            this.api.notifyBlocking(blockedUser, this.auth.activeUser);
                        }
                    }
                });
        });
    }

}
