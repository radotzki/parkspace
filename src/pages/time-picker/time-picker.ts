import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";

@Component({
    templateUrl: 'time-picker.html',
})
export class TimePicker {

    constructor(
        public viewCtrl: ViewController,
    ) { }

    dismiss(res) {
        this.viewCtrl.dismiss(res);
    }
}
