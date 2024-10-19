# This Terraform variables file for the staging environment sets specific configurations
# for various infrastructure components such as compute, database, network, security, and storage.
# Requirements Addressed:
# - Name: Staging Environment Configuration
# - Location: INFRASTRUCTURE / Deployment Environment / Environment Types
# - Description: Configures the staging environment with specific parameters to facilitate
#   testing and validation activities before production deployment.

# --- Pipeline Configuration ---
# Name of the CI/CD pipeline for the staging environment.
# This configures the pipeline as per the CI/CD Pipeline in INFRASTRUCTURE / CI/CD Pipeline.
pipeline_name = "staging-pipeline"

# GitHub repository for the staging codebase.
# Ref: Source Control in INFRASTRUCTURE / CI/CD Pipeline.
github_repository = "my-org/staging-repo"

# AWS CodeBuild compute type used for building the application.
# Ref: Build Tools in TECHNOLOGY STACK / CI/CD Pipeline.
build_compute_type = "BUILD_GENERAL1_MEDIUM"

# AWS CodeBuild image version used for builds.
# Version specified to ensure consistency across build environments.
build_image = "aws/codebuild/standard:4.0"  # Version 4.0

# --- Infrastructure Region Configuration ---
# AWS region where the staging environment is deployed.
# Deployment in 'us-west-2' as per Deployment Environment in INFRASTRUCTURE / Deployment Environment.
region = "us-west-2"

# --- Compute Configuration ---
# AMI ID for EC2 instances in the staging environment.
# Ref: Compute in INFRASTRUCTURE / Cloud Services.
ami_id = "ami-0abcdef1234567890"

# EC2 instance type for the staging environment.
# 't2.medium' provides a balance suitable for testing workloads.
instance_type = "t2.medium"

# SSH key pair name for accessing EC2 instances.
# Ensures secure access as per Security in INFRASTRUCTURE / Security Considerations.
key_name = "staging-key-pair"

# Minimum number of EC2 instances in the Auto Scaling Group.
# Supports high availability during testing phases.
min_size = 1

# Maximum number of EC2 instances in the Auto Scaling Group.
# Allows scalability for performance testing.
max_size = 5

# --- Database Configuration ---
# RDS instance class for the database.
# 'db.t2.small' is cost-effective for staging purposes.
# Ref: Databases in TECHNOLOGY STACK / Databases.
db_instance_class = "db.t2.small"

# Storage allocated for the RDS instance in GB.
# Adequate for staging data requirements.
db_allocated_storage = 50

# Database engine version used in the staging environment.
db_engine_version = "12.4"

# Name of the staging database.
db_name = "staging_db"

# Database username for authentication.
db_username = "staging_user"

# Database password for authentication.
# Note: Handle sensitive data securely as per SECURITY CONSIDERATIONS / Data Security.
db_password = "staging_password"

# RDS subnet group name for database networking.
# Ref: Network Configuration in INFRASTRUCTURE / Network Architecture.
db_subnet_group = "staging-db-subnet-group"

# Security groups attached to the RDS instance.
# Controls access as per Security Layer in TECHNOLOGY STACK / Security Layer.
db_security_groups = ["staging-db-sg"]

# --- Network Configuration ---
# CIDR block for the Virtual Private Cloud (VPC).
# Defines the IP address range as per Network Architecture in INFRASTRUCTURE / Deployment Environment.
vpc_cidr = "10.0.0.0/16"

# CIDR blocks for public subnets within the VPC.
# Used for resources needing internet access.
public_subnet_cidrs = ["10.0.1.0/24"]

# CIDR blocks for private subnets within the VPC.
# Used for internal resources.
private_subnet_cidrs = ["10.0.2.0/24"]

# Availability zones for deploying resources to enhance redundancy.
availability_zones = ["us-west-2a", "us-west-2b"]

# Enable DNS support in the VPC.
enable_dns_support = true

# Enable DNS hostnames in the VPC.
enable_dns_hostnames = true

# IP ranges allowed to access the resources.
# '0.0.0.0/0' allows all IPs; review for security as per SECURITY CONSIDERATIONS / Network Security.
allowed_ip_ranges = ["0.0.0.0/0"]

# --- Security Configuration ---
# IAM role names for the staging environment.
# Defines permissions as per Security Layer in TECHNOLOGY STACK / Security Layer.
iam_role_names = ["staging-role"]

# Security group name for EC2 instances.
# Controls inbound and outbound traffic.
security_group_name = "staging-sg"

# --- Storage Configuration ---
# S3 bucket name for storing application data.
# Ref: Storage in INFRASTRUCTURE / Cloud Services.
bucket_name = "staging-app-storage"

# Access control list for the S3 bucket.
# 'private' restricts access to the bucket owner.
bucket_acl = "private"

# Tags applied to the S3 bucket for resource management.
bucket_tags = {
  Environment = "Staging"
  Project     = "Global Employee Travel Expense Tracking"
}