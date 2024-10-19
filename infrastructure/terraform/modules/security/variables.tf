// variables.tf - Defines input variables for configuring security components such as security groups and IAM roles within the security module.
// This file allows for flexible and reusable configurations across different environments, ensuring compliance and security best practices.

// Requirements Addressed:
// - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer):
//   Defines input variables to ensure configurable and compliant security settings for infrastructure components.

// Variable: aws_region
// Description:
//   Specifies the AWS region where the security resources will be deployed.
//   Configuring the AWS region is crucial for compliance with data residency laws and optimizing resource latency.
// Requirement Addressed:
//   - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer)

variable "aws_region" {
  description = "The AWS region where resources will be created."
  type        = string
  default     = "us-east-1"
}

// Variable: security_group_name
// Description:
//   The name of the security group to be created.
//   Customizing the security group name ensures adherence to organizational naming conventions and policies.
// Requirement Addressed:
//   - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer)

variable "security_group_name" {
  description = "The name of the security group to be created."
  type        = string
  default     = "default-security-group"
}

// Variable: ingress_rules
// Description:
//   A list of ingress rules for the security group.
//   Defines inbound traffic rules to control and secure incoming network traffic, enhancing security posture.
// Requirement Addressed:
//   - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer)

variable "ingress_rules" {
  description = "A list of ingress rules for the security group."
  type = list(object({
    from_port   = number                       // Starting port for the rule
    to_port     = number                       // Ending port for the rule
    protocol    = string                       // Protocol (e.g., tcp, udp, icmp)
    cidr_blocks = list(string)                 // List of allowed CIDR blocks
  }))
  default = []
}

// Variable: egress_rules
// Description:
//   A list of egress rules for the security group.
//   Defines outbound traffic rules to manage and secure outgoing network traffic.
// Requirement Addressed:
//   - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer)

variable "egress_rules" {
  description = "A list of egress rules for the security group."
  type = list(object({
    from_port   = number                       // Starting port for the rule
    to_port     = number                       // Ending port for the rule
    protocol    = string                       // Protocol (e.g., tcp, udp, icmp)
    cidr_blocks = list(string)                 // List of allowed CIDR blocks
  }))
  default = []
}

// Variable: iam_role_name
// Description:
//   The name of the IAM role to be created.
//   Allows for identification and management of roles in alignment with company policies.
// Requirement Addressed:
//   - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer)

variable "iam_role_name" {
  description = "The name of the IAM role to be created."
  type        = string
  default     = "default-iam-role"
}

// Variable: assume_role_policy
// Description:
//   The policy that grants an entity permission to assume the role.
//   Defines the trust relationship for the IAM role, specifying who can assume it.
// Requirement Addressed:
//   - Security and Compliance (SYSTEM ARCHITECTURE/Security Layer)

variable "assume_role_policy" {
  description = "The policy that grants an entity permission to assume the role."
  type        = string
  default     = ""
}