// External Dependencies
// mongoose version 5.13.8 - Used via ApprovalModel for interacting with MongoDB.
// nodemailer version 6.6.3 - Used in notificationService for sending email notifications.

// Internal Dependencies
import { ApprovalModel } from '../models/approvalModel'; // Defines the schema for approval records and methods for database interaction.
import { sendApprovalNotification } from '../utils/notificationService'; // Used to send notifications about approval status changes.

// ApprovalService handles the business logic for managing approval workflows within the application.
// It includes functions for creating, updating, and retrieving approval records, as well as integrating
// with notification services to inform users of approval status changes.

// Technical Specification Reference:
// Approval Workflow - Technical Specification/13.4 Approval Workflow
// Description: Streamline the approval process for submitted expense reports with configurable workflows,
// batch processing, and delegation capabilities.

export class ApprovalService {
    /**
     * Creates a new approval record in the database and sends a notification to the approver.
     * 
     * Requirements Addressed:
     * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
     *   - TR-F004.1: Configure multi-level approval workflows
     *   - TR-F004.3: Provide in-app notifications for pending approvals
     * 
     * @param approvalData - The data for the new approval record.
     * @returns Promise that resolves with the created approval record.
     */
    async createApproval(approvalData: any): Promise<any> {
        try {
            // Step 1: Validate the approval data.
            // Validation logic can include checks for required fields, data types, and policy compliance.
            // For example, ensure that the approver exists and the expense report ID is valid.

            // Step 2: Create a new approval record using the ApprovalModel.
            const newApproval = new ApprovalModel(approvalData);
            const savedApproval = await newApproval.save();

            // Step 3: Send a notification to the approver using sendApprovalNotification.
            await sendApprovalNotification(savedApproval);

            // Step 4: Return the created approval record.
            return savedApproval;
        } catch (error) {
            // Handle errors appropriately, such as logging and rethrowing for higher-level handling.
            throw error;
        }
    }

    /**
     * Updates an existing approval record and notifies the relevant parties of the change.
     * 
     * Requirements Addressed:
     * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
     *   - TR-F004.4: Allow managers to request additional information or clarification on expenses
     *   - TR-F004.5: Support delegation of approval authority during manager absences
     * 
     * @param approvalId - The ID of the approval record to update.
     * @param updateData - The data to update the approval record with.
     * @returns Promise that resolves with the updated approval record.
     */
    async updateApproval(approvalId: string, updateData: any): Promise<any> {
        try {
            // Step 1: Find the approval record by ID using ApprovalModel.
            const approval = await ApprovalModel.findById(approvalId);
            if (!approval) {
                throw new Error('Approval record not found.');
            }

            // Step 2: Update the approval record with the provided data.
            Object.assign(approval, updateData);
            const updatedApproval = await approval.save();

            // Step 3: Send a notification about the update using sendApprovalNotification.
            await sendApprovalNotification(updatedApproval);

            // Step 4: Return the updated approval record.
            return updatedApproval;
        } catch (error) {
            // Handle errors appropriately.
            throw error;
        }
    }

    /**
     * Retrieves an approval record by its ID.
     * 
     * Requirements Addressed:
     * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
     * 
     * @param approvalId - The ID of the approval record to retrieve.
     * @returns Promise that resolves with the approval record if found.
     */
    async getApproval(approvalId: string): Promise<any> {
        try {
            // Step 1: Query the database for the approval record using the ApprovalModel.
            const approval = await ApprovalModel.findById(approvalId);

            // Step 2: Return the approval record if found, otherwise handle the error.
            if (!approval) {
                throw new Error('Approval record not found.');
            }
            return approval;
        } catch (error) {
            // Handle errors appropriately.
            throw error;
        }
    }
}