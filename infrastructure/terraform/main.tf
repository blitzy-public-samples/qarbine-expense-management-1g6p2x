# Main Terraform configuration file
# Addresses Requirement: Infrastructure Orchestration
# Location: SYSTEM ARCHITECTURE/Deployment Architecture
# Description: Coordinates the deployment of various infrastructure components, ensuring they work together seamlessly to support the application's requirements.

# Specify the required Terraform version and backend configuration for state management
terraform {
  required_version = ">= 0.12"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0.0" # Provides AWS resources and services for infrastructure deployment
    }
  }

  # Backend configuration for storing Terraform state in S3
  # Dependencies:
  # - infrastructure/terraform/backend.tf (Configures the backend for Terraform state management)
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "global-employee-travel-expense-tracking-app/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}

# Configure the AWS provider
# Dependencies:
# - infrastructure/terraform/providers.tf (Specifies the providers used in the Terraform configuration)
provider "aws" {
  region = "us-west-2"
}

# Include modules for different infrastructure components

# CI/CD Module
# Module: ci-cd
# Source: ./modules/ci-cd
# Purpose: Sets up CI/CD infrastructure using AWS services
# Dependencies:
# - infrastructure/terraform/modules/ci-cd/main.tf
# Requirements Addressed:
# - Automates the build, testing, and deployment processes (Ref: SYSTEM COMPONENTS -> CI/CD Pipelines)
module "ci-cd" {
  source      = "./modules/ci-cd"
  environment = "production"
}

# Compute Module
# Module: compute
# Source: ./modules/compute
# Purpose: Manages compute resources such as EC2 instances and auto-scaling groups
# Dependencies:
# - infrastructure/terraform/modules/compute/main.tf
# Requirements Addressed:
# - Scalability and Reliability (Ref: SYSTEM ARCHITECTURE -> Scalability and Redundancy)
module "compute" {
  source        = "./modules/compute"
  instance_type = "t2.micro"
}

# Database Module
# Module: database
# Source: ./modules/database
# Purpose: Manages PostgreSQL RDS instances and related configurations
# Dependencies:
# - infrastructure/terraform/modules/database/main.tf
# Requirements Addressed:
# - Data Layer Setup (Ref: SYSTEM ARCHITECTURE -> Data Layer)
module "database" {
  source            = "./modules/database"
  db_instance_class = "db.t2.micro"
}

# Network Module
# Module: network
# Source: ./modules/network
# Purpose: Defines network infrastructure components like VPCs and subnets
# Dependencies:
# - infrastructure/terraform/modules/network/main.tf
# Requirements Addressed:
# - Network Architecture (Ref: INFRASTRUCTURE -> Network Architecture)
module "network" {
  source   = "./modules/network"
  vpc_cidr = "10.0.0.0/16"
}

# Security Module
# Module: security
# Source: ./modules/security
# Purpose: Implements security measures such as security groups and IAM roles
# Dependencies:
# - infrastructure/terraform/modules/security/main.tf
# Requirements Addressed:
# - Security and Compliance (Ref: SECURITY CONSIDERATIONS)
module "security" {
  source            = "./modules/security"
  enable_encryption = true
}

# Storage Module
# Module: storage
# Source: ./modules/storage
# Purpose: Defines storage resources such as S3 buckets
# Dependencies:
# - infrastructure/terraform/modules/storage/main.tf
# Requirements Addressed:
# - Object Storage Setup (Ref: SYSTEM ARCHITECTURE -> Data Layer)
module "storage" {
  source      = "./modules/storage"
  bucket_name = "my-app-storage"
}

# Note: Additional variables and outputs are managed in separate files
# Dependencies:
# - infrastructure/terraform/variables.tf (Defines input variables for the Terraform configuration)
# - infrastructure/terraform/outputs.tf (Defines output values for the Terraform configuration)