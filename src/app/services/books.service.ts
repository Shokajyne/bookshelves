import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import { Observable, Subject } from 'rxjs';
import { Book } from '../models/Book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getSingleBook(id: number) {
    return new Promise<Book>(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  deleteBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Deleted');
        }
      ).catch(
        (error) => {
          console.log('Error during delete ' + book.photo);
        }
      );
    }

    const bookIndex = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        } else {
          return false;
        }
      }
    );

    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise<string>(
      (resolve, reject) => {
        const almostUniqueFilename = Date.now().toString();
        const ref = firebase.storage().ref().child('images/' + almostUniqueFilename + file.name);
        const upload = ref.put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log("Loading");
          },
          (error) => {
            console.log(error);
            reject();
          },
          () => {
            resolve(ref.getDownloadURL());
          }
        );
      }
    );
  }
}
