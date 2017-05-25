import { Component } from '@angular/core';
import {App, Platform} from 'ionic-angular';

//import { Platform } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Meteor } from 'meteor/meteor';
import { LoginPage } from '../pages/login/login';

import { ChatsPage } from '../pages/chats/chats';
//import template from "./app.html";

// declare var ss: SplashScreen;
// declare var sb: StatusBar;

//@App({
//  template: '<ion-nav [root]="rootPage"></ion-nav>',
//  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
//})

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  //config: {} // http://ionicframework.com/docs/v2/api/config/Config/

})


export class MyApp {
  rootPage: any;
  //sb: StatusBar;
  //ss: SplashScreen;
  //constructor(platform: Platform, sb: StatusBar, ss: SplashScreen) {
  
  constructor(platform: Platform) {
	this.rootPage = Meteor.user() ? ChatsPage : LoginPage;
  //this.rootPage = ChatsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('cordova')) {
        // sb.styleDefault();
        // ss.hide();
      }
    });
  }
}


