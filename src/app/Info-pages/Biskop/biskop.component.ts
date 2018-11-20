import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-biskop',
  templateUrl: './biskop.component.html',
  styleUrls: ['./biskop.component.css']
})
export class Biskop {
  constructor(private Title: Title) {
    this.Title.setTitle('Biskop');
  }
}