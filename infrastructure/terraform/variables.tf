# infrastructure/terraform/variables.tf
# This Terraform variables file defines the input variables used across various infrastructure modules,
# ensuring consistent and flexible configuration for different environments such as development, staging, and production.

################################################################################
# Requirements Addressed:
# - **Infrastructure Configuration**
#   - **Location:** INFRASTRUCTURE/Deployment Environment/Environment Types
#   - **Description:** Provides a centralized configuration for infrastructure modules,
#     ensuring consistency and flexibility in deployment.

################################################################################
# Variable: environment
# Description: The environment for which the infrastructure is being deployed (e.g., development, staging, production).
# Requirement Addressed:
# - Enables deployment to different environments as specified in the technical specification section:
#   **INFRASTRUCTURE/Deployment Environment/Environment Types**

variable "environment" {
  type        = string
  description = "The environment for which the infrastructure is being deployed (e.g., development, staging, production)."
}

################################################################################
# Variable: region
# Description: The AWS region where the infrastructure will be deployed.
# Requirement Addressed:
# - Supports deployment across multiple AWS regions to ensure high availability and fault tolerance as per:
#   **INFRASTRUCTURE/Deployment Environment**

variable "region" {
  type        = string
  description = "The AWS region where the infrastructure will be deployed."
}

################################################################################
# Variable: ami_id
# Description: The Amazon Machine Image (AMI) ID used for launching EC2 instances.
# Requirement Addressed:
# - Specifies the base image for compute resources, aligning with **Compute Resources** in:
#   **SYSTEM COMPONENTS/Cloud Services**

variable "ami_id" {
  type        = string
  description = "The Amazon Machine Image (AMI) ID used for launching EC2 instances."
}

################################################################################
# Variable: instance_type
# Description: The type of EC2 instance to be used.
# Requirement Addressed:
# - Configures compute resources to match performance requirements as described in:
#   **INFRASTRUCTURE/Compute**

variable "instance_type" {
  type        = string
  description = "The type of EC2 instance to be used."
}

################################################################################
# Variable: key_name
# Description: The name of the key pair to be used for SSH access to EC2 instances.
# Requirement Addressed:
# - Enables secure access to compute instances for maintenance, supporting:
#   **SECURITY CONSIDERATIONS/Data Security**

variable "key_name" {
  type        = string
  description = "The name of the key pair to be used for SSH access to EC2 instances."
}

################################################################################
# Variable: vpc_cidr
# Description: The CIDR block for the VPC.
# Requirement Addressed:
# - Defines network boundaries for resources, supporting the network architecture outlined in:
#   **INFRASTRUCTURE/Network Architecture**

variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC."
}

################################################################################
# Variable: public_subnet_cidrs
# Description: A list of CIDR blocks for public subnets.
# Requirement Addressed:
# - Segments network into public zones for resources that need internet access as per:
#   **INFRASTRUCTURE/Network Architecture**

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "A list of CIDR blocks for public subnets."
}

################################################################################
# Variable: private_subnet_cidrs
# Description: A list of CIDR blocks for private subnets.
# Requirement Addressed:
# - Segments network into private zones for internal resources, aligning with:
#   **INFRASTRUCTURE/Network Architecture**

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "A list of CIDR blocks for private subnets."
}

################################################################################
# Variable: db_instance_class
# Description: The instance class for the RDS database.
# Requirement Addressed:
# - Configures database resources according to the Data Layer in:
#   **SYSTEM ARCHITECTURE**

variable "db_instance_class" {
  type        = string
  description = "The instance class for the RDS database."
}

################################################################################
# Variable: db_allocated_storage
# Description: The allocated storage size for the RDS database in gigabytes.
# Requirement Addressed:
# - Ensures adequate storage for data persistence as per the Data Layer in:
#   **SYSTEM ARCHITECTURE**

variable "db_allocated_storage" {
  type        = number
  description = "The allocated storage size for the RDS database in gigabytes."
}

################################################################################
# Variable: bucket_name
# Description: The name of the S3 bucket for storing application data.
# Requirement Addressed:
# - Defines object storage resources as specified in the Data Layer of:
#   **SYSTEM ARCHITECTURE**

variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket for storing application data."
}

################################################################################
# Variable: availability_zones
# Description: The list of availability zones to deploy resources into.
# Requirement Addressed:
# - Enhances high availability and fault tolerance by deploying across multiple availability zones as per:
#   **INFRASTRUCTURE/Scalability and Redundancy**

variable "availability_zones" {
  type        = list(string)
  description = "The list of availability zones to deploy resources into."
}

################################################################################
# Variable: enable_ha
# Description: A flag to enable high availability features.
# Requirement Addressed:
# - Allows toggling high availability configurations in line with:
#   **INFRASTRUCTURE/Scalability and Reliability**

variable "enable_ha" {
  type        = bool
  description = "A flag to enable high availability features."
  default     = true
}

################################################################################
# Dependencies:
# - **main.tf** (infrastructure/terraform/main.tf)
#   - Integrates various modules and orchestrates the deployment of infrastructure components.
# - **outputs.tf** (infrastructure/terraform/outputs.tf)
#   - Defines output values for the Terraform configuration.
# - **providers.tf** (infrastructure/terraform/providers.tf)
#   - Specifies the providers used in the Terraform configuration.