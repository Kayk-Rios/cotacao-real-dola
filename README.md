
---

# 💱 BRL Exchange Rate - Action Labs

Aplicação Angular moderna para consultar a cotação atual e histórica do Real Brasileiro (BRL) frente a moedas internacionais.

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?style=flat-square\&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat-square\&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 Sobre

O **BRL Exchange Rate** permite consultar a taxa de câmbio atual do BRL e visualizar o histórico dos últimos 30 dias, com uma interface responsiva, rápida e intuitiva.

---

## ✨ Funcionalidades

* 🔍 Consulta de câmbio em tempo real
* 📈 Histórico dos últimos 30 dias
* 📊 Variações e tendências visuais
* 💬 Mensagens de erro e loading
* 📱 Design responsivo (mobile/tablet/desktop)

---

## ⚙️ Tecnologias

* **Angular 20** / **TypeScript 5**
* **RxJS**, **HttpClient**
* API: [Action Labs Exchange API](https://api-brl-exchange.actionlabs.com.br)

---

## 📦 Instalação

```bash
git clone https://github.com/Kayk-Rios/cotacao-real-dola.git
cd cotacao-real-dola
npm install
npm start
```

Acesse: `http://localhost:4200`

---

## 🧩 Estrutura

```
src/
├── components/         # Componentes visuais
├── services/           # Comunicação com a API
├── global_styles.css   # Estilos globais
└── main.ts             # Bootstrap do app
```

---

## 📌 Componentes

* **Header**: Logo e identidade visual
* **CurrencyInput**: Entrada do código da moeda
* **CurrentRateCard**: Exibe a taxa atual
* **HistorySection**: Mostra/oculta histórico
* **DailyHistory**: Grid com dados diários
* **ErrorMessage / Footer**: UX e feedback

---

## 🔧 Serviço

**`exchange-rate.service.ts`**

* `getCurrentExchangeRate()`
* `getDailyExchangeRate()`

---

## 🌐 API

Base URL: `https://api-brl-exchange.actionlabs.com.br/api/1.0/open`

Endpoints:

* `/currentExchangeRate`
* `/dailyExchangeRate`

---

## 📄 Licença

Projeto licenciado sob a **MIT**. Veja [LICENSE](LICENSE).

---

---
