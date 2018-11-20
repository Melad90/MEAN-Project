import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dop',
  templateUrl: './dop.component.html',
  styleUrls: ['./dop.component.css']
})
export class Dop {
  constructor(private Title: Title) {
    this.Title.setTitle('Dop');
  }
}