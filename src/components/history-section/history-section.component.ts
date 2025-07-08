import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyHistoryComponent } from '../daily-history/daily-history.component';
import { DailyExchangeData } from '../../services/exchange-rate.service';

@Component({
  selector: 'app-history-section',
  standalone: true,
  imports: [CommonModule, DailyHistoryComponent],
  template: `
    <div class="history-section">
      <button 
        class="history-toggle"
        (click)="aoAlternarHistorico()"
        [disabled]="carregandoHistorico"
      >
        <span>LAST 30 DAYS</span>
        <span class="toggle-icon" [class.expanded]="mostrarHistorico">
          {{ mostrarHistorico ? '−' : '+' }}
        </span>
      </button>

      <div class="history-content" *ngIf="mostrarHistorico">
        <div class="loading-history" *ngIf="carregandoHistorico">
          Carregando histórico...
        </div>
        
        <app-daily-history 
          *ngIf="dadosDiarios && !carregandoHistorico"
          [dadosDiarios]="dadosDiarios"
        ></app-daily-history>
      </div>
    </div>
  `,
  styles: [`
    .history-section {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .history-toggle {
      width: 100%;
      padding: 20px;
      background: white;
      border: none;
      border-bottom: 1px solid #e0e0e0;
      font-size: 16px;
      font-weight: 600;
      color: #2196f3;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.3s ease;
    }

    .history-toggle:hover {
      background: #f5f5f5;
    }

    .history-toggle:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .toggle-icon {
      font-size: 24px;
      font-weight: 300;
      transition: transform 0.3s ease;
    }

    .toggle-icon.expanded {
      transform: rotate(180deg);
    }

    .history-content {
      padding: 20px;
      background: white;
      border-top: 1px solid #e0e0e0;
    }

    .loading-history {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class HistorySectionComponent {
  @Input() mostrarHistorico = false;
  @Input() carregandoHistorico = false;
  @Input() dadosDiarios: DailyExchangeData[] = [];
  @Output() alternarHistorico = new EventEmitter<void>();

  aoAlternarHistorico() {
    this.alternarHistorico.emit();
  }
}