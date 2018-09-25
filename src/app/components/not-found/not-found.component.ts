import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="not-found">Page Not Found</div>
  `,
  styles: [`
    .not-found {
      margin: 0 auto;
      font-size: 2rem;
      margin-top: 100px;
    }
  `]
})
export class NotFoundComponent {
  constructor() {}
}