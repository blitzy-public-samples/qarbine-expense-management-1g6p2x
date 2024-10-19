/*
 * Variable definitions for the Storage module.
 *
 * This file defines input variables for configuring the S3 bucket resources in the storage module.
 * It allows customization of the bucket's name, access control, and tags.
 *
 * Requirements Addressed:
 * - **Storage Configuration Variables**
 *   - *Location:* SYSTEM ARCHITECTURE/Cloud Services/Storage
 *   - *Description:* Provides configurable variables for storage resources, enabling customization of S3 bucket properties such as name, ACL, and tags.
 *
 * Dependencies:
 * - These variables are utilized in **main.tf** within this module to configure the S3 bucket resource.
 *   - **bucket_name:** Defines the name of the S3 bucket.
 *   - **bucket_acl:** Specifies the access control list for the S3 bucket.
 *   - **bucket_tags:** Assigns tags to the S3 bucket for identification and management.
 */

/**
 * Variable: bucket_name
 *
 * Description:
 * Specifies the name of the S3 bucket. This variable allows customization to ensure uniqueness across AWS.
 *
 * Requirement Addressed:
 * - **Storage Configuration Variables**
 *   - *Location:* SYSTEM ARCHITECTURE/Cloud Services/Storage
 */
variable "bucket_name" {
  description = "The name of the S3 bucket."
  type        = string
  default     = "default-bucket-name"
}

/**
 * Variable: bucket_acl
 *
 * Description:
 * Determines the Access Control List (ACL) for the S3 bucket, controlling access permissions.
 * Common values include "private", "public-read", etc.
 *
 * Requirement Addressed:
 * - **Storage Configuration Variables**
 *   - *Location:* SYSTEM ARCHITECTURE/Cloud Services/Storage
 */
variable "bucket_acl" {
  description = "The access control list (ACL) for the S3 bucket."
  type        = string
  default     = "private"
}

/**
 * Variable: bucket_tags
 *
 * Description:
 * A map of tags to assign to the S3 bucket for identification, billing, and management purposes.
 *
 * Requirement Addressed:
 * - **Storage Configuration Variables**
 *   - *Location:* SYSTEM ARCHITECTURE/Cloud Services/Storage
 */
variable "bucket_tags" {
  description = "A map of tags to assign to the S3 bucket."
  type        = map(string)
  default     = {
    Environment = "development"
    Project     = "Global Employee Travel Expense Tracking"
  }
}