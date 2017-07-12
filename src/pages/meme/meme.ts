import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";

const memes = [
    'assets/meme-1.jpg',
    'assets/meme-2.jpg',
    'assets/meme-3.jpg',
];

@Component({
    templateUrl: 'meme.html',
})
export class Meme {
    src: string;

    constructor(
        public viewCtrl: ViewController,
    ) {
        const idx = Math.floor(Math.random() * memes.length);
        this.src = memes[idx];
        setTimeout(() => this.viewCtrl.dismiss(), 5000);
    }
}
