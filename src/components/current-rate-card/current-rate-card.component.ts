import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentExchangeRate } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-current-rate-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="current-rate-card" *ngIf="taxaAtual">
      <div class="rate-header">
        <span class="rate-label">Exchange rate now</span>
        <span class="rate-pair">{{ taxaAtual.fromSymbol }}/{{ taxaAtual.toSymbol }}</span>
      </div>
      <div class="rate-date">{{ formatarData(taxaAtual.lastUpdatedAt) }}</div>
      <div class="rate-value">R$ {{ taxaAtual.exchangeRate.toFixed(2) }}</div>
    </div>
  `,
  styles: []
})
export class CurrentRateCardComponent {
  @Input() taxaAtual: CurrentExchangeRate | null = null;

  formatarData(stringData: string): string {
    const data = new Date(stringData);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' - ' + data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}