# Production environment variables configuration for the Global Employee Travel Expense Tracking App
# Addressing requirement: 'Production Environment Configuration' (Location: 'INFRASTRUCTURE/Deployment Environment/Environment Types')
# Defines specific variable values for the production environment to ensure optimal performance and security.

# Name of the CI/CD pipeline for the production environment
# Addressing 'CI/CD Pipeline' in 'INFRASTRUCTURE/CI/CD Pipeline'
pipeline_name = "prod-pipeline"

# GitHub repository for the production codebase
# Used in 'CI/CD Pipeline' for Continuous Integration
# Referenced in 'CI/CD Pipeline' under 'Source Control' in 'INFRASTRUCTURE/CI/CD Pipeline'
github_repository = "company/repo-prod"

# AWS CodeBuild compute type used for building the application in the production pipeline
# Ensures resources are adequate for build tasks in production
# Refer to 'CI/CD Pipeline' stage 'Continuous Integration' in 'INFRASTRUCTURE/CI/CD Pipeline'
build_compute_type = "BUILD_GENERAL1_LARGE"

# Docker image used by AWS CodeBuild in the production pipeline
# Ensures consistency in the build environment
# Referenced in 'CI/CD Pipeline' under 'Artifact Creation' in 'INFRASTRUCTURE/CI/CD Pipeline'
build_image = "aws/codebuild/standard:5.0"  # CodeBuild image version 5.0

# AWS region where the production resources will be deployed
# Ensuring high availability and compliance with data regulations
# Addressed in 'Deployment Environment' under 'Regions and Availability Zones' in 'INFRASTRUCTURE'
region = "us-west-2"

# AMI ID for EC2 instances in production
# Ensures consistency in compute resources
# Under 'Compute' in 'INFRASTRUCTURE/Cloud Services'
ami_id = "ami-0abcdef1234567890"

# EC2 instance type for the production environment
# Ensures optimal performance as per production requirements
# See 'Compute' in 'INFRASTRUCTURE/Cloud Services'
instance_type = "t3.large"

# SSH key pair name for accessing EC2 instances in production
# Needed for secure access management
# Under 'Security' in 'INFRASTRUCTURE/Security Layer'
key_name = "prod-keypair"

# Minimum number of instances in the auto-scaling group for production
# For scalability and high availability
# Addressed in 'Deployment Environment' under 'Scalability' in 'INFRASTRUCTURE'
min_size = 2

# Maximum number of instances in the auto-scaling group for production
# For handling peak loads
# Addressed in 'Deployment Environment' under 'Scalability' in 'INFRASTRUCTURE'
max_size = 10

# AWS RDS instance class for the production database
# Ensures database performance meets production demands
# See 'Database' in 'INFRASTRUCTURE/Cloud Services'
db_instance_class = "db.t3.medium"

# Storage allocated for RDS in GB
# Ensures sufficient storage capacity for production data
# See 'Database' in 'INFRASTRUCTURE/Cloud Services'
db_allocated_storage = 100

# Version of the database engine (e.g., PostgreSQL)
# Ensures compatibility with the application and required features
# See 'Database Design' in 'SYSTEM DESIGN'
db_engine_version = "12.4"

# Name of the production database
# For identification and connection purposes
# Related to 'Data Layer' in 'SYSTEM ARCHITECTURE'
db_name = "prod_db"

# Credentials for the production database
# Should be stored securely; placeholder here for illustration
# Under 'Security' policies in 'INFRASTRUCTURE/Security Layer'
db_username = "admin"
db_password = "securepassword"

# Subnet group for the production database
# Ensures the database is placed in the correct subnets
# Under 'Network Architecture' in 'Deployment Environment' in 'INFRASTRUCTURE'
db_subnet_group = "prod-db-subnet-group"

# Security groups applied to the production database
# For controlling network access
# Under 'Security' in 'INFRASTRUCTURE/Security Layer'
db_security_groups = ["sg-0abcd1234efgh5678"]

# CIDR block for the production VPC
# Defines IP addressing within the network
# Under 'Network Architecture' in 'Deployment Environment' in 'INFRASTRUCTURE'
vpc_cidr = "10.0.0.0/16"

# CIDR blocks for public subnets in production
# For resources requiring internet access
# Under 'Network Architecture' in 'Deployment Environment' in 'INFRASTRUCTURE'
public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]

# CIDR blocks for private subnets in production
# For resources not exposed to the internet
# Under 'Network Architecture' in 'Deployment Environment' in 'INFRASTRUCTURE'
private_subnet_cidrs = ["10.0.3.0/24", "10.0.4.0/24"]

# AWS availability zones to be used in production
# For high availability and fault tolerance
# Addressed in 'Deployment Environment' under 'Regions and Availability Zones' in 'INFRASTRUCTURE'
availability_zones = ["us-west-2a", "us-west-2b"]

# VPC setting to enable DNS support
# For internal service discovery
# Under 'Network Architecture' in 'Deployment Environment' in 'INFRASTRUCTURE'
enable_dns_support = true

# VPC setting to enable DNS hostnames
# Required for proper hostname resolution
# Under 'Network Architecture' in 'Deployment Environment' in 'INFRASTRUCTURE'
enable_dns_hostnames = true

# IP ranges allowed to access the production environment
# For security access control
# Under 'Security' policies in 'INFRASTRUCTURE/Security Layer'
allowed_ip_ranges = ["0.0.0.0/0"]  # Note: Allowing all IPs; ensure proper security groups are in place

# IAM role names to be used in production
# For defining permissions and access control
# Under 'Security' in 'INFRASTRUCTURE/Security Layer'
iam_role_names = ["prod-role"]

# Name of the security group for the production environment
# For network access control
# Under 'Security' in 'INFRASTRUCTURE/Security Layer'
security_group_name = "prod-security-group"

# Name of the S3 bucket for production
# For storing application data and assets
# Under 'Storage' in 'INFRASTRUCTURE/Cloud Services'
bucket_name = "prod-app-storage"

# Access control list setting for the S3 bucket
# To ensure appropriate permissions
# Under 'Security' in 'INFRASTRUCTURE/Security Layer'
bucket_acl = "private"

# Tags to be applied to the S3 bucket
# For identification and cost allocation
# Under 'Cloud Services' and 'Resource Management' in 'INFRASTRUCTURE'
bucket_tags = {
  Environment = "production"
  Project     = "Global Employee Travel Expense Tracking"
}