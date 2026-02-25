📈 StockViz Terminal — Financial Data Dashboard
A production-style financial analysis web application for visualizing market trends
StockViz Terminal transforms a raw financial data pipeline into a SaaS-style, interactive web product. It leverages real-time API integration and mathematical modeling to provide high-fidelity insights into global stock market movements.

This project is designed to demonstrate end-to-end Data Engineering ownership—moving beyond Jupyter Notebooks to a polished, recruiter-facing application.

🎯 Problem Statement
Analyzing stock market volatility is highly complex due to:

High-frequency data noise: Difficulty in isolating significant price trends from daily fluctuations.

Vast historical scale: Managing and rendering years of data points efficiently for user interaction.

Non-linear market variables: Understanding the correlation between trading volume and price action.

Goal: Use data engineering and statistical analysis to learn pricing patterns from historical data and deliver accurate, interactive financial visualizations.

🧠 Solution Overview
StockViz Terminal applies a complete data pipeline and exposes it through a modern terminal-inspired interface:

Raw Financial Data: Ingested via yfinance API.

Data Transformation: Leverages Pandas for time-series cleaning and date-feature decomposition.

Interactive Dashboard: A React-based frontend providing visualization-first exploration.

🧱 Application Features
🏠 Landing Page — Modern Terminal Aesthetic
Dark-mode design: Terminal-inspired hero section with neon accents.

Clear Value Proposition: Immediate entry points for ticker search and date-range filtering.

📊 Interactive Data Explorer
Dynamic Charting: Interactive line charts for Closing Price and Trading Volume.

Hover & Zoom: Visualization-first EDA that avoids dense raw tables.

Statistical Summaries: Integrated Pandas .describe() logic to show mean, max, and confidence ranges.

🚀 Research-Grade Tools
Ticker Search: Instantly switch between symbols like AAPL, GOOGL, and TSLA.

Date Range Picker: Isolate specific market events (e.g., 2020 market shifts) from the sidebar.

Data Export: One-click CSV download for offline mathematical research.

🧪 Mathematical & Data Foundations
As a student of M.Sc. Data Science with a background in Mathematics, this project incorporates:

Stochastic Analysis: Visualizing price as a discrete-time sequence to identify volatility clusters.

Numerical Linear Algebra: Efficiently structuring data into matrices for high-speed filtering.

Descriptive Statistics: Automated statistical grounding for every visualized trend.

⚙️ Tech Stack
Data Science
Python 3.11 (Managed via Conda stockapp environment)

Pandas & NumPy: For matrix-like data manipulation

yfinance: For real-time API integration

Frontend
React + TypeScript

Tailwind CSS: For industrial dark-mode design

Recharts: For high-performance interactive charting

🚀 Running Locally
Bash
# Clone the repository
git clone https://github.com/saniya-ahuja/chart-charm-data.git

# Navigate into the project
cd chart-charm-data

# Activate your environment
conda activate stockapp

# Install dependencies
pip install -r requirements.txt

# Start the application
streamlit run stock_app.py
