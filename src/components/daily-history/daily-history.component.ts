import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyExchangeData } from '../../services/exchange-rate.service';

export interface DadosDiariosComDiferenca extends DailyExchangeData {
  diferencaFechamento?: number;
  percentualDiferencaFechamento?: number;
}

@Component({
  selector: 'app-daily-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="daily-history">
      <div class="daily-cards">
        <div class="daily-card" *ngFor="let dia of dadosDiariosComDiferenca">
          <div class="card-header">
            <span class="date">{{ formatarData(dia.date) }}</span>
          </div>
          <div class="card-content">
            <div class="rate-info">
              <div class="rate-item">
                <span class="label">OPEN:</span>
                <span class="value">R$ {{ dia.open.toFixed(4) }}</span>
              </div>
              <div class="rate-item">
                <span class="label">HIGH:</span>
                <span class="value">R$ {{ dia.high.toFixed(4) }}</span>
              </div>
              <div class="rate-item">
                <span class="label">CLOSE:</span>
                <span class="value">R$ {{ dia.close.toFixed(4) }}</span>
              </div>
              <div class="rate-item">
                <span class="label">LOW:</span>
                <span class="value">R$ {{ dia.low.toFixed(4) }}</span>
              </div>
            </div>
            <div class="close-diff" *ngIf="dia.diferencaFechamento !== undefined">
              <span class="label">CLOSE DIFF (%): (%):</span>
              <span class="value" [ngClass]="dia.percentualDiferencaFechamento! >= 0 ? 'positive' : 'negative'">
                {{ dia.percentualDiferencaFechamento! >= 0 ? '+' : '' }}{{ dia.percentualDiferencaFechamento!.toFixed(2) }}%
                <i class="arrow" [ngClass]="dia.percentualDiferencaFechamento! >= 0 ? 'up' : 'down'"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .daily-history {
      margin-top: 20px;
    }

    .daily-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .daily-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #e9ecef;
    }

    .card-header {
      margin-bottom: 12px;
    }

    .date {
      font-size: 16px;
      font-weight: 600;
      color: #2196f3;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .rate-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .rate-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-size: 12px;
      color: #6c757d;
      font-weight: 600;
    }

    .value {
      font-size: 14px;
      font-weight: 600;
      color: #212529;
    }

    .close-diff {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      border-top: 1px solid #dee2e6;
    }

    .close-diff .value {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .positive {
      color: #28a745;
    }

    .negative {
      color: #dc3545;
    }

    .arrow {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 4px;
    }

    .arrow.up {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 6px solid #28a745;
    }

    .arrow.down {
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid #dc3545;
    }

    @media (min-width: 768px) {
      .daily-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    @media (min-width: 1024px) {
      .daily-cards {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class DailyHistoryComponent implements OnInit, OnChanges {
  @Input() dadosDiarios: DailyExchangeData[] = [];
  dadosDiariosComDiferenca: DadosDiariosComDiferenca[] = [];

  ngOnInit() {
    this.calcularDiferencas();
  }

  ngOnChanges() {
    this.calcularDiferencas();
  }

  private calcularDiferencas() {
    if (!this.dadosDiarios || this.dadosDiarios.length === 0) {
      return;
    }

    const dadosOrdenados = [...this.dadosDiarios].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    this.dadosDiariosComDiferenca = dadosOrdenados.map((dia, indice) => {
      const resultado: DadosDiariosComDiferenca = { ...dia };
      
      if (indice > 0) {
        const diaAnterior = dadosOrdenados[indice - 1];
        resultado.diferencaFechamento = dia.close - diaAnterior.close;
        resultado.percentualDiferencaFechamento = (resultado.diferencaFechamento / diaAnterior.close) * 100;
      }
      
      return resultado;
    }).reverse(); 
  }

  formatarData(stringData: string): string {
    const data = new Date(stringData);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}