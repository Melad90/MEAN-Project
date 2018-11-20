import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-omoss',
  templateUrl: './om-oss.component.html',
  styleUrls: ['./om-oss.component.css']
})
export class OmOssComponent {
  constructor(private Title: Title) {
    this.Title.setTitle('Om oss');
  }
}