# Terraform configuration for security components
# This file defines the security infrastructure components for the Global Employee Travel Expense Tracking App.
# It sets up security groups, IAM roles, and other security-related resources to ensure secure access and compliance with organizational policies.

# Requirements Addressed:
# - Implements security measures such as security groups and IAM roles to protect resources and ensure compliance with security policies.
#   Reference: SYSTEM ARCHITECTURE/Security Layer in the Technical Specification.

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0.0"  # AWS provider version as per external dependency.
    }
  }
}

# Configure the AWS provider
provider "aws" {
  # AWS provider configuration
  # AWS credentials and region are assumed to be configured externally or via environment variables.
  # Reference: 'globals' section in the JSON specification.
}

# Resource: AWS Security Group
# Description: Defines a security group for controlling inbound and outbound traffic.
# Parameters:
# - name (string): The name of the security group.
# - ingress (list of ingress rules): Rules for allowed inbound traffic.
# - egress (list of egress rules): Rules for allowed outbound traffic.
# - tags (map): Tags for resource identification and management.
# Steps:
# 1. Specify the security group name.
# 2. Define ingress rules for allowed inbound traffic.
# 3. Define egress rules for allowed outbound traffic.
# 4. Apply tags for resource identification and management.

resource "aws_security_group" "main" {
  name        = var.security_group_name  # Variable defined in variables.tf
  description = "Security group for controlling inbound and outbound traffic."

  # Ingress rules for allowed inbound traffic
  dynamic "ingress" {
    for_each = var.ingress_rules  # List of ingress rules defined in variables.tf
    content {
      description = ingress.value.description
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }

  # Egress rules for allowed outbound traffic
  dynamic "egress" {
    for_each = var.egress_rules  # List of egress rules defined in variables.tf
    content {
      description = egress.value.description
      from_port   = egress.value.from_port
      to_port     = egress.value.to_port
      protocol    = egress.value.protocol
      cidr_blocks = egress.value.cidr_blocks
    }
  }

  # Tags for resource identification and management
  tags = var.common_tags  # Common tags defined in variables.tf

  # Additional Notes:
  # This resource addresses security and compliance requirements by defining network access controls.
  # Reference: SYSTEM ARCHITECTURE/Security Layer in the Technical Specification.
}

# Resource: AWS IAM Role
# Description: Defines an IAM role for granting permissions to AWS resources.
# Parameters:
# - name (string): The name of the IAM role.
# - assume_role_policy (string): The policy that grants an entity permission to assume the role.
# - tags (map): Tags for resource identification and management.
# Steps:
# 1. Specify the IAM role name.
# 2. Define the assume role policy document.
# 3. Apply tags for resource identification and management.

resource "aws_iam_role" "main" {
  name               = var.iam_role_name        # Variable defined in variables.tf
  assume_role_policy = var.assume_role_policy   # IAM policy JSON defined in variables.tf

  # Tags for resource identification and management
  tags = var.common_tags  # Common tags defined in variables.tf

  # Additional Notes:
  # This resource addresses security and compliance requirements by defining IAM roles for resource access control.
  # Reference: SYSTEM ARCHITECTURE/Security Layer in the Technical Specification.
}