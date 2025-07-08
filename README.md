
---


# 💱 BRL Exchange Rate - Action Labs

Link SIte no ar: https://cotacao-real.netlify.app/ 

Aplicação Angular moderna para consultar a cotação atual e histórica do Real Brasileiro (BRL) frente a moedas internacionais.

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?style=flat-square\&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat-square\&logo=typescript)

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


![Captura de tela de 2025-07-08 18-38-13](https://github.com/user-attachments/assets/88866c9f-28bd-4f42-8dfc-c4bcc05720e6)
![Captura de tela de 2025-07-08 18-38-00](https://github.com/user-attachments/assets/cd5662b7-ff09-4527-9db0-8e2d5a925617)
![Captura de tela de 2025-07-08 18-37-43](https://github.com/user-attachments/assets/363ccef6-1ff6-4b76-a835-55381fcbfdf7)
![Captura de tela de 2025-07-08 18-37-17](https://github.com/user-attachments/assets/24f46dad-948f-4609-86aa-08f4196c29be)
![Captura de tela de 2025-07-08 18-37-07](https://github.com/user-attachments/assets/88d20c78-830d-49d1-a4d0-f48ba60ce481)
![Captura de tela de 2025-07-08 18-36-55](https://github.com/user-attachments/assets/57edf6f2-a596-4c13-9cbd-7e973aff9d9a)
