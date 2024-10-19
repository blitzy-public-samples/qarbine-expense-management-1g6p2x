# Terraform configuration for defining main storage resources
# for the Global Employee Travel Expense Tracking App.

###########################################################################
# Requirement Addressed:
# - Name: Storage Infrastructure Setup
#   Location: SYSTEM ARCHITECTURE/Cloud Services/Storage
#   Description: Defines and manages storage resources such as S3 buckets,
#                ensuring they are configured according to the application's
#                requirements.
###########################################################################

# External Dependency:
# - Resource: aws_s3_bucket
#   Module: hashicorp/aws
#   Version: >= 3.0.0
#   Purpose: Provides AWS S3 bucket resources for storage.

# Internal Dependencies:
# - Variable: bucket_name
#   Source: infrastructure/terraform/modules/storage/variables.tf
#   Purpose: Defines the name of the S3 bucket.

# - Variable: bucket_acl
#   Source: infrastructure/terraform/modules/storage/variables.tf
#   Purpose: Specifies the access control list for the S3 bucket.

# - Variable: bucket_tags
#   Source: infrastructure/terraform/modules/storage/variables.tf
#   Purpose: Assigns tags to the S3 bucket for identification and management.

###########################################################################
# Resource: aws_s3_bucket.bucket
# Description: Defines an S3 bucket for storing application data and assets.
# Steps:
# 1. Specify the bucket name using the 'bucket_name' variable.
# 2. Set the ACL for the bucket using the 'bucket_acl' variable.
# 3. Apply tags to the bucket using the 'bucket_tags' variable.
###########################################################################

resource "aws_s3_bucket" "bucket" {
  # Specify the bucket name using the 'bucket_name' variable.
  bucket = var.bucket_name

  # Set the ACL for the bucket using the 'bucket_acl' variable.
  acl    = var.bucket_acl

  # Apply tags to the bucket using the 'bucket_tags' variable.
  tags   = var.bucket_tags
}

###########################################################################
# Outputs
# Purpose: Outputs essential information about the S3 bucket for use in
#          other modules and components.
###########################################################################

# Output: bucket_name
# Description: Outputs the name of the S3 bucket.
# Requirement Addressed:
# - Aligns with the need to reference the bucket name in other configurations.
output "bucket_name" {
  description = "Outputs the name of the S3 bucket."
  value       = aws_s3_bucket.bucket.id
}

# Output: bucket_arn
# Description: Outputs the ARN of the S3 bucket.
# Requirement Addressed:
# - Allows other resources to have permissions or references to this bucket.
output "bucket_arn" {
  description = "Outputs the ARN of the S3 bucket."
  value       = aws_s3_bucket.bucket.arn
}