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
  styles: [`
    .current-rate-card {
      background: #e3f2fd;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    .rate-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .rate-label {
      font-size: 14px;
      color: #666;
    }

    .rate-pair {
      font-size: 16px;
      font-weight: 600;
      color: #2196f3;
    }

    .rate-date {
      font-size: 12px;
      color: #666;
      margin-bottom: 16px;
    }

    .rate-value {
      font-size: 32px;
      font-weight: 700;
      color: #2196f3;
    }
  `]
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