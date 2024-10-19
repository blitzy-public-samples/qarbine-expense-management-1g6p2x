// src/backend/expense-management-service/src/services/ocrService.ts

// Service responsible for performing Optical Character Recognition (OCR) on receipt images to extract text data for expense processing.
// This service integrates with OCR libraries to automate the extraction of relevant information such as amounts, dates, and vendors from receipt images, facilitating efficient expense submission and processing.

// Requirements addressed:
// - Expense Submission (Technical Specification/13.2 Expense Submission):
//   Enable employees to efficiently capture and submit travel expenses through user-friendly interfaces, incorporating automated data extraction and currency support.

// External dependencies:

// Importing Tesseract.js for performing OCR on receipt images
import Tesseract from 'tesseract.js'; // Version ^2.1.1

// Importing axios for making HTTP requests to external currency exchange rate providers
import axios from 'axios'; // Version ^0.21.1

// Internal dependencies:

// Importing the Receipt model to represent and manage receipt data associated with expenses
import Receipt from '../models/receiptModel';

// Importing utility to convert receipt amounts to a base currency for consistency
import convertCurrency from '../utils/currencyConverter';

// Importing utility to ensure receipts comply with company policies
import validateExpense from '../utils/policyValidator';

// Importing middleware to authenticate requests before processing receipts
import { authenticate } from '../middlewares/authMiddleware';

// Globals:

// Configured instance of Tesseract.js for performing OCR operations
const ocrEngine = Tesseract;

// Exchange rate API URL used by currency converter utility
const exchangeRateAPI = 'https://api.exchangeratesapi.io/latest';

/**
 * Processes a receipt by extracting data using OCR, validating it against policies, and converting currency amounts.
 *
 * This function addresses the requirement: Expense Submission (Technical Specification/13.2 Expense Submission), enabling employees to efficiently capture and submit travel expenses through user-friendly interfaces, incorporating automated data extraction and currency support.
 *
 * @param {string} receiptImagePath - The file path to the receipt image.
 * @returns {Promise<object>} - An object containing processed receipt data including amount, currency, and validation status.
 */
async function processReceipt(receiptImagePath: string): Promise<object> {
  try {
    // Step 1: Load the receipt image from the specified path.
    // In an actual application, this might involve accessing the file system or a cloud storage service.
    const image = await loadImage(receiptImagePath);
    if (!image) {
      throw new Error('Failed to load the receipt image.');
    }

    // Step 2: Use the ocrEngine to perform OCR on the image.
    const ocrResult = await ocrEngine.recognize(image, 'eng', {
      // Additional configuration options can be added here if necessary.
    });
    if (!ocrResult || !ocrResult.data || !ocrResult.data.text) {
      throw new Error('Failed to extract text from the receipt image.');
    }

    // Step 3: Parse the extracted text to identify relevant expense data such as amount, date, and vendor.
    const extractedData = parseOCRText(ocrResult.data.text);
    if (!extractedData) {
      throw new Error('Failed to parse essential expense data from the receipt.');
    }

    // Step 4: Convert the extracted amount to the base currency using convertCurrency.
    const baseCurrency = 'USD'; // Assuming the base currency is USD; this can be configured as needed.
    const convertedAmount = await convertCurrency(
      extractedData.amount,
      extractedData.currency,
      baseCurrency
    );
    if (convertedAmount === null) {
      throw new Error('Currency conversion failed.');
    }

    // Step 5: Validate the receipt data against company policies using validateExpense.
    const validationStatus = validateExpense({
      amount: convertedAmount,
      date: extractedData.date,
      category: extractedData.category,
      vendor: extractedData.vendor,
    });

    // Step 6: Return the structured and validated receipt data.
    const processedReceipt = {
      amount: convertedAmount,
      currency: baseCurrency,
      originalAmount: extractedData.amount,
      originalCurrency: extractedData.currency,
      date: extractedData.date,
      vendor: extractedData.vendor,
      category: extractedData.category,
      validationStatus,
    };

    return processedReceipt;
  } catch (error) {
    // Error handling as per application standards.
    console.error('Error in processReceipt:', error);
    throw error;
  }
}

/**
 * Helper function to load an image from a given path.
 *
 * This function supports the requirement of processing receipt images for OCR extraction.
 *
 * @param {string} imagePath - The file path to the image.
 * @returns {Promise<string>} - A Promise that resolves to the image data suitable for OCR processing.
 */
async function loadImage(imagePath: string): Promise<string> {
  try {
    // Implementation to load the image data.
    // This is a placeholder; actual implementation may vary depending on storage mechanism.
    // For example, reading from file system, cloud storage, or converting to base64.
    return imagePath; // Here, we assume imagePath can be used directly by Tesseract.
  } catch (error) {
    console.error('Error loading image:', error);
    throw error;
  }
}

/**
 * Helper function to parse the OCR extracted text and extract relevant data.
 *
 * This function addresses the requirement: Expense Submission (Technical Specification/13.2 Expense Submission), by automating data extraction from receipts.
 *
 * @param {string} text - The text extracted from OCR.
 * @returns {object|null} - An object containing extracted amount, currency, date, vendor, and category; or null if parsing fails.
 */
function parseOCRText(
  text: string
): { amount: number; currency: string; date: string; vendor: string; category: string } | null {
  // Implementation of text parsing logic.
  // A production-ready implementation would use advanced parsing techniques and possibly machine learning for better accuracy.

  let amount = 0;
  let currency = 'USD'; // Default currency; in actual implementation, extract from text if available.
  let date = '';
  let vendor = '';
  let category = 'Uncategorized';

  // Simplified regex patterns for demonstration purposes.
  const amountRegex = /Total\s*\$?(\d+\.\d{2})/i;
  const dateRegex = /Date[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/i;
  const vendorRegex = /Vendor[:\-]?\s*(.+)/i;

  const amountMatch = text.match(amountRegex);
  if (amountMatch) {
    amount = parseFloat(amountMatch[1]);
  } else {
    console.warn('Amount not found in OCR text.');
  }

  const dateMatch = text.match(dateRegex);
  if (dateMatch) {
    date = dateMatch[1];
  } else {
    console.warn('Date not found in OCR text.');
  }

  const vendorMatch = text.match(vendorRegex);
  if (vendorMatch) {
    vendor = vendorMatch[1].trim();
  } else {
    console.warn('Vendor not found in OCR text.');
  }

  if (amount === 0 || !date || !vendor) {
    // Essential data not found; return null.
    return null;
  }

  return {
    amount,
    currency,
    date,
    vendor,
    category,
  };
}

// Exporting the processReceipt function for use in other modules.
export { processReceipt };