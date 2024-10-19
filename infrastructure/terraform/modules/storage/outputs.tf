# Output: bucket_name
# Description: Outputs the name of the S3 bucket.
# Requirement Addressed:
#   - Name: Storage Outputs
#   - Location: SYSTEM ARCHITECTURE/Cloud Services/Storage
#   - Description: Defines outputs for storage resources, allowing other modules to reference the S3 bucket name and ARN.
#
# This output exposes the S3 bucket name created in the storage module.
# Other modules, such as the Expense Management Service or the Reporting and Analytics Service, can use this output to store and retrieve receipts, digital documents, and backups securely.
# Refer to the technical specification under "SYSTEM ARCHITECTURE" -> "Data Layer" -> "Object Storage (AWS S3)" for more details on how S3 is used within the system.

output "bucket_name" {
  description = "Outputs the name of the S3 bucket."
  value       = aws_s3_bucket.bucket.id
}

# Output: bucket_arn
# Description: Outputs the ARN of the S3 bucket.
# Requirement Addressed:
#   - Name: Storage Outputs
#   - Location: SYSTEM ARCHITECTURE/Cloud Services/Storage
#   - Description: Defines outputs for storage resources, allowing other modules to reference the S3 bucket name and ARN.
#
# The ARN of the S3 bucket is critical for configuring IAM policies, access control, and integration with other AWS services that require the bucket's ARN.
# For example, the backend services may need to reference the bucket ARN to set up proper permissions.
# Refer to the technical specification under "SYSTEM ARCHITECTURE" -> "Security Layer" and "Data Layer" for details about security considerations related to storage.

output "bucket_arn" {
  description = "Outputs the ARN of the S3 bucket."
  value       = aws_s3_bucket.bucket.arn
}