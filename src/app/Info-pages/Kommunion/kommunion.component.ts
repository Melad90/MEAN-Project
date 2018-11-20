import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-kommunion',
  templateUrl: './kommunion.component.html',
  styleUrls: ['./kommunion.component.css']
})
export class Kommunion {
  constructor(private Title: Title) {
    this.Title.setTitle('Kommunionen');
  }
}