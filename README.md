# Crypto Trading Strategy Backtesting Platform

## Overview

This project is a platform designed for testing trading strategies in the cryptocurrency market. It was created in response to the growing interest of investors in tools that support the analysis and optimization of investment strategies, particularly those based on automation.

The platform enables users to:

- Create, modify, and simulate various trading strategies using historical market data.
- Analyze the results of backtests to evaluate strategy performance.

## Features

- **Strategy Management** – Create and configure trading strategies.
- **Backtesting Engine** – Simulate trades using historical data.
- **Performance Analysis** – Evaluate strategy effectiveness with detailed metrics.
- **User-Friendly Interface** – Built with React for an intuitive experience.

## Technology Stack & Architecture

- **Backend**: Django (Python), DRF, Celery+Redis
- **Frontend**: React + Redux + MaterialUI
- **Database**: PostgreSQL

![image](https://github.com/user-attachments/assets/2c654190-4109-42f8-904f-727b996a8297)

## Scalability & Performance

The system architecture was designed with scalability and performance in mind, ensuring efficient handling of large datasets and complex simulations.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MKazmierczak02/crypto.memint.backtest.git
   ```
2. Navigate to the project directory:
   ```sh
   cd crypto.memint.backtest
   ```
3. Start the server with docker:
   ```sh
   docker-compose up
   ```
![image](https://github.com/user-attachments/assets/8dbc4e1c-2a90-462b-8344-099beb27de42)


## Usage

1. Access the web application via `http://localhost:8000/`.
2. Create and configure a trading strategy.
3. Run backtests and analyze results.

## Future Enhancements

- Integration with real-time market data.
- Support for additional asset classes.
- Advanced visualization tools for performance analysis.

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

### Contact

For questions or collaboration, reach out via GitHub issues or email.

