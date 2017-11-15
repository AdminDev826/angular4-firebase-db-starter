import { Component } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: Observable<firebase.User>;
  items: any;

  constructor(
    public db: AngularFireDatabase,
    public afs: AngularFirestore
  ) {
    this.items = db.list('users'), {
      query: {
        limitToLast: 50
      }
    }
  }

  getData() {
    alert("get")
    console.log(this.items);
    this.db.list('users').snapshotChanges().subscribe(res=> {
      console.log(res);
    })
    this.afs.collection('users').snapshotChanges().map(res=> {
      return res.map(item=>{
        return item.payload.doc.data()
      })
    }).subscribe(data=> {
      console.log("=================")
      console.log(data);
    })
  }
  addData() {
    alert("set")
    this.db.list('users').push({
      name: "asd",
      email: "test@email.com"
    });
    this.afs.collection('users').add({
      name: "asdx",
      email: "testx@email.com"
    });
  }
}
