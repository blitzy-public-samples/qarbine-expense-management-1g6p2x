// Addressing Requirement: Approval Workflow
// Location: Technical Specification/13.4 Approval Workflow
// This test file contains unit and integration tests for the approvalController in the approval workflow service.
// It ensures that the controller's endpoints for creating, updating, and retrieving approval records function correctly and handle errors appropriately.

import request from 'supertest'; // Used for testing HTTP endpoints (supertest version 6.1.3)
import app from '../app'; // The Express application instance

// Mocking internal dependencies
jest.mock('../models/approvalModel');
jest.mock('../utils/notificationService');
jest.mock('../middlewares/authMiddleware');

// Importing mocked modules
import { ApprovalModel } from '../models/approvalModel';
import { sendApprovalNotification } from '../utils/notificationService';
import { authenticateRequest, authorizeRequest } from '../middlewares/authMiddleware';

describe('Approval Controller Tests', () => {
  // Before each test, reset mocks and mock implementations
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock authenticateRequest to simulate authenticated requests
    (authenticateRequest as jest.Mock).mockImplementation((req, res, next) => next());

    // Mock authorizeRequest to simulate authorized requests
    (authorizeRequest as jest.Mock).mockImplementation((req, res, next) => next());
  });

  // Test for createApprovalHandler
  it('should process valid approval creation requests', async () => {
    // Addressing Requirement: Streamline approval creation
    // Location: Technical Specification/13.4 Approval Workflow - TR-F004.1
    // Steps:
    // 1. Mock dependencies such as ApprovalModel and sendApprovalNotification.
    // 2. Simulate a POST request to the create approval endpoint with valid data.
    // 3. Assert that the response status is 201 and the response body contains the created approval record.
    // 4. Verify that the ApprovalModel and sendApprovalNotification were called with the correct arguments.

    const mockApprovalData = {
      expenseReportId: 'ER123456',
      approverId: 'U789012',
      status: 'Pending',
      comments: 'Awaiting approval.',
    };

    // Mock the ApprovalModel.create method to resolve with a new approval record
    (ApprovalModel.create as jest.Mock).mockResolvedValue({
      _id: 'AP345678',
      ...mockApprovalData,
    });

    // Mock sendApprovalNotification to resolve successfully
    (sendApprovalNotification as jest.Mock).mockResolvedValue(true);

    // Simulate a POST request to create a new approval
    const response = await request(app)
      .post('/approvals')
      .send(mockApprovalData)
      .expect(201); // Expecting HTTP status 201 Created

    // Assert that the response contains the created approval record
    expect(response.body).toHaveProperty('_id', 'AP345678');
    expect(response.body).toMatchObject(mockApprovalData);

    // Verify that ApprovalModel.create was called with the correct data
    expect(ApprovalModel.create).toHaveBeenCalledWith(mockApprovalData);

    // Verify that sendApprovalNotification was called with the new approval record
    expect(sendApprovalNotification).toHaveBeenCalledWith({
      _id: 'AP345678',
      ...mockApprovalData,
    });
  });

  // Test for updateApprovalHandler
  it('should process valid approval update requests', async () => {
    // Addressing Requirement: Streamline approval updates
    // Location: Technical Specification/13.4 Approval Workflow - TR-F004.1
    // Steps:
    // 1. Mock dependencies such as ApprovalModel and sendApprovalNotification.
    // 2. Simulate a PUT request to the update approval endpoint with valid data.
    // 3. Assert that the response status is 200 and the response body contains the updated approval record.
    // 4. Verify that the ApprovalModel and sendApprovalNotification were called with the correct arguments.

    const approvalId = 'AP345678';
    const updateData = {
      status: 'Approved',
      comments: 'Approved by manager.',
    };

    // Mock the ApprovalModel.findByIdAndUpdate method to resolve with the updated approval record
    (ApprovalModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: approvalId,
      expenseReportId: 'ER123456',
      approverId: 'U789012',
      ...updateData,
    });

    // Mock sendApprovalNotification to resolve successfully
    (sendApprovalNotification as jest.Mock).mockResolvedValue(true);

    // Simulate a PUT request to update an approval
    const response = await request(app)
      .put(`/approvals/${approvalId}`)
      .send(updateData)
      .expect(200); // Expecting HTTP status 200 OK

    // Assert that the response contains the updated approval record
    expect(response.body).toHaveProperty('_id', approvalId);
    expect(response.body).toMatchObject(updateData);

    // Verify that ApprovalModel.findByIdAndUpdate was called with the correct arguments
    expect(ApprovalModel.findByIdAndUpdate).toHaveBeenCalledWith(
      approvalId,
      updateData,
      { new: true }
    );

    // Verify that sendApprovalNotification was called with the updated approval record
    expect(sendApprovalNotification).toHaveBeenCalledWith({
      _id: approvalId,
      expenseReportId: 'ER123456',
      approverId: 'U789012',
      ...updateData,
    });
  });

  // Test for getApprovalHandler
  it('should retrieve approval records by ID', async () => {
    // Addressing Requirement: Retrieve approval records
    // Location: Technical Specification/13.4 Approval Workflow - TR-F004.1
    // Steps:
    // 1. Mock the ApprovalModel to return a predefined approval record.
    // 2. Simulate a GET request to the get approval endpoint with a valid ID.
    // 3. Assert that the response status is 200 and the response body contains the expected approval record.
    // 4. Verify that the ApprovalModel was queried with the correct ID.

    const approvalId = 'AP345678';
    const mockApprovalRecord = {
      _id: approvalId,
      expenseReportId: 'ER123456',
      approverId: 'U789012',
      status: 'Pending',
      comments: 'Awaiting approval.',
    };

    // Mock the ApprovalModel.findById method to resolve with the approval record
    (ApprovalModel.findById as jest.Mock).mockResolvedValue(mockApprovalRecord);

    // Simulate a GET request to retrieve an approval by ID
    const response = await request(app)
      .get(`/approvals/${approvalId}`)
      .expect(200); // Expecting HTTP status 200 OK

    // Assert that the response contains the expected approval record
    expect(response.body).toEqual(mockApprovalRecord);

    // Verify that ApprovalModel.findById was called with the correct ID
    expect(ApprovalModel.findById).toHaveBeenCalledWith(approvalId);
  });
});