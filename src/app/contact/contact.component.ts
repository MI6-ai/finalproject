import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
  }

  onAddComment(form: NgForm) {
    const value = form.value;
    // console.log(value)

    this.http.post('https://techlead-e4ee9-default-rtdb.firebaseio.com/comments.json',
     value
    ).subscribe(response => {
      console.log(response);
      form.reset();
    })

  }

}
