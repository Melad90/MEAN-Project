import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'marnarsay';

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object,  @Inject(APP_ID) private appId: string) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  onActivate(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, 0); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
  }
}
