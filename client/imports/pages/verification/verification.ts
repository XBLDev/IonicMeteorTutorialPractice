import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PhoneService } from '../../services/phone';
import template from './verification.html';

@Component({
  template
})
export class VerificationPage implements OnInit {
  code: string = '';
  phone: string;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private phoneService: PhoneService
  ) {

    if(Meteor.userId)
    {
     const alert = this.alertCtrl.create({
      title: 'User!',
      message: 'we have a user now!',
      buttons: ['OK']
    });      
    }
  }

  ngOnInit() {
    this.phone = this.navParams.get('phone');
   var alert;
  //   if(Meteor.call('ifUserId')==true)
  //   {
  //    alert = this.alertCtrl.create({
  //     title: 'User!',
  //     message: 'we have a user now!',
  //     buttons: ['OK']
  //   });      
  //   }
  //   else{
  //     alert = this.alertCtrl.create({
  //     title: 'User!',
  //     message: 'we dont have a user now!',
  //     buttons: ['OK']
  //   });  
  //  }
    //  const alert = this.alertCtrl.create({
    //   title: 'User!',
    //   message: 'we have a user now!',
    //   buttons: ['OK']   });  
    //       alert = this.alertCtrl.create({
    //   title: 'UserID',
    //   message: Meteor.call('getUserId'),
    //   buttons: ['OK']
    // });           
    //   alert.present();
    //console.log("userid at verification:"+Meteor.call('getUserId'));
    Meteor.call('getUserId', function(error, result)
    {
         console.log("userid at verification:"+result);
    })


  }

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.verify();
    }
  }

  verify(): void {
    this.phoneService.login(this.phone, this.code).then(() => {
      this.navCtrl.setRoot(ProfilePage, {}, {
        animate: true
      });
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