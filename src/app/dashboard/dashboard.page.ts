import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  users: any[] = [];
  text = '';

  constructor(
    public authService: AuthService,
    private afStore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getUsers();
    this.registerPush();
  }

  registerPush() {
    console.log('requestPermission');
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      this.setTokenToUser(token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }

  setTokenToUser(token: string) {
    const user: any = JSON.parse(localStorage.getItem('user'));
    user.token = token;

    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.id}`);
    return userRef.update(user);
  }

  getUsers() {
    const currentUser: any = JSON.parse(localStorage.getItem('user'));

    this.afStore.collection('users').valueChanges()
      .pipe(
        map((users) => users.filter((item: any) => item.id !== currentUser.id))
      )
      .subscribe(users => {
        this.users = users.map((user: any) => ({...user, isChecked: false}));
      });
  }

  sendMessage() {
    if (!this.users || !this.users.length) { return; }

    const currentUser: any = JSON.parse(localStorage.getItem('user'));
    const users = this.users.filter(user => user.isChecked);
    if (users.length) {
      users.forEach(user => {
        const data = {
          body: this.text,
          messageId: user.id,
          token: user.token || null,
          userName: currentUser.displayName
        };
        this.afStore.collection('messages').add(data).then(() => {
          this.text = '';
          this.users.forEach(item => item.isChecked = false);
        });
      });
    }
  }
}
