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
        <section class="sec-label">
          <h1 class="rate-label">Exchange rate now</h1>
          <div class="rate-date">{{ formatarData(taxaAtual.lastUpdatedAt) }}</div>
        </section>

        <h1 class="rate-pair">{{ taxaAtual.fromSymbol }}/{{ taxaAtual.toSymbol }}</h1>
      </div>
      <div class="rate-value">R$ {{ taxaAtual.exchangeRate.toFixed(2) }}</div>
    </div>
  `,
  styles: [`
    .current-rate-card {
      background: rgb(235, 239, 242);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
    }
    
    .rate-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .sec-label {
      text-align: left;
      flex: 1;
    }

    .rate-label {
      font-size: 14px;
      margin: 0 0 4px 0;
      color: #333;
    }

    .rate-pair {
      font-size: 16px;
      font-weight: 600;
      color: #2196f3;
      margin: 0;
      white-space: nowrap;
      margin-left: 16px;
    }

    .rate-date {
      font-size: 12px;
      color: #666;
      margin: 0;
    }

    .rate-value {
      font-size: 32px;
      font-weight: 700;
      color: #2196f3;
      text-align: left;
      margin-top: 8px;
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