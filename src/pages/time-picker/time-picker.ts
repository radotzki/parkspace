import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";

@Component({
    templateUrl: 'time-picker.html',
})
export class TimePicker {
    showOnlyInvador: boolean;

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
    ) {
        this.showOnlyInvador = this.params.data.parked;
    }

    dismiss(res) {
        this.viewCtrl.dismiss(res);
    }
}
