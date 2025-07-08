import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="input-section">
      <div class="input-group">
        <label 
          for="currency-input"
          [@labelAnimation]="getAnimationState()"
          class="input-label"
        >
          Enter the currency code
        </label>
        <input
          id="currency-input"
          type="text"
          [(ngModel)]="codigoMoeda"
          (ngModelChange)="aoMudarMoeda($event)"
          placeholder="Enter the currency code"
          (keyup.enter)="aoEnviar()"
          (focus)="onFocus()"
          (blur)="onBlur()"
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
      position: relative;
    }

    .input-label {
      position: absolute;
      top: -20px;
      left: 10px;
      font-size: 14px;
      color: #666;
      padding: 0 5px;
      pointer-events: none;
      transform-origin: left center;
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
  `],
  animations: [
    trigger('labelAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px) scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      transition('void <=> visible', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({
          opacity: 0,
          transform: 'translateY(10px) scale(0.95)'
        }))
      ])
    ])
  ]
})
export class CurrencyInputComponent {
  @Input() carregando = false;
  @Input() codigoMoeda = '';
  @Output() codigoMoedaChange = new EventEmitter<string>();
  @Output() enviar = new EventEmitter<void>();

  isFocused = false;

  getAnimationState() {
    return this.isFocused || this.codigoMoeda ? 'visible' : 'void';
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  aoMudarMoeda(valor: string) {
    this.codigoMoeda = valor;
    this.codigoMoedaChange.emit(valor);
  }

  aoEnviar() {
    this.enviar.emit();
  }
}