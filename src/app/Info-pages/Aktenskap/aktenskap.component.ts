import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aktenskap',
  templateUrl: './aktenskap.component.html',
  styleUrls: ['./aktenskap.component.css']
})
export class Aktenskap {
  constructor(private Title: Title) {
    this.Title.setTitle('Äktenskap');
  }
}