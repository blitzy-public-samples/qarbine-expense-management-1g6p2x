/**
 * reportController.ts
 * 
 * This controller handles HTTP requests related to report generation and insights retrieval within the Reporting and Analytics Service.
 * It interfaces with the reportService and analyticsService to process requests and return appropriate responses.
 * 
 * Requirements Addressed:
 * - Comprehensive Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
 *   - Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
 */

// External Dependencies
import { Request, Response } from 'express'; // Used for handling HTTP requests and responses (express version ^4.17.1)
import jwt from 'jsonwebtoken'; // Used for verifying JWT tokens to authenticate users (jsonwebtoken version ^8.5.1)

// Internal Dependencies
import ReportModel from '../models/reportModel'; // Defines the schema and structure for report data used in the controller.
import dataAggregator from '../utils/dataAggregator'; // Aggregates data from various sources to generate comprehensive reports.
import authMiddleware from '../middlewares/authMiddleware'; // Ensures secure access by enforcing authentication and authorization.
import reportService from '../services/reportService'; // Handles the business logic for generating and managing reports.
import analyticsService from '../services/analyticsService'; // Provides analytical capabilities for processing and analyzing aggregated data.

/**
 * Handles GET requests to retrieve specific reports based on provided criteria.
 * 
 * Requirements Addressed:
 * - TR-F006.2 Generate detailed expense reports by employee, department, project, or cost center.
 *   (Technical Specification/13.6 Reporting and Analytics)
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns void - Sends the retrieved report data as a response.
 */
export const getReport = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Extract report criteria from the request parameters.
        const criteria = req.query;
        // Step 2: Use the reportService to fetch the report data based on the criteria.
        const reportData = await reportService.getReportData(criteria);
        // Step 3: Send the fetched report data as a JSON response.
        res.status(200).json({
            success: true,
            data: reportData,
        });
    } catch (error) {
        // Error handling: Send error response with appropriate status code.
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve report data.',
            error: error.message,
        });
    }
};

/**
 * Handles POST requests to generate insights from report data.
 * 
 * Requirements Addressed:
 * - TR-F006.1 Offer customizable dashboards for different user roles.
 * - TR-F006.3 Perform trend analysis for travel spending.
 *   (Technical Specification/13.6 Reporting and Analytics)
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns void - Sends the generated insights as a response.
 */
export const postInsights = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Extract data for insights generation from the request body.
        const insightData = req.body;
        // Step 2: Use the analyticsService to process the data and generate insights.
        const insights = await analyticsService.generateInsights(insightData);
        // Step 3: Send the generated insights as a JSON response.
        res.status(200).json({
            success: true,
            data: insights,
        });
    } catch (error) {
        // Error handling: Send error response with appropriate status code.
        res.status(500).json({
            success: false,
            message: 'Failed to generate insights.',
            error: error.message,
        });
    }
};

export default {
    getReport,
    postInsights,
};