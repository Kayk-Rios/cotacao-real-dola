import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#2196f3"/>
          <path d="M2 17L12 22L22 17" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#2196f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>ACTION</span><span class="labs">LABS</span>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      padding: 16px 20px;
      border-bottom: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 700;
      color: #2196f3;
    }

    .labs {
      color: #666;
    }
  `]
})
export class HeaderComponent {}