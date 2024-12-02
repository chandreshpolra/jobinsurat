import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { HeaderComponent } from './common-components/header/header.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { filter } from 'rxjs';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Job In Surat';

  constructor(private router: Router, private renderer: Renderer2, private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
      if (event) {
        const body = this.renderer.selectRootElement('body', true);
        this.removeBodyClasses(body);
      }
    });
  }

  removeBodyClasses(body: HTMLElement) {
    this.renderer.removeClass(body, 'open-menu');
    this.renderer.removeClass(body, 'filter-data');
  }

}
