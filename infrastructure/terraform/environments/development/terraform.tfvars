# Development Environment Terraform Variables
# -------------------------------------------------------------
# This file configures the development environment with specific parameters
# to facilitate testing and development activities.
# Requirements Addressed:
# - Development Environment Configuration
#   (Location: INFRASTRUCTURE/Deployment Environment/Environment Types)
# -------------------------------------------------------------

# Pipeline Configuration
pipeline_name      = "dev-pipeline"           # Name of the CI/CD pipeline for development
github_repository  = "my-org/dev-repo"        # GitHub repository for the development environment

# Build Environment Settings
build_compute_type = "BUILD_GENERAL1_SMALL"   # AWS CodeBuild compute type (Standard: 3 GB RAM, 2 vCPUs)
build_image        = "aws/codebuild/standard:4.0"  # AWS CodeBuild image version 4.0

# AWS Region Configuration
region = "us-west-2"  # AWS region for deployment (e.g., us-west-2 for Oregon)

# EC2 Instance Configuration
ami_id        = "ami-0abcdef1234567890"  # Amazon Machine Image ID for EC2 instances in development
instance_type = "t2.micro"               # Instance type for EC2 (1 vCPU, 1 GB RAM) suitable for development
key_name      = "dev-key-pair"           # Name of the SSH key pair for accessing EC2 instances

# Auto Scaling Configuration
min_size = 1  # Minimum number of EC2 instances in the Auto Scaling Group
max_size = 3  # Maximum number of EC2 instances in the Auto Scaling Group

# Database Configuration
db_instance_class     = "db.t2.micro"           # RDS instance class suitable for development workloads
db_allocated_storage  = 20                      # Storage allocated for the RDS instance in GB
db_engine_version     = "12.4"                  # Version of the database engine (e.g., PostgreSQL 12.4)
db_name               = "dev_db"                # Name of the development database
db_username           = "dev_user"              # Username for the database authentication
db_password           = "dev_password"          # Password for the database (ensure secure handling in production)
db_subnet_group       = "dev-db-subnet-group"   # Subnet group for the RDS instance
db_security_groups    = ["dev-db-sg"]           # Security groups assigned to the RDS instance

# Network Configuration
vpc_cidr              = "10.0.0.0/16"           # CIDR block for the Virtual Private Cloud (VPC)
public_subnet_cidrs   = ["10.0.1.0/24"]         # CIDR blocks for public subnets within the VPC
private_subnet_cidrs  = ["10.0.2.0/24"]         # CIDR blocks for private subnets within the VPC
availability_zones    = ["us-west-2a", "us-west-2b"]  # AWS availability zones for resource distribution
enable_dns_support    = true                    # Enable DNS support in the VPC
enable_dns_hostnames  = true                    # Enable DNS hostnames in the VPC

# Security Configurations
allowed_ip_ranges   = ["0.0.0.0/0"]  # IP ranges allowed to access resources (Note: "0.0.0.0/0" allows all IPs for testing; restrict in production)
iam_role_names      = ["dev-role"]    # IAM role names used by resources in the development environment
security_group_name = "dev-sg"        # Security group for EC2 instances allowing necessary inbound/outbound traffic

# S3 Bucket Configuration
bucket_name = "dev-app-storage"  # Name of the S3 bucket for storing application data
bucket_acl  = "private"          # Access control list setting for the bucket (private access)

# Tags for Resources
bucket_tags = {
  Environment = "Development"
  Project     = "Global Employee Travel Expense Tracking"
}
# The tags help in identifying and managing resources specific to the development environment.
# They align with the requirement to enhance efficiency in resource tracking
# (Reference: SYSTEM DESIGN - Database Design)