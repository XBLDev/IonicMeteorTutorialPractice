import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { MeteorObservable } from 'meteor-rxjs';
import { Profile } from '../../../../imports/models';
import { ChatsPage } from '../chats/chats';
import template from './profile.html';

@Component({
  template
})
export class ProfilePage implements OnInit {
  picture: string;
  profile: Profile;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) 
  {
    // if(Meteor.userId)
    // {
    //  const alert = this.alertCtrl.create({
    //   title: 'User!',
    //   message: 'we have a user now!',
    //   buttons: ['OK']
    // });      
    // }
    //     this.profile = {
    //   name: 'xx'
    // };
  }

  ngOnInit(): void {
    this.profile = Meteor.user().profile || {
      name: ''
    };


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
  //     alert.present();
    //   alert = this.alertCtrl.create({
    //   title: 'UserID',
    //   message: Meteor.call('getUserId'),
    //   buttons: ['OK']
    // });           
    //   alert.present();


//    console.log("userid at profile:"+Meteor.call('getUserId'));
    Meteor.call('getUserId', function(error, result)
    {
         console.log("userid at profile:"+result);
    })
  }

  updateProfile(): void {
    MeteorObservable.call('updateProfile', this.profile).subscribe({
      next: () => {
        this.navCtrl.push(ChatsPage);
      },
      error: (e: Error) => {
        this.handleError(e);
      }
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