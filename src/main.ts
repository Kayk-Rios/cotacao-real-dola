import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { ExchangeRateService, CurrentExchangeRate, DailyExchangeResponse, DailyExchangeData } from './services/exchange-rate.service';

// Importar os componentes
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CurrentRateCardComponent } from './components/current-rate-card/current-rate-card.component';
import { HistorySectionComponent } from './components/history-section/history-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    CurrencyInputComponent,
    ErrorMessageComponent,
    CurrentRateCardComponent,
    HistorySectionComponent
  ],
  providers: [ExchangeRateService],
  template: `
    <div class="app-container">
      <app-header></app-header>

      <main class="main-content">
        <h1 class="title">BRL EXCHANGE RATE</h1>
        
        <app-currency-input
          [carregando]="carregando"
          [(codigoMoeda)]="codigoMoeda"
          (enviar)="obterTaxaCambio()"
        ></app-currency-input>

        <app-error-message [mensagem]="erro"></app-error-message>

        <div class="result-section" *ngIf="taxaAtual">
          <app-current-rate-card [taxaAtual]="taxaAtual"></app-current-rate-card>

          <app-history-section
            [mostrarHistorico]="mostrarHistorico"
            [carregandoHistorico]="carregandoHistorico"
            [dadosDiarios]="dadosDiarios"
            (alternarHistorico)="alternarHistorico()"
          ></app-history-section>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f5f5f5;
    }

    .main-content {
      flex: 1;
      padding: 32px 20px;
      max-width: 480px;
      margin: 0 auto;
      width: 100%;
    }

    .title {
      font-size: 28px;
      font-weight: 700;
      color: #2196f3;
      text-align: center;
      margin-bottom: 32px;
    }

    .result-section {
      margin-top: 32px;
    }

    @media (min-width: 768px) {
      .main-content {
        max-width: 600px;
        padding: 48px 32px;
      }

      .title {
        font-size: 36px;
        margin-bottom: 48px;
      }
    }

    @media (min-width: 1024px) {
      .main-content {
        max-width: 1200px;
        padding: 64px 48px;
      }

      .result-section {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 32px;
        align-items: start;
      }
    }
  `]
})
export class App implements OnInit {
  codigoMoeda: string = '';
  taxaAtual: CurrentExchangeRate | null = null;
  dadosDiarios: DailyExchangeData[] = [];
  carregando = false;
  carregandoHistorico = false;
  mostrarHistorico = false;
  erro: string = '';

  constructor(private servicoCambio: ExchangeRateService) {}

  ngOnInit() {}

  obterTaxaCambio() {
    if (!this.codigoMoeda) {
      this.erro = 'Por favor, insira um código de moeda válido';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.taxaAtual = null;
    this.mostrarHistorico = false;

    this.servicoCambio.getCurrentExchangeRate(this.codigoMoeda.toUpperCase())
      .subscribe({
        next: (resposta) => {
          this.carregando = false;
          if (resposta.success) {
            this.taxaAtual = resposta;
          } else {
            this.erro = 'Erro ao buscar taxa de câmbio';
          }
        },
        error: (erro) => {
          this.carregando = false;
          this.erro = 'Erro ao buscar taxa de câmbio. Verifique o código da moeda.';
          console.error('Erro:', erro);
        }
      });
  }

  alternarHistorico() {
    if (!this.mostrarHistorico) {
      this.carregarDadosHistorico();
    } else {
      this.mostrarHistorico = false;
    }
  }

  carregarDadosHistorico() {
    if (!this.codigoMoeda) return;

    this.carregandoHistorico = true;
    this.mostrarHistorico = true;

    this.servicoCambio.getDailyExchangeRate(this.codigoMoeda.toUpperCase())
      .subscribe({
        next: (resposta) => {
          this.carregandoHistorico = false;
          if (resposta.success) {
            this.dadosDiarios = resposta.data;
          } else {
            this.erro = 'Erro ao carregar dados históricos';
          }
        },
        error: (erro) => {
          this.carregandoHistorico = false;
          this.erro = 'Erro ao carregar dados históricos';
          console.error('Erro:', erro);
        }
      });
  }
}

bootstrapApplication(App, {
  providers: []
});