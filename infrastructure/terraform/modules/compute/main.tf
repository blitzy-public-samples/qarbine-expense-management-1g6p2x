# Main Terraform configuration file for managing compute resources within AWS.
# This file includes the setup of EC2 instances, auto-scaling groups, and associated configurations
# to ensure scalable and reliable compute infrastructure.

terraform {
  # Configure required providers
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" # External Dependency: 'hashicorp/aws' (version >= 3.0)
      # External Dependencies:
      # - 'aws_instance' and 'aws_autoscaling_group' from 'hashicorp/aws' (version >= 3.0)
      # Technical Specification Reference:
      # - 'Technology Stack' -> '4. Third-Party Services' -> 'Cloud Hosting' (AWS EC2)
    }
  }
}

# Configure the AWS provider
provider "aws" {
  # AWS provider configurations such as region and credentials are expected to be provided
  # by the parent module or environment variables.
  # Globals:
  # - {'provider': 'aws'}
}

# ********** Resource Definitions **********

# Resource: aws_instance
# Description:
# - Defines EC2 instances with specific configurations for instance type, AMI ID, and key pair.
# Parameters:
# - var.ami (string): The ID of the AMI to use for the instance.
# - var.instance_type (string): The type of instance to start.
# - var.key_name (string): The name of the key pair to use for SSH access.

# Steps:
# 1. Specify the AMI ID for the EC2 instance.
# 2. Set the instance type for the EC2 instance.
# 3. Assign a key pair for SSH access to the instance.

# Requirements Addressed:
# - 'Scalability and Reliability'
# - Ensures that compute resources can scale and maintain high availability to meet application demands.
# - Location in Technical Specification: 'SYSTEM ARCHITECTURE' -> '6. Scalability and Redundancy'
#   - Describes the design for horizontal scalability using EC2 instances.

resource "aws_instance" "compute_instance" {
  ami           = var.ami           # Variable 'ami' defined in 'variables.tf' (Internal Dependency)
  instance_type = var.instance_type # Variable 'instance_type' defined in 'variables.tf' (Internal Dependency)
  key_name      = var.key_name      # Variable 'key_name' defined in 'variables.tf' (Internal Dependency)

  # Additional configurations can be added here (e.g., subnet_id, security_groups)

  # Comments:
  # - This resource creates an EC2 instance as per the specified configurations, supporting the compute requirements of the application.
  # - Addresses 'Scalability and Reliability' by provisioning individual compute resources.
  # - Technical Specification Reference:
  #   - 'SYSTEM ARCHITECTURE' -> '2.2 Data Layer' -> 'Compute' section
  #   - 'Technology Stack' -> '1. Programming Languages' -> 'Backend' (Node.js on EC2)
}

# Resource: aws_launch_configuration
# Description:
# - Defines the launch configuration for the auto-scaling group.
# Parameters:
# - Uses the same variables as 'aws_instance' (ami, instance_type, key_name)

# Internal Dependencies:
# - Variables defined in 'variables.tf' (ami, instance_type, key_name)

# Requirements Addressed:
# - Supports the setup of auto-scaling groups for scalability.
# - Location in Technical Specification: 'SYSTEM ARCHITECTURE' -> '6. Scalability and Redundancy'

resource "aws_launch_configuration" "compute_launch_config" {
  name_prefix     = "compute-launch-"
  image_id        = var.ami                # AMI ID
  instance_type   = var.instance_type      # Instance Type
  key_name        = var.key_name           # Key Pair Name

  # Additional configurations can be added here

  lifecycle {
    create_before_destroy = true  # Ensures zero downtime during updates
  }

  # Comments:
  # - This resource defines how instances in the auto-scaling group are launched.
  # - It is referenced by 'aws_autoscaling_group' to manage scaling operations.
  # - Supports 'Scalability and Reliability' by enabling dynamic scaling.
  # - Technical Specification Reference:
  #   - 'SYSTEM ARCHITECTURE' -> '6. Scalability and Redundancy'
}

# Resource: aws_autoscaling_group
# Description:
# - Manages an auto-scaling group to dynamically adjust the number of EC2 instances based on demand.
# Parameters:
# - launch_configuration (string): The launch configuration to use for the group.
# - min_size (number): The minimum number of instances in the group.
# - max_size (number): The maximum number of instances in the group.

# Steps:
# 1. Specify the launch configuration for the auto-scaling group.
# 2. Set the minimum and maximum number of instances in the group.

# Internal Dependencies:
# - Variables defined in 'variables.tf' (min_size, max_size)
# - 'aws_launch_configuration.compute_launch_config'

# Requirements Addressed:
# - 'Scalability and Reliability'
# - Ensures compute resources can scale and maintain high availability to meet application demands.
# - Location in Technical Specification: 'SYSTEM ARCHITECTURE' -> '6. Scalability and Redundancy'

resource "aws_autoscaling_group" "compute_asg" {
  name                   = "compute-asg"                # Auto Scaling Group name
  launch_configuration   = aws_launch_configuration.compute_launch_config.name
  min_size               = var.min_size                 # Minimum number of instances
  max_size               = var.max_size                 # Maximum number of instances

  # Note: 'vpc_zone_identifier' must be set to specify the subnets for the ASG
  # For example:
  # vpc_zone_identifier    = var.subnet_ids              # Variable 'subnet_ids' defined in 'variables.tf' (Internal Dependency)

  # Additional configurations such as availability zones and scaling policies can be added here.

  # Comments:
  # - This resource manages the scaling of compute instances based on demand.
  # - By adjusting 'min_size' and 'max_size', we ensure the compute capacity meets application requirements.
  # - Supports high availability and fault tolerance.
  # - Technical Specification Reference:
  #   - 'SYSTEM ARCHITECTURE' -> '6. Scalability and Redundancy'
}

# Note to Junior Developers:
# - Ensure that 'variables.tf' includes the necessary variables (ami, instance_type, key_name, min_size, max_size).
# - Refer to 'variables.tf' for variable definitions and default values.
# - Outputs from this module may be defined in 'outputs.tf' as per internal dependency.