# 🍹 Mojito Expense Tracker

> A modern, elegant, and powerful web application to track daily expenses, analyze spending habits, and convert currencies in real-time.

---

## 📖 Project Overview

**Mojito Expense Tracker** is a comprehensive financial dashboard designed to help users take control of their personal finances. With an intuitive and modern dark-themed UI, the application allows users to seamlessly log expenses, categorize spending, and visualize financial habits over time. 

**Main Purpose:**  
To provide a simple, yet powerful tool for tracking and managing personal expenses without the clutter of traditional financial software.

**Target Users:**  
Freelancers, students, budget-conscious individuals, and anyone looking to monitor their daily expenses and gain insights into their financial behavior.

**Key Benefits:**  
- **Clarity:** Instantly see where your money goes with visual charts.
- **Convenience:** Quick expense logging with smart categorization.
- **Global Ready:** Converts expenses to your preferred currency using live exchange rates.
- **Privacy First:** Data is stored locally (or securely in the cloud depending on the configuration).

---

## ✨ Features

- **Add Expenses:** Quickly log new expenses with amount, category, and date.
- **Category-Based Tracking:** Organize spending into customizable categories (e.g., Food, Travel, Utilities).
- **Expense Analytics:** Gain insights into your spending habits through detailed summaries.
- **Recent Expense List:** View and manage a chronological history of your transactions.
- **Date Filtering:** Filter view by Today, Past 7 Days, Past 30 Days, or Past Year.
- **Currency Conversion:** Live currency exchange rates via external API to see expenses in different currencies.
- **Expense Charts:** Interactive pie and bar charts for category breakdowns using Chart.js.
- **Responsive UI:** A premium, dark-themed fintech dashboard optimized for both desktop and mobile devices.

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla / Custom Properties), Vanilla JavaScript (ES6+)
- **Visualization:** Chart.js for rendering interactive charts.
- **API Integration:** Live Currency Exchange API (e.g., ExchangeRate-API or similar).
- **Storage:** LocalStorage (Front-end local storage) with capability to connect to a relational database.
- **Version Control:** Git & GitHub

---

## 🏗 System Architecture

The application follows a client-side heavy architecture with a modular Javascript structure.

### High-Level Layers
- **Frontend Layer:** Renders the dark-themed dashboard UI, handles user inputs, and displays charts.
- **Data Processing Layer:** Manages application state, calculates totals, grouping data by categories and dates.
- **API Integration Layer:** Communicates with the external Currency Exchange API to fetch real-time conversion rates.
- **Storage Layer:** Manages persistence by saving/retrieving the expense payload to/from LocalStorage or a backend database.
- **Chart Visualization Layer:** Takes processed data and feeds it into Chart.js to render visual representations.

### System Architecture Diagram

```text
[ User Interface (HTML/CSS) ]
          │
          ▼
[ DOM Manipulation & Event Handlers (JS) ]
          │
          ├──────────────────────────────┐
          │                              ▼
          ▼            [ Chart Visualization Layer (Chart.js) ] 
[ State Management / Data Processing Logic ]
          │                              
          ├──────────────────────────────┐
          │                              ▼
          ▼                  [ API Integration Layer ] ──▶ [ External Currency API ]
[ Storage Manager Layer (LocalStorage / DBMS) ]
```

---

## ⚙️ System Design

### Component Architecture
The application layout is divided into semantic functional components:
- **Sidebar/Navigation:** Contains links to Dashboard, Transactions, Settings.
- **Header:** Displays current date, total balance, and active currency selector.
- **Expense Entry Form:** A modal or card capturing raw expense data.
- **Summary Cards:** High-level metrics like Total Spending, Average Daily Spend, etc.
- **Chart Area:** Visual breakdowns of spending by category or timeframe.
- **Transaction Table:** Sortable, filterable list of recent expenses.

### Data Flow
1. User submits an expense via the UI.
2. The UI component triggers a controller function.
3. The controller parses the input, creates an expense object, and sends it to the Storage Manager.
4. The Storage Manager saves the record and emits a state-change event.
5. Dependent components (Charts, Transaction List, Summary Cards) re-render with the updated state.

### User Interaction Flow
- **Adding an Expense:** Click 'Add' ➔ Fill Form ➔ Submit ➔ UI updates immediately without page reload.
- **Filtering:** Select Date Range ➔ Data Processing filters existing dataset ➔ UI re-renders with filtered view.
- **Currency Conversion:** Change Base Currency ➔ API Layer fetches new rates ➔ All monetary values on the dashboard are recalculated and displayed.

