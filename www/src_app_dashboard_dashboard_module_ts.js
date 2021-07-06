(self["webpackChunkdevdacticLogin"] = self["webpackChunkdevdacticLogin"] || []).push([["src_app_dashboard_dashboard_module_ts"],{

/***/ 425:
/*!*******************************************************!*\
  !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPageRoutingModule": () => (/* binding */ DashboardPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.page */ 5935);




const routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_0__.DashboardPage
    }
];
let DashboardPageRoutingModule = class DashboardPageRoutingModule {
};
DashboardPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], DashboardPageRoutingModule);



/***/ }),

/***/ 4814:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPageModule": () => (/* binding */ DashboardPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard-routing.module */ 425);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.page */ 5935);







let DashboardPageModule = class DashboardPageModule {
};
DashboardPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_0__.DashboardPageRoutingModule
        ],
        declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_1__.DashboardPage]
    })
], DashboardPageModule);



/***/ }),

/***/ 5935:
/*!*********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardPage": () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./dashboard.page.html */ 2836);
/* harmony import */ var _dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.page.scss */ 8043);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ 591);
/* harmony import */ var _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/push-notifications */ 8748);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ 7556);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8002);








let DashboardPage = class DashboardPage {
    constructor(authService, afStore) {
        this.authService = authService;
        this.afStore = afStore;
        this.users = [];
        this.text = '';
    }
    ngOnInit() {
        this.getUsers();
        this.registerPush();
    }
    registerPush() {
        console.log('requestPermission');
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__.PushNotifications.requestPermissions().then(result => {
            if (result.receive === 'granted') {
                // Register with Apple / Google to receive push via APNS/FCM
                _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__.PushNotifications.register();
            }
            else {
                // Show some error
            }
        });
        _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__.PushNotifications.addListener('registration', (token) => {
            console.log('Push registration success, token: ' + token.value);
            this.setTokenToUser(token.value);
        });
        _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__.PushNotifications.addListener('registrationError', (error) => {
            console.log('Error on registration: ' + JSON.stringify(error));
        });
        _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__.PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Push received: ' + JSON.stringify(notification));
        });
        _capacitor_push_notifications__WEBPACK_IMPORTED_MODULE_2__.PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            console.log('Push action performed: ' + JSON.stringify(notification));
        });
    }
    setTokenToUser(token) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.token = token;
        const userRef = this.afStore.doc(`users/${user.id}`);
        return userRef.update(user);
    }
    getUsers() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        this.afStore.collection('users').valueChanges()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((users) => users.filter((item) => item.id !== currentUser.id)))
            .subscribe(users => {
            this.users = users.map((user) => (Object.assign(Object.assign({}, user), { isChecked: false })));
        });
    }
    sendMessage() {
        if (!this.users || !this.users.length) {
            return;
        }
        const currentUser = JSON.parse(localStorage.getItem('user'));
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
};
DashboardPage.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__.AngularFirestore }
];
DashboardPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-dashboard',
        template: _raw_loader_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], DashboardPage);



/***/ }),

/***/ 8043:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.page.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".spinner-group {\n  text-align: center;\n  margin-top: 20px;\n}\n.spinner-group__spinner {\n  width: 35px;\n  height: 35px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFDRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBQ0oiLCJmaWxlIjoiZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zcGlubmVyLWdyb3VwIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuXHJcbiAgJl9fc3Bpbm5lciB7XHJcbiAgICB3aWR0aDogMzVweDtcclxuICAgIGhlaWdodDogMzVweDtcclxuICB9XHJcbn1cclxuIl19 */");

/***/ }),

/***/ 2836:
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.page.html ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\r\n  <ion-toolbar>\r\n      <ion-buttons slot=\"start\">\r\n        <ion-back-button></ion-back-button>\r\n      </ion-buttons>\r\n    <ion-title>Dashboard</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ng-container *ngIf=\"users && users.length; else noData\">\r\n    <ion-list>\r\n      <ion-item *ngFor=\"let user of users\">\r\n        <ion-label>{{user.displayName}}</ion-label>\r\n        <ion-checkbox slot=\"end\"\r\n                      [(ngModel)]=\"user.isChecked\"></ion-checkbox>\r\n      </ion-item>\r\n      <ion-item>\r\n        <ion-textarea [(ngModel)]=\"text\" placeholder=\"Enter text\"></ion-textarea>\r\n      </ion-item>\r\n    </ion-list>\r\n\r\n    <ion-button (click)=\"sendMessage()\"\r\n                expand=\"block\">Send</ion-button>\r\n\r\n    <ion-button type=\"submit\"\r\n                (click)=\"authService.signOut()\"\r\n                color=\"danger\"\r\n                expand=\"block\">Logout</ion-button>\r\n  </ng-container>\r\n\r\n  <ng-template #noData>\r\n    <div class=\"spinner-group\">\r\n      <ion-spinner class=\"spinner-group__spinner\" name=\"lines\"></ion-spinner>\r\n    </div>\r\n  </ng-template>\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=src_app_dashboard_dashboard_module_ts.js.map