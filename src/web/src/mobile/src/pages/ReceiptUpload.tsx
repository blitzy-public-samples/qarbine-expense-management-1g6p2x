// External Dependencies
// React v17.0.2
import React, { useState, useCallback } from 'react';
// Lodash v4.17.21
import _ from 'lodash';

// Internal Dependencies
import { useAuthContext } from '../utils/contexts'; // Manages and accesses authentication state within the component.
import { useFetchData } from '../utils/hooks'; // Fetches data from APIs within the component.
import { validateForm } from '../utils/validation'; // Validates form data before submission.
import MobileHeader from '../components/MobileHeader'; // Provides a consistent header across the mobile application.
import MobileFooter from '../components/MobileFooter'; // Provides a consistent footer across the mobile application.
import ExpenseCapture from '../components/ExpenseCapture'; // Facilitates the capture and submission of expense details and receipts.
import Notifications from '../components/Notifications'; // Displays user notifications related to receipt uploads and processing.

// Additional Dependencies
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'; // Core components for building the UI.
import * as ImagePicker from 'expo-image-picker'; // Allows image selection and camera access.
import { uploadReceipt, processReceiptOCR } from '../utils/api'; // API functions for uploading and processing receipts.

/**
 * ReceiptUpload Component
 *
 * Renders the Receipt Upload interface, allowing users to upload and manage receipts for their expenses.
 *
 * Addresses requirements:
 * - Enable employees to efficiently capture and submit travel expenses through user-friendly mobile interfaces.
 *   - Location: Technical Specification/13.2 Expense Submission/TR-F002.1
 * - Utilize OCR technology for automatic receipt scanning and data extraction.
 *   - Location: Technical Specification/13.2 Expense Submission/TR-F002.2
 * - Allow attachment of digital receipts or photos of physical receipts.
 *   - Location: Technical Specification/13.2 Expense Submission/TR-F002.4
 */
const ReceiptUpload: React.FC = () => {
  // Access authentication state using useAuthContext.
  const { user } = useAuthContext();

  // State variables for receipt images and upload status.
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  /**
   * handleReceiptUpload
   *
   * Handles the user's action to select or capture a receipt image, uploads it, and processes it using OCR.
   *
   * Steps:
   * 1. Request permissions for camera and media library access.
   * 2. Allow the user to capture a new photo or select one from the library.
   * 3. Validate the selected image.
   * 4. Upload the image to the server.
   * 5. Initiate OCR processing on the uploaded image.
   * 6. Update the UI based on the result.
   *
   * Addresses requirements:
   * - Utilize OCR technology for automatic receipt scanning and data extraction.
   *   - Location: Technical Specification/13.2 Expense Submission/TR-F002.2
   */
  const handleReceiptUpload = useCallback(async () => {
    try {
      // Reset previous status and errors.
      setErrorMessage('');
      setUploadStatus('');
      setIsProcessing(true);

      // Request permissions for camera and media library access.
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        setErrorMessage('Camera and media library permissions are required.');
        setIsProcessing(false);
        return;
      }

      // Allow the user to select an image or capture a new one.
      const imageResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!imageResult.cancelled) {
        // Validate the selected image.
        const isValid = validateForm({ receiptImage: imageResult.uri });
        if (!isValid) {
          setErrorMessage('Invalid image selected. Please try again.');
          setIsProcessing(false);
          return;
        }

        // Update receipt image state.
        setReceiptImage(imageResult.uri);

        // Upload the image to the server.
        const uploadResponse = await uploadReceipt(imageResult.uri, user.token);
        if (!uploadResponse.success) {
          setErrorMessage('Failed to upload receipt. Please try again.');
          setIsProcessing(false);
          return;
        }

        // Initiate OCR processing on the uploaded image.
        const ocrResponse = await processReceiptOCR(uploadResponse.receiptId, user.token);
        if (!ocrResponse.success) {
          setErrorMessage('Failed to process receipt. Please try again.');
          setIsProcessing(false);
          return;
        }

        // Update UI based on the result.
        setUploadStatus('Receipt uploaded and processed successfully.');
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      // Handle any unexpected errors.
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  }, [user.token]);

  return (
    /**
     * Render the Receipt Upload interface.
     *
     * Includes:
     * - MobileHeader for consistent app header.
     * - Receipt image display or placeholder.
     * - Upload status and error messages.
     * - Button to trigger receipt upload.
     * - Notifications and MobileFooter components.
     *
     * Addresses requirements:
     * - Allow attachment of digital receipts or photos of physical receipts.
     *   - Location: Technical Specification/13.2 Expense Submission/TR-F002.4
     * - Apply styles for a consistent and user-friendly interface.
     */
    <View style={styles.container}>
      <MobileHeader title="Receipt Upload" />
      <View style={styles.content}>
        {receiptImage ? (
          <Image source={{ uri: receiptImage }} style={styles.receiptImage} />
        ) : (
          <Text style={styles.placeholderText}>No receipt selected.</Text>
        )}

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {uploadStatus ? <Text style={styles.successText}>{uploadStatus}</Text> : null}

        {isProcessing ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleReceiptUpload}>
            <Text style={styles.buttonText}>Capture Receipt</Text>
          </TouchableOpacity>
        )}

        {/* The ExpenseCapture component can be integrated here to capture additional details if necessary. */}
      </View>
      <Notifications /> {/* Displays user notifications related to receipt uploads and processing. */}
      <MobileFooter /> {/* Provides a consistent footer across the mobile application. */}
    </View>
  );
};

// Styles for the ReceiptUpload component to ensure a consistent and user-friendly interface.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  receiptImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 8,
  },
  successText: {
    color: '#00AA00',
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ReceiptUpload;