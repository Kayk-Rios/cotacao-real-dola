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
        <label for="currency-input">Entre com o código da moeda</label>
        <input
          id="currency-input"
          type="text"
          [(ngModel)]="codigoMoeda"
          (ngModelChange)="aoMudarMoeda($event)"
          placeholder="USD"
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
        {{ carregando ? 'CARREGANDO...' : 'RESULTADO DO CÂMBIO' }}
      </button>
    </div>
  `,
  styles: []
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