import { Component, inject, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, 'users');

  ngOnInit() {
    const menu = {
      "menu": "roles/3tZm2tg3aH9CjvaS19d3",
      "photoURL": "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1715817600&semt=ais_user",
      "name": "Dacortesn",
      "role": "STUDENT",
      "email": "dacortesn@ufpso.edu.co"
    };

    //addDoc(this._collection, menu).then(r => {
    //  console.log('Document written with ID: ', r.id);
    //});
  }
}
