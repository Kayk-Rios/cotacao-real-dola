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
  styles: []
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