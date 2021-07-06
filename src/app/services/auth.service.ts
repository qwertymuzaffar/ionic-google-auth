import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Plugins } from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router
  ) { }

  async googleAuth() {
    const googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    this.setUserData(googleUser);
  }

  // Store user in localStorage
  setUserData(googleUser) {
    localStorage.setItem('user', JSON.stringify(googleUser));
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${googleUser.id}`);
    return userRef.set(googleUser, {
      merge: true
    }).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
