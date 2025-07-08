import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CurrentExchangeRate {
  success: boolean;
  lastUpdatedAt: string;
  fromSymbol: string;
  toSymbol: string;
  exchangeRate: number;
  rateLimitExceeded?: boolean;
}

export interface DailyExchangeData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface DailyExchangeResponse {
  success: boolean;
  lastUpdatedAt: string;
  from: string;
  to: string;
  data: DailyExchangeData[];
  rateLimitExceeded?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private readonly BASE_URL = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  private readonly API_KEY = 'RVZG0GHEV2KORLNA';

  constructor(private http: HttpClient) { }

  getCurrentExchangeRate(simboloOrigem: string, simboloDestino: string = 'BRL'): Observable<CurrentExchangeRate> {
    const url = `${this.BASE_URL}/currentExchangeRate`;
    const parametros = {
      apiKey: this.API_KEY,
      from_symbol: simboloOrigem,
      to_symbol: simboloDestino
    };

    return this.http.get<CurrentExchangeRate>(url, { params: parametros });
  }

  getDailyExchangeRate(simboloOrigem: string, simboloDestino: string = 'BRL'): Observable<DailyExchangeResponse> {
    const url = `${this.BASE_URL}/dailyExchangeRate`;
    const parametros = {
      apiKey: this.API_KEY,
      from_symbol: simboloOrigem,
      to_symbol: simboloDestino
    };

    return this.http.get<DailyExchangeResponse>(url, { params: parametros });
  }
}