// src/backend/approval-workflow-service/src/models/approvalModel.ts

/**
 * ApprovalModel.ts
 * 
 * This file defines the data model for approval records within the approval workflow service.
 * It addresses the requirements for the Approval Workflow as specified in:
 * Technical Specification/13.4 Approval Workflow
 * - Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
 */

import mongoose, { Schema, Document } from 'mongoose'; // Version 5.13.8
// Importing mongoose version 5.13.8 for interacting with MongoDB to manage approval data.

import { sendApprovalNotification } from '../utils/notificationService'; // Used to send notifications to users about the status of their approvals.
import { authenticateRequest, authorizeRequest } from '../middlewares/authMiddleware'; // Middleware to ensure requests are authenticated and authorized based on user roles.
import { createApproval, updateApproval, getApproval } from '../services/approvalService'; // Handles creation, updating, and retrieval of approval records.

/**
 * Interface defining the structure of an Approval document.
 */
export interface IApproval extends Document {
    status: string;
    approverId: string;
    createdAt: Date;
    updatedAt: Date;
    expenseReportId: string;
    updateStatus(newStatus: string): void;
}

/**
 * Approval Schema
 * 
 * Defines the schema for approval records, including fields for status, approver, timestamps, and related expense report IDs.
 * This schema is part of the Approval Workflow Service as per Technical Specification/13.4 Approval Workflow.
 */
const ApprovalSchema: Schema = new Schema({
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected'],
        /**
         * The initial status of the approval.
         * Allowed values: 'Pending', 'Approved', 'Rejected'.
         * Initial value set in the constructor.
         */
    },
    approverId: {
        type: String,
        required: true,
        /**
         * The ID of the approver responsible for this approval.
         * Assigned in the constructor.
         */
    },
    expenseReportId: {
        type: String,
        required: true,
        /**
         * The ID of the related expense report that this approval is associated with.
         * Assigned in the constructor.
         */
    },
    createdAt: {
        type: Date,
        default: Date.now,
        /**
         * Timestamp indicating when the approval record was created.
         * Initialized in the constructor.
         */
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        /**
         * Timestamp indicating when the approval record was last updated.
         * Initialized in the constructor.
         * Updated automatically on save.
         */
    }
});

/**
 * Class representing an Approval Model.
 * 
 * Defines the schema for approval records, including fields for status, approver, timestamps, and related expense report IDs.
 * This class addresses requirements from Technical Specification/13.4 Approval Workflow.
 */
class ApprovalModelClass {

    status: string;
    approverId: string;
    createdAt: Date;
    updatedAt: Date;
    expenseReportId: string;

    /**
     * Initializes a new instance of the ApprovalModel with default values for timestamps and status.
     * Addresses requirements from Technical Specification/13.4 Approval Workflow.
     * @param status Initial status of the approval.
     * @param approverId ID of the approver.
     * @param expenseReportId ID of the related expense report.
     */
    constructor(status: string, approverId: string, expenseReportId: string) {
        // Set the initial status of the approval.
        this.status = status || 'Pending';

        // Assign the approver ID and related expense report ID.
        this.approverId = approverId;
        this.expenseReportId = expenseReportId;

        // Initialize createdAt and updatedAt timestamps.
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Updates the status of the approval record and modifies the updatedAt timestamp.
     * Addresses requirements from Technical Specification/13.4 Approval Workflow.
     * @param newStatus The new status to set.
     */
    updateStatus(newStatus: string): void {
        // Set the status to the newStatus.
        this.status = newStatus;

        // Update the updatedAt timestamp to the current date and time.
        this.updatedAt = new Date();

        // Save changes to the database.
        // Note: In the context of Mongoose, 'this' refers to the document instance.
        this.save();

        // Send notification to the user about the status update.
        sendApprovalNotification(this);
    }
}

// Load the class into the schema
ApprovalSchema.loadClass(ApprovalModelClass);

/**
 * Middleware to automatically update the updatedAt timestamp before saving.
 */
ApprovalSchema.pre<IApproval>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

/**
 * Export the Approval model.
 */
export const ApprovalModel = mongoose.model<IApproval>('Approval', ApprovalSchema);