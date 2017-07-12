import { User, Parking } from './../interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const ACTIVE_USER_KEY = 'ACTIVE_USER';
const ACTIVE_PARKING_KEY = 'ACTIVE_PARKING';

@Injectable()
export class Auth {
    private activeUserSubject = new BehaviorSubject(this.activeUser);
    private activeParkingSubject = new BehaviorSubject(this.parking);

    constructor() { }

    get activeUser(): User {
        const user = localStorage.getItem(ACTIVE_USER_KEY);
        return user ? JSON.parse(user) : undefined;
    }

    set activeUser(user: User) {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
        this.activeUserSubject.next(user);
    }

    get activeGroupObservable() {
        return this.activeUserSubject.asObservable();
    }

    get parking(): Parking {
        const p = localStorage.getItem(ACTIVE_PARKING_KEY);
        return p ? JSON.parse(p) : undefined;
    }

    set parking(parking: Parking) {
        localStorage.setItem(ACTIVE_PARKING_KEY, JSON.stringify(parking));
        this.activeParkingSubject.next(parking);
    }

    get activeParkingObservable() {
        return this.activeParkingSubject.asObservable();
    }
}
