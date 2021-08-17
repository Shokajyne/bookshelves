import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required]
  });;

  fileIsUploading: boolean = false;
  fileUrl: string = "";
  fileUploaded: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private bookService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSaveBook() {
    const formValue = this.bookForm.value;
    const newBook = new Book(
      formValue['title'], 
      formValue['author']
    );

    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }

    this.bookService.createNewBook(newBook);

    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event: Event) {
    if (event != null) {
      var eventTarget = (event.target as HTMLInputElement)
      this.onUploadFile(eventTarget!.files![0]!);
    }
  }

}
