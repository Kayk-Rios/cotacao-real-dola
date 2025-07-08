

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
