# -------------------------------------------------------------------
# Providers Configuration
# This Terraform configuration file specifies the providers required for deploying the infrastructure of the Global Employee Travel Expense Tracking App.
# Providers are responsible for managing the lifecycle of resources and interacting with cloud services.
# 
# Requirements Addressed:
# - Provider Configuration
#   - Location: INFRASTRUCTURE/Deployment Environment/Cloud Services
#   - Description: Defines the cloud service providers and their configurations necessary for resource management and deployment.
# -------------------------------------------------------------------

# Terraform settings
terraform {
  # Required Terraform version as specified in global configurations
  # Globals Reference:
  # - terraform.required_version: ">= 0.12"
  required_version = ">= 0.12"

  required_providers {
    # AWS provider for resource management and deployment
    # External Dependency:
    # - Name: aws
    # - Module: hashicorp/aws
    # - Version: >= 3.0.0
    # - Purpose: Provides AWS resources and services for infrastructure deployment.
    aws = {
      source  = "hashicorp/aws"  # Version: >= 3.0.0
      version = ">= 3.0.0"
    }
  }
}

# AWS Provider configuration
# Defines the AWS provider and its configurations necessary for resource management and deployment.
# Requirements Addressed:
# - Provider Configuration
#   - Location: INFRASTRUCTURE/Deployment Environment/Cloud Services
provider "aws" {
  region = "us-west-2"  # AWS region as specified in providers configuration
}