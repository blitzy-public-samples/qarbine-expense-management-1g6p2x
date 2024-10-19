// Importing required modules
// mongoose version: ^5.10.9
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a Report document in MongoDB.
 */
export interface IReport extends Document {
    title: string;
    createdAt: Date;
    data: any[];
    createdBy: mongoose.Types.ObjectId;
    reportType: string;
    parameters: any;
    format: string;
}

/**
 * Mongoose Schema for Report data.
 * 
 * This schema defines the structure of report documents stored in the database.
 * 
 * Requirements Addressed:
 * - Comprehensive Reporting and Analytics
 *   - Location: Technical Specification/13.6 Reporting and Analytics
 *   - Description: Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
 */
const ReportSchema: Schema = new Schema({
    /**
     * Title of the report.
     * 
     * Stores a descriptive title for the report, which helps in identifying the report content.
     * 
     * Addresses:
     * - TR-F006.1: Offer customizable dashboards for different user roles.
     */
    title: { type: String, required: true },
    
    /**
     * Date when the report was created.
     * 
     * Used for timestamping reports and organizing them chronologically.
     */
    createdAt: { type: Date, default: Date.now },
    
    /**
     * Data contained in the report.
     * 
     * An array that holds the report data, which may include various metrics, statistics, or aggregated expense information.
     * 
     * Addresses:
     * - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center.
     * - TR-F006.3: Perform trend analysis for travel spending.
     */
    data: { type: Array, required: true },

    /**
     * Reference to the user who generated the report.
     * 
     * Links the report to the creator, which is essential for audit trails and user-specific reports.
     */
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    /**
     * Type of the report.
     * 
     * Specifies the kind of report, such as 'expenseSummary', 'taxLiability', or 'trendAnalysis', aligning with different reporting needs.
     * 
     * Addresses:
     * - TR-F006.5: Provide tax liability reports for different jurisdictions.
     * - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center.
     */
    reportType: { type: String, required: true },

    /**
     * Parameters used for generating the report.
     * 
     * Stores any filters or criteria applied, such as date ranges, departments, projects, or cost centers, supporting customizable reporting.
     * 
     * Addresses:
     * - TR-F006.1: Offer customizable dashboards for different user roles.
     * - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center.
     */
    parameters: { type: Object, required: false },

    /**
     * Format of the report export.
     * 
     * Indicates the format in which the report is exported, e.g., 'PDF', 'Excel', or 'CSV', supporting export capabilities.
     * 
     * Addresses:
     * - TR-F006.4: Enable export capabilities in multiple formats (e.g., PDF, Excel, CSV).
     */
    format: { type: String, required: false },
});

/**
 * Initializes the Report model with the defined schema.
 * 
 * Steps:
 * 1. Define the schema for report data using Mongoose.
 * 2. Initialize the Mongoose model with the defined schema.
 * 3. Export the model for use in other modules.
 */
export const ReportModel = mongoose.model<IReport>('Report', ReportSchema);