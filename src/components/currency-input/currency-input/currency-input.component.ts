import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="input-section">
      <div class="input-group">
        <label for="currency-input"></label>
        <input
          id="currency-input"
          type="text"
          [(ngModel)]="codigoMoeda"
          (ngModelChange)="aoMudarMoeda($event)"
          placeholder="Enter the currency code"
          (keyup.enter)="aoEnviar()"
          [disabled]="carregando"
          class="currency-input"
        />
      </div>
      
      <button 
        class="exchange-button"
        (click)="aoEnviar()"
        [disabled]="carregando || !codigoMoeda"
      >
        {{ carregando ? 'LOADING...' : 'EXCHANGE RESULT' }}
      </button>
    </div>
  `,
  styles: [`
    .input-section {
      margin-bottom: 32px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-group label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }

    .currency-input {
      width: 100%;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 16px;
      background: white;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .currency-input:focus {
      border-color: #2196f3;
    }

    .currency-input:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .exchange-button {
      width: 100%;
      padding: 16px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .exchange-button:hover:not(:disabled) {
      background: #1976d2;
    }

    .exchange-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class CurrencyInputComponent {
  @Input() carregando = false;
  @Input() codigoMoeda = '';
  @Output() codigoMoedaChange = new EventEmitter<string>();
  @Output() enviar = new EventEmitter<void>();

  aoMudarMoeda(valor: string) {
    this.codigoMoeda = valor;
    this.codigoMoedaChange.emit(valor);
  }

  aoEnviar() {
    this.enviar.emit();
  }
}