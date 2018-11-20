import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-omprast',
  templateUrl: './prast.component.html',
  styleUrls: ['./prast.component.css']
})
export class OmPrast {
  constructor(private Title: Title) {
    this.Title.setTitle('Präst');
  }
}