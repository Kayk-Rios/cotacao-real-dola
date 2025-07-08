import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <p>Copyright 2024 - Action Labs</p>
    </footer>
  `,
  styles: [`
    .footer {
      background: #2196f3;
      color: white;
      text-align: center;
      padding: 16px;
      margin-top: auto;
    }

    .footer p {
      font-size: 14px;
    }
  `]
})
export class FooterComponent {}