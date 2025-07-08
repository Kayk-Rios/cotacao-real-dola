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
  styles: []
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