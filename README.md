# Mojito Expense Tracker

A modern, responsive Expense Tracker Web Application built with React (Vite) and Tailwind CSS. The app helps users track their daily business or personal expenses with a clean, intuitive UI.

## Features Implemented
- **Add Expenses:** Users can add an expense with a name, amount, and category.
- **Expense List:** View all expenses in a clean, categorized list.
- **Delete Expenses:** Remove any expense with one click; totals dynamically update.
- **Summary Panel:** Shows total expenses instantly.
- **Category Breakdown:** Groups total spending by predefined categories with progress bars.
- **Pie Chart Visualization:** A visual representation of spending categories using Chart.js.
- **Currency Converter:** Live API integration utilizing Frankfurter API to convert total USD expenses to EUR, GBP, or INR with loading/error states.
- **Data Persistence:** Uses `localStorage` to save user expenses across page refreshes.
- **Toast Notifications:** Instant feedback alerts for adding, deleting, and validation errors via `react-hot-toast`.
- **Fully Responsive:** Functions flawlessly on desktop and mobile viewports.

## Tech Stack
- Frontend Framework: React 19 (Vite)
- Styling: Tailwind CSS v4
- Icons: Lucide React
- Charts: Chart.js & react-chartjs-2
- Notifications: React Hot Toast
- API: Frankfurter App (`https://api.frankfurter.app`)

## How to Run Locally

1. **Clone the repository**
   ```console
   git clone <your-repo-url>
   cd mojito-expense-tracker
   ```

2. **Install dependencies**
   ```console
   npm install
   ```

3. **Start the development server**
   ```console
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/`

## Live Deployment Link
Deploy to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) as required.
