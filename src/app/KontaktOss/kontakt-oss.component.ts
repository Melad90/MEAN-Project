import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-kontaktoss',
  templateUrl: './kontakt-oss.component.html',
  styleUrls: ['./kontakt-oss.component.css']
})
export class KontaktOssComponent implements OnInit {
  form: FormGroup;

  constructor(private Title: Title) {
    this.Title.setTitle('Kontakta oss');
  }
  ngOnInit() {
    this.form = new FormGroup({
      'namn': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(5)]
      }),
      'epost': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(5)]
      }),
      'rubrik': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(5)]
      }),
      'innehall': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(5)]
      })
    })
  }
 
}