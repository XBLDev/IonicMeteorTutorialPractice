import { Component } from '@angular/core';
import { Alert, AlertController, NavController } from 'ionic-angular';
import { PhoneService } from '../../services/phone';
import { VerificationPage } from '../verification/verification';
import template from './login.html';

@Component({
  template
})
export class LoginPage {
  phone = '';

  constructor(
    private alertCtrl: AlertController,
    private phoneService: PhoneService,
    private navCtrl: NavController
  ) 
  {
         
  
  
  }


  ngOnInit(): void {
   var alert;
  //   if(Meteor.call('ifUserId'))
  //   {
  //    alert = this.alertCtrl.create({
  //     title: 'User!',
  //     message: 'we have a user now!'+Meteor.call('ifUserId'),
  //     buttons: ['OK']
  //   });      
  //   }
  //   else{
  //     alert = this.alertCtrl.create({
  //     title: 'User!',
  //     message: 'we dont have a user now!'+Meteor.call('ifUserId'),
  //     buttons: ['OK']
  //   });  
  //  }
    //   alert = this.alertCtrl.create({
    //   title: 'UserID',
    //   message: Meteor.call('getUserId'),
    //   buttons: ['OK']
    // });           
    //   alert.present();
    //console.log("userid at login:"+Meteor.call('getUserId'));
    Meteor.call('getUserId', function(error, result)
    {
         console.log("userid at login:"+result);
    })
  }


  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.login();
    }
  }

  login(phone: string = this.phone): void {
    const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: `Would you like to proceed with the phone number ${phone}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogin(alert);
            return false;
          }
        }
      ]
    });

    alert.present();
  }

  handleLogin(alert: Alert): void {
    alert.dismiss().then(() => {
      return this.phoneService.verify(this.phone);
    })
    .then(() => {
      this.navCtrl.push(VerificationPage, {
        phone: this.phone
      });
    })
    .catch((e) => {
      this.handleError(e);
    });
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }
}