/**
 * @file reportController.test.ts
 * @description Unit tests for the reportController module in the Reporting and Analytics Service.
 * 
 * This file contains unit tests to ensure that the controller's endpoints for report retrieval and insights generation function correctly
 * and handle various scenarios, including error cases.
 * 
 * Requirements Addressed:
 * - Comprehensive Reporting and Analytics
 *   - Location: Technical Specification/13.6 Reporting and Analytics
 *   - Description: Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
 */

// External Dependencies
import request from 'supertest';  // Version: ^6.0.0
// Supertest facilitates HTTP assertions for testing Express.js applications.

// Internal Dependencies
import app from '../app';  // The Express application instance
// The app includes the reportController routes.

import reportService from '../services/reportService';
// Mocks the report generation logic to test the controller's interaction with the service.

import analyticsService from '../services/analyticsService';
// Mocks the data analysis logic to test the controller's interaction with the analytics service.

// Mocking the services
jest.mock('../services/reportService');
jest.mock('../services/analyticsService');

describe('reportController', () => {
  /**
   * Test suite for reportController.
   * 
   * Requirements Addressed:
   * - Comprehensive Reporting and Analytics
   *   - Location: Technical Specification/13.6 Reporting and Analytics
   *   - Description: Ensure that the reporting endpoints function correctly, providing accurate and tailored reports as per user roles.
   */

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
  });

  describe('GET /report', () => {
    /**
     * Tests the GET /report endpoint to ensure it retrieves reports correctly.
     * 
     * Function: testGetReport
     * Steps:
     * 1. Set up mock data and dependencies for the report retrieval.
     * 2. Use supertest to simulate a GET request to the /report endpoint.
     * 3. Assert that the response status is 200 and the data matches expected output.
     * 4. Verify that the reportService's generateReport function is called with correct parameters.
     */

    it('should retrieve reports correctly', async () => {
      // Step 1: Set up mock data and dependencies for the report retrieval.
      const mockReportData = {
        reportId: '12345',
        totalExpenses: 1500.00,
        currency: 'USD',
        expenses: [
          {
            itemId: 'e1',
            amount: 500,
            category: 'Meals',
            date: '2023-09-30',
          },
          {
            itemId: 'e2',
            amount: 1000,
            category: 'Transportation',
            date: '2023-09-29',
          },
        ],
      };

      (reportService.generateReport as jest.Mock).mockResolvedValue(mockReportData);

      // Step 2: Use supertest to simulate a GET request to the /report endpoint.
      const response = await request(app)
        .get('/report')
        .query({ userId: 'user123' });

      // Step 3: Assert that the response status is 200 and the data matches expected output.
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockReportData);

      // Step 4: Verify that the reportService's generateReport function is called with correct parameters.
      expect(reportService.generateReport).toHaveBeenCalledWith({ userId: 'user123' });
    });
  });

  describe('POST /insights', () => {
    /**
     * Tests the POST /insights endpoint to ensure it generates insights correctly.
     * 
     * Function: testPostInsights
     * Steps:
     * 1. Set up mock data and dependencies for insights generation.
     * 2. Use supertest to simulate a POST request to the /insights endpoint.
     * 3. Assert that the response status is 200 and the insights data matches expected output.
     * 4. Verify that the analyticsService's analyzeData function is called with correct parameters.
     */

    it('should generate insights correctly', async () => {
      // Step 1: Set up mock data and dependencies for insights generation.
      const mockInsightsData = {
        insightsId: 'insight123',
        insights: [
          { type: 'expense_trend', data: { month: 'September', total: 1500.00 } },
          { type: 'category_analysis', data: { Meals: 500.00, Transportation: 1000.00 } },
        ],
      };

      (analyticsService.analyzeData as jest.Mock).mockResolvedValue(mockInsightsData);

      // Step 2: Use supertest to simulate a POST request to the /insights endpoint.
      const insightsRequestPayload = { userId: 'user123', period: 'last_month' };

      const response = await request(app)
        .post('/insights')
        .send(insightsRequestPayload);

      // Step 3: Assert that the response status is 200 and the insights data matches expected output.
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockInsightsData);

      // Step 4: Verify that the analyticsService's analyzeData function is called with correct parameters.
      expect(analyticsService.analyzeData).toHaveBeenCalledWith(insightsRequestPayload);
    });
  });
});