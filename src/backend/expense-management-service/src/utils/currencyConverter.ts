// src/backend/expense-management-service/src/utils/currencyConverter.ts

/**
 * Utility module for converting currency amounts within the expense management service.
 * This module provides functions to convert amounts between different currencies using
 * real-time exchange rates, ensuring accurate financial reporting and compliance with
 * multi-currency support requirements.
 *
 * Requirements Addressed:
 * - Support multiple currencies with real-time conversion.
 *   (Technical Specification/13.2 Expense Submission)
 */

import axios from 'axios'; // axios version ^0.21.1

// Exchange Rate API Endpoint (Global Variable)
const exchangeRateAPI: string = 'https://api.exchangeratesapi.io/latest';

/**
 * Converts an amount from one currency to another using real-time exchange rates.
 *
 * @param amount - The monetary amount to convert.
 * @param fromCurrency - The currency code of the original currency (e.g., 'USD').
 * @param toCurrency - The currency code of the target currency (e.g., 'EUR').
 * @returns A Promise that resolves to the converted amount in the target currency.
 *
 * Requirements Addressed:
 * - Support multiple currencies with real-time conversion.
 *   (Technical Specification/13.2 Expense Submission)
 *
 * Steps:
 * 1. Fetch the latest exchange rates from the exchangeRateAPI using axios.
 * 2. Retrieve the exchange rate for the target currency relative to the source currency.
 * 3. Calculate the converted amount using the retrieved exchange rate.
 * 4. Return the converted amount.
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  try {
    // Fetch the latest exchange rates from the exchangeRateAPI using axios
    const response = await axios.get(`${exchangeRateAPI}?base=${fromCurrency}`);

    // Retrieve the exchange rates data
    const rates = response.data.rates;

    // Check if the target currency exists in the rates
    if (!rates[toCurrency]) {
      throw new Error(`Conversion rate not available for currency: ${toCurrency}`);
    }

    // Retrieve the exchange rate for the target currency relative to the source currency
    const rate = rates[toCurrency];

    // Calculate the converted amount using the retrieved exchange rate
    const convertedAmount = amount * rate;

    // Return the converted amount
    return convertedAmount;
  } catch (error) {
    // Handle errors (e.g., network issues, invalid currency codes)
    console.error('Error converting currency:', error);
    throw error;
  }
}