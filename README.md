# 📈 StockViz Terminal — Financial Data Dashboard

### A production-style financial analysis web application for visualizing market trends

**StockViz Terminal** transforms a raw financial data pipeline into a **startup-ready, interactive web product**. It leverages real-time API integration and mathematical modeling to provide high-fidelity insights into global stock market movements.

This project is designed to demonstrate **end-to-end Data Engineering ownership** — from raw data acquisition to a polished, recruiter-facing application.

---

## 🎯 Problem Statement

Analyzing stock market volatility is highly complex due to:
* **High-frequency data noise**: Difficulty in isolating significant price trends from daily fluctuations.
* **Vast historical scale**: Managing and rendering years of data points efficiently for user interaction.
* **Non-linear market variables**: Understanding the correlation between trading volume and price action.

**Goal**: Use data engineering and statistical analysis to learn pricing patterns from historical data and deliver **accurate, interactive financial visualizations**.

---

## 🧠 Solution Overview

StockViz Terminal applies a complete data pipeline and exposes it through a modern terminal-inspired interface:
1. **Raw Financial Data**: Ingested via `yfinance` API.
2. **Data Transformation**: Leveraged **Pandas** for time-series cleaning and date-feature decomposition.
3. **Interactive Dashboard**: A React-based frontend providing visualization-first exploration.

---

## 🧱 Application Features

### 🏠 Landing Page — Modern Terminal Aesthetic
* **Dark-mode design**: Terminal-inspired hero section with neon accents.
* **Clear Value Proposition**: Immediate entry points for ticker search and date-range filtering.

### 📊 Interactive Data Explorer
* **Dynamic Charting**: Interactive line charts for **Closing Price** and **Trading Volume**.
* **Hover & Zoom**: Visualization-first EDA that avoids dense raw tables.
* **Statistical Summaries**: Integrated **Pandas `.describe()`** logic to show mean, max, and confidence ranges.

### 🚀 Research-Grade Tools
* **Ticker Search**: Instantly switch between symbols like `AAPL`, `GOOGL`, and `TSLA`.
* **Date Range Picker**: Isolate specific market events from the sidebar.
* **Data Export**: One-click **CSV download** for offline mathematical research.

---

## 🧮 Mathematical Foundations

As a student of **M.Sc. Data Science** with a background in **Mathematics**, this project incorporates:
* **Stochastic Processes**: Visualizing price as a discrete-time sequence to identify volatility clusters.
* **Numerical Linear Algebra**: Efficiently structuring data into matrices for high-speed filtering.
* **Descriptive Statistics**: Automated statistical grounding for visualized trends using rolling variance.

---

## ⚙️ Tech Stack

### Data Science
* **Python 3.11**: Managed via Conda `stockapp` environment.
* **Pandas & NumPy**: For matrix-like data manipulation.
* **yfinance**: For real-time API integration.

### Frontend
* **React + TypeScript**: For a robust, type-safe frontend.
* **Tailwind CSS**: For industrial dark-mode design.
* **Recharts**: For high-performance interactive charting.

---

## 🗺️ Model Roadmap

1. **Trend Prediction**: Implement **Least Squares Regression** to calculate and display price trend lines.
2. **System Solvers**: Integrate **Gauss Elimination** logic to solve linear systems for predictive modeling.
3. **Recommendation Engine**: Use **Matrix Factorization** to suggest similar stocks based on volatility correlation.

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone<OUR_GIT_URL>

# Navigate into the project
cd chart-charm-data

# Activate your environment
conda activate stockapp

# Install dependencies
pip install -r requirements.txt

# Start the application
streamlit run stock_app.py
