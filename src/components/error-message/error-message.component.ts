import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-message" *ngIf="mensagem">
      {{ mensagem }}
    </div>
  `,
  styles: [`
    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid #ffcdd2;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() mensagem = '';
}