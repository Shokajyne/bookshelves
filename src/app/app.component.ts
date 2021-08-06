import { Component } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyCPX5T0XiyXT-X5IrM3RdkcXhA-B2oQO-E",
      authDomain: "bookshelves-api-b39b6.firebaseapp.com",
      projectId: "bookshelves-api-b39b6",
      storageBucket: "bookshelves-api-b39b6.appspot.com",
      messagingSenderId: "579907914051",
      appId: "1:579907914051:web:7bf1f3d47300001dcc87f6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
