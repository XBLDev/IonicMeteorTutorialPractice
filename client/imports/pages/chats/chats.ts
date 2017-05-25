import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ModalController, AlertController } from 'ionic-angular';
import { MeteorObservable } from 'meteor-rxjs';
import * as Moment from 'moment';
import { Observable, Subscriber } from 'rxjs';
import { Chats, Messages, Users } from '../../../../imports/collections';
import { Chat, Message, MessageType } from '../../../../imports/models';
import { ChatsOptionsComponent } from './chats-options';
import { MessagesPage } from '../messages/messages';
import template from './chats.html';
import { NewChatComponent } from './new-chat';
import { Profile } from '../../../../imports/models';

@Component({
  template
})
export class ChatsPage implements OnInit {
  chats;
  senderId: string;
  privateprofile: Profile;

  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) 
  {
    // MeteorObservable.call('updateProfile', this.privateprofile);
    this.senderId = Meteor.userId();
    // if (!Meteor.userId) throw new Meteor.Error('unauthorized',
    //   'User must be logged-in to create a new chat');
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
    //     alert = this.alertCtrl.create({
    //   title: 'UserID',
    //   message: Meteor.call('getUserId'),
    //   buttons: ['OK']
    // });           
    //   alert.present();
//    console.log("userid at chat:"+Meteor.call('getUserId'));
    Meteor.call('getUserId', function(error, result)
    {
         console.log("userid at chat:"+result);
    })
    this.privateprofile =  {
      name: 'xx'
    };
    
    //MeteorObservable.call('updateProfile', this.privateprofile);
    
    MeteorObservable.subscribe('chats').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.chats = this.findChats();
      });
    });

  }

  addChat(): void {
    const modal = this.modalCtrl.create(NewChatComponent);
    modal.present();
  }

  findChats(): Observable<Chat[]> {
    // Find chats and transform them
    return Chats.find().map(chats => {
      chats.forEach(chat => {
        chat.title = '';
        chat.picture = '';

        const receiverId = chat.memberIds.find(memberId => memberId !== this.senderId);
        const receiver = Users.findOne(receiverId);

        if (receiver) {
          chat.title = receiver.profile.name;
          chat.picture = receiver.profile.picture;
        }

        // This will make the last message reactive
        this.findLastChatMessage(chat._id).subscribe((message) => {
          chat.lastMessage = message;
        });
      });

      return chats;
    });
  }

  findLastChatMessage(chatId: string): Observable<Message> {
    return Observable.create((observer: Subscriber<Message>) => {
      const chatExists = () => !!Chats.findOne(chatId);

      // Re-compute until chat is removed
      MeteorObservable.autorun().takeWhile(chatExists).subscribe(() => {
        Messages.find({ chatId }, {
          sort: { createdAt: -1 }
        }).subscribe({
          next: (messages) => {
            // Invoke subscription with the last message found
            if (!messages.length) {
              return;
            }

            const lastMessage = messages[0];
            observer.next(lastMessage);
          },
          error: (e) => {
            observer.error(e);
          },
          complete: () => {
            observer.complete();
          }
        });
      });
    });
  }

  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, {chat});
  }

  removeChat(chat: Chat): void {
    MeteorObservable.call('removeChat', chat._id).subscribe({
      error: (e: Error) => {
        if (e) {
          this.handleError(e);
        }
      }
    });
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      buttons: ['OK'],
      message: e.message,
      title: 'Oops!'
    });

    alert.present();
  }

  showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptionsComponent, {}, {
      cssClass: 'options-popover chats-options-popover'
    });

    popover.present();
  }
}