### Expense Processing Logic
- Summation algorithms aggregate expense amounts based on active date filters and categories.

### Currency Conversion Flow
- Upon initialization or currency change, a fetch request is made to the Exchange API.
- The conversion rate multiplier is cached locally.
- A utility function dynamically multiplies all base currency amounts by the multiplier before rendering to the DOM.

---

## 💾 Database Design

The schema is designed to efficiently store and query transaction data.

### Table: `expenses`

| Field | Data Type | Key | Description |
|-------|-----------|-----|-------------|
| `id` | VARCHAR(36) | Primary Key | Unique UUID for the expense record. |
| `expense_name` | VARCHAR(255) | | Short description or title of the expense. |
| `category` | VARCHAR(100) | | Category under which the expense falls (e.g., Food, Transport). |
| `amount` | DECIMAL(10, 2) | | The numerical value of the expense in the base currency. |
| `currency` | CHAR(3) | | The 3-letter ISO code of the currency used (e.g., USD, EUR). |
| `converted_amount` | DECIMAL(10, 2) | | Value of the expense converted to the user's default display currency. |
| `date` | DATE | | The date the expense occurred. |
| `created_at` | TIMESTAMP | | The exact timestamp when the record was created in the system. |

### Example Table Structure
```json
[
  {
    "id": "e4b2d9-1c8a-4f51-a93b",
    "expense_name": "Starbucks Coffee",
    "category": "Food & Dining",
    "amount": 5.50,
    "currency": "USD",
    "converted_amount": 5.50,
    "date": "2026-03-12",
    "created_at": "2026-03-12T08:30:00Z"
  }
]
```

---

## 🔗 Entity Relationship Design

In a full relational setup, the database revolves around a central **User** and **Expenses** entity architecture.

- **User (1) to (N) Expenses**: A single user can have multiple expense records. The `expenses` table would include a `user_id` foreign key associating the transaction with the user.
- **User (1) to (N) Categories**: Users can define custom categories. A `categories` table would map to user IDs to allow personalized category lists.
- **Expense (N) to (1) Category**: Each expense belongs to one specific category logically linking the expense details directly to a category label/tag.

*Note: In the initial LocalStorage setup for Mojito Expense Tracker, the primary entity is the standalone `expenses` document array, with categories managed dynamically.*

---

## 📁 Folder Structure

```text
/mojito-expense-tracker
│
├── /css
│   ├── style.css             # Main stylesheet (Dark theme, layout)
│   └── components.css        # Specific component styles (cards, modals)
│
├── /js
│   ├── app.js                # Main application initialization and events
│   ├── storage.js            # LocalStorage or DB interaction logic
│   ├── ui.js                 # DOM manipulation and rendering functions
│   ├── api.js                # Currency API integration
│   └── charts.js             # Chart.js configuration and rendering
│
├── /assets
│   ├── /icons                # SVG icons for categories and UI elements
│   └── /images               # Mockups, logos, and placeholders
│
├── index.html                # Main Dashboard application entry point
└── README.md                 # Project Documentation
```

---

## 🚀 Installation Guide

Follow these steps to run the application locally on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/mojito-expense-tracker.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd mojito-expense-tracker
   ```

3. **Configure API Keys (If applicable):**
   - Open `/js/api.js` and insert your Currency API key.

4. **Run the application:**
   - Since this is a vanilla frontend project, simply open `index.html` in your favorite modern web browser.
   - Alternatively, use a local development server like VS Code Live Server or Node's `http-server`:
     ```bash
     npx http-server .
     ```

---

## 🔮 Future Improvements

We are constantly looking to improve the Mojito Expense Tracker. Planned features include:

- 🔐 **User Authentication:** Secure login system (OAuth/JWT) to sync data across devices.
- ☁️ **Cloud Database:** Migrate from LocalStorage to Firebase or PostgreSQL.
- 📄 **Expense Export:** Ability to download your transaction history as PDF or CSV.
- 🤖 **AI Spending Insights:** Smart notifications and natural language understanding for analyzing spending habits.
- 💰 **Budget Tracking:** Set monthly limits per category and receive alerts when nearing the cap.

---

## 📸 Screenshots

*(Replace placeholders with actual UI screenshots once the dashboard is finalized)*

### Dashboard View
![Dashboard Configuration](assets/images/placeholder-dashboard.png)

### Add Expense Modal
![New Expense Flow](assets/images/placeholder-modal.png)

> *A modern dark-themed fintech dashboard featuring cards, interactive charts, and a clean transaction list.*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
*Crafted with precision for modern financial tracking.*
