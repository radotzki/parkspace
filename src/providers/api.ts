import { Parking, User } from './../interfaces';
import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { initializeApp } from 'firebase';
import { Http } from "@angular/http";
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/toPromise';

const firebase = initializeApp({
    apiKey: "AIzaSyA28SXr2r56wtGyNc6GzAXbnurpdVvh4Po",
    authDomain: "parkspace-b9fe9.firebaseapp.com",
    databaseURL: "https://parkspace-b9fe9.firebaseio.com",
    projectId: "parkspace-b9fe9",
    storageBucket: "parkspace-b9fe9.appspot.com",
    messagingSenderId: "1034737790685"
});

@Injectable()
export class Api {
    parkingsRef: firebase.database.Reference;

    constructor(
        private zone: NgZone,
        private http: Http,
    ) {
        this.parkingsRef = firebase.database().ref('parkings');
    }

    getParkings(): Observable<Parking[]> {
        return this.observe(this.parkingsRef)
            .map(resp => Object.keys(resp).map(key => Object.assign(resp[key], { id: key })));
    }

    selectParking(parking: Parking, occupiedBy: User, expires: string) {
        return this.parkingsRef.child(parking.id).update({ occupiedBy, expires });
    }

    selectInvador(parking: Parking, plateNumber) {
        const to = 'ogeva@blackberry.com';
        const subject = `Invador!`;
        const text = `Car number: ${plateNumber} is parking in spot #${parking.serial} (level ${parking.level})`;
        const mailPromise = this.post('sendMail', { to, subject, text });
        const dbPromise = this.parkingsRef.child(parking.id).update({ invador: plateNumber });
        return Promise.all([mailPromise, dbPromise]);
    }

    removeInvador(parking: Parking) {
        return this.parkingsRef.child(parking.id).update({ invador: false });
    }

    exitParking(parking: Parking) {
        return this.parkingsRef.child(parking.id).update({ occupiedBy: null, expires: null });
    }

    notifyBlocking(blockedUser: User, blockingUser: User) {
        const to = blockedUser.email;
        const subject = `You have been blocked by ${blockingUser.name}`;
        const text = `You have been blocked by ${blockingUser.name}.\nPhone: ${blockingUser.phone}\nEmail: ${blockingUser.email}`;
        this.post('sendMail', { to, subject, text });
    }

    private post<T>(url: string, body: Object = {}): Promise<T> {
        return this.http.post('https://us-central1-parkspace-b9fe9.cloudfunctions.net/' + url, body)
            .toPromise()
            .then(resp => resp.json(), resp => Promise.reject(resp.json()));
    }

    private observe<T>(query: firebase.database.Query, eventType = 'value') {
        return new Observable<T>((observer: Subscriber<T>) => {
            const listener = query.on(eventType, snap => {
                this.zone.run(() => {
                    observer.next(snap.val() as T);
                });
            }, err => observer.error(err));

            return () => query.off(eventType, listener);
        }).publish().refCount();
    }

    // private get<T>(ref): Promise<T> {
    //     return ref.once('value').then(s => s.val());
    // }
}
