import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
  <div class="logo">
    <img src="assets/ActionLabs.svg" alt="Logo" width="212" height="70" />
  </div>
</header>

  `,
  styles: [`
   .header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  display: block;
  max-width: 100%;
  height: auto;
}

  `]
})
export class HeaderComponent {}