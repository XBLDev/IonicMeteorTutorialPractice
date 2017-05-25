

import { NgModule, ErrorHandler } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChatsPage } from '../pages/chats/chats';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ChatsOptionsComponent } from '../pages/chats/chats-options';
import { NewChatComponent } from '../pages/chats/new-chat';
import { MessagesOptionsComponent } from '../pages/messages/messages-options';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { NewLocationMessageComponent } from '../pages/messages/location-message';

import { PhoneService } from '../services/phone';

import { MyApp } from './app.component';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesAttachmentsComponent } from '../pages/messages/messages-attachments';
import { VerificationPage } from '../pages/verification/verification';

import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

let moduleDefinition;

class splashscreenMock
//extends SplashScreen
 {

}

if (Meteor.isCordova) {


    moduleDefinition = {
  imports: [
  //  StatusBar,
	//  SplashScreen,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    })
  ],
  declarations: [
    MyApp,
    ChatsPage,
	MessagesPage,
	LoginPage,
	VerificationPage,
	ProfilePage,
	ChatsOptionsComponent,
	NewChatComponent,
	MessagesOptionsComponent,
	MessagesAttachmentsComponent,
    NewLocationMessageComponent
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
	MessagesPage,
	LoginPage,
	VerificationPage,
	ProfilePage,
	ChatsOptionsComponent,
	NewChatComponent,
	MessagesOptionsComponent,
	MessagesAttachmentsComponent,
	NewLocationMessageComponent
  ],
  providers: [
   //StatusBar,
   //SplashScreen,
   //Geolocation,  
   PhoneService,
   { provide: ErrorHandler, useClass: IonicErrorHandler },
	 //{ provide: SplashScreen, useClass: splashscreenMock},

    

  ]	
	
	
    }
}
else {
    moduleDefinition = {
  declarations: [
    MyApp,
    ChatsPage,
	MessagesPage,
	LoginPage,
	VerificationPage,
	ProfilePage,
	ChatsOptionsComponent,
	NewChatComponent,
	MessagesOptionsComponent,
	MessagesAttachmentsComponent,
    NewLocationMessageComponent
  ],
  imports: [
    //StatusBar,
	//SplashScreen,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
	MessagesPage,
	LoginPage,
	VerificationPage,
	ProfilePage,
	ChatsOptionsComponent,
	NewChatComponent,
	MessagesOptionsComponent,
	MessagesAttachmentsComponent,
	NewLocationMessageComponent
  ],
  providers: [
   //StatusBar,
   //SplashScreen,
   //Geolocation,  
   PhoneService,
   { provide: ErrorHandler, useClass: IonicErrorHandler },
	

    

  ]
    }
}



@NgModule(moduleDefinition)
export class AppModule {}