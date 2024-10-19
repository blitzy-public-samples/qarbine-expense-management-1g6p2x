// External dependencies
import { Request, Response } from 'express'; // Express version 4.17.1
import mongoose from 'mongoose'; // Mongoose version 5.13.8
import Stripe from 'stripe'; // Stripe version 8.174.0
import jwt from 'jsonwebtoken'; // jsonwebtoken version 8.5.1

// Internal dependencies
import { createReimbursement, processReimbursement } from '../controllers/reimbursementController';
import { processPayment } from '../utils/paymentProcessor';
import Reimbursement from '../models/reimbursementModel';
import { authenticate, authorize } from '../middlewares/authMiddleware';

// Jest testing framework
import { jest } from '@jest/globals';

/**
 * Unit tests for reimbursementController
 *
 * Requirements Addressed:
 * - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
 *   - Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.
 */

describe('reimbursementController', () => {
  /**
   * Tests the createReimbursement function to ensure it correctly handles reimbursement creation requests.
   *
   * Steps:
   * 1. Mock the request and response objects.
   * 2. Mock the Reimbursement model's validate and save functions.
   * 3. Call the createReimbursement function with the mocked objects.
   * 4. Assert that the response is successful and contains the expected reimbursement details.
   *
   * Requirements Addressed:
   * - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
   */
  describe('createReimbursement', () => {
    it('should create a new reimbursement request successfully', async () => {
      // Step 1: Mock the request and response objects.
      const req = {
        body: {
          employeeId: 'employee123',
          amount: 1000,
          currency: 'USD',
          method: 'Direct Deposit',
          bankDetails: {
            accountNumber: '123456789',
            routingNumber: '987654321',
          },
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Step 2: Mock the Reimbursement model's validate and save functions.
      jest
        .spyOn(Reimbursement.prototype, 'save')
        .mockImplementationOnce(async function () {
          return {
            _id: new mongoose.Types.ObjectId(),
            ...this,
            status: 'Pending',
            createdAt: new Date(),
          };
        });

      // Step 3: Call the createReimbursement function with the mocked objects.
      await createReimbursement(req, res);

      // Step 4: Assert that the response is successful and contains the expected reimbursement details.
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          employeeId: req.body.employeeId,
          amount: req.body.amount,
          currency: req.body.currency,
          method: req.body.method,
          status: 'Pending',
        })
      );

      // Clean up mocks.
      jest.restoreAllMocks();
    });
  });

  /**
   * Tests the processReimbursement function to ensure it correctly processes reimbursement requests.
   *
   * Steps:
   * 1. Mock the request and response objects.
   * 2. Mock the Reimbursement model's findById and update functions.
   * 3. Mock the processPayment utility to simulate payment processing.
   * 4. Call the processReimbursement function with the mocked objects.
   * 5. Assert that the response is successful and the reimbursement status is updated to 'Processed'.
   *
   * Requirements Addressed:
   * - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
   */
  describe('processReimbursement', () => {
    it('should process an existing reimbursement request successfully', async () => {
      // Step 1: Mock the request and response objects.
      const req = {
        params: {
          id: 'reimbursementId123',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mock reimbursement data.
      const reimbursementData = {
        _id: req.params.id,
        employeeId: 'employee123',
        amount: 1000,
        currency: 'USD',
        method: 'Direct Deposit',
        status: 'Pending',
        bankDetails: {
          accountNumber: '123456789',
          routingNumber: '987654321',
        },
        save: jest.fn().mockResolvedValue(true),
      };

      // Step 2: Mock the Reimbursement model's findById and update functions.
      jest
        .spyOn(Reimbursement, 'findById')
        .mockResolvedValue(reimbursementData as any);

      // Step 3: Mock the processPayment utility to simulate payment processing.
      jest.spyOn(processPayment, 'processPayment').mockResolvedValue({
        success: true,
        transactionId: 'txn_123456789',
      });

      // Step 4: Call the processReimbursement function with the mocked objects.
      await processReimbursement(req, res);

      // Step 5: Assert that the response is successful and the reimbursement status is updated to 'Processed'.
      expect(reimbursementData.status).toBe('Processed');
      expect(reimbursementData.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: req.params.id,
          status: 'Processed',
        })
      );

      // Clean up mocks.
      jest.restoreAllMocks();
    });
  });
});