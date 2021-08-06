import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(
            () => {
              resolve(true);
            },
            (error) => {
              reject(error);
            }
          )
      }
    );
  }

  signinUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
            () => {
              resolve(true);
            },
            (error) => {
              reject(error);
            }
          )
      }
    );
  }

  signOur() {
    firebase.auth().signOut();
  }
}
