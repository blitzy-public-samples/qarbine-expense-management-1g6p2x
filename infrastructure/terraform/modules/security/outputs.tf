# Outputs for the Security Module
#
# This outputs file defines the outputs for the security module, capturing essential information
# about the security infrastructure components such as security group IDs and IAM role ARNs.
# These outputs are crucial for ensuring that other modules and resources can integrate seamlessly
# with the security configurations, adhering to the security protocols defined for the system.
#
# Requirements Addressed:
# - **Security and Compliance**
#   - **Location:** SYSTEM ARCHITECTURE > Security Layer
#   - **Description:** Captures outputs of security configurations to ensure traceability and integration with other infrastructure components.
#
# Dependencies:
# - **Internal Modules:**
#   - **main.tf** (infrastructure/terraform/modules/security/main.tf)
#     - Defines security infrastructure components whose outputs are captured here.
#   - **variables.tf** (infrastructure/terraform/modules/security/variables.tf)
#     - Provides input variables for security configurations, influencing the outputs.

# Output: security_group_id
#
# Provides the ID of the security group created for controlling inbound and outbound traffic.
# This output is essential for other modules and resources that need to associate with this security group
# to enforce network security rules as defined in our security policies.
#
# Requirements Addressed:
# - **Requirement ID:** TR-F001.3 (User Authentication and Authorization)
# - **Documentation Location:** SYSTEM ARCHITECTURE > Security Layer > Data Protection
#   - **Description:** Ensures secure communication between services by enforcing security group rules.
#
# By exposing the security_group_id, we enable secure network configurations and compliance with
# the security measures outlined in our system design.

output "security_group_id" {
  description = "The ID of the security group created for controlling inbound and outbound traffic."
  value       = aws_security_group.main.id
}

# Output: iam_role_arn
#
# Provides the Amazon Resource Name (ARN) of the IAM role created for granting permissions to AWS resources.
# This output allows other modules and services to assume this role as needed, ensuring proper access control
# and adherence to the principle of least privilege.
#
# Requirements Addressed:
# - **Requirement ID:** SEC-F001.3 (Security Considerations - Authentication and Authorization)
# - **Documentation Location:** SECURITY CONSIDERATIONS > Authentication and Authorization
#   - **Description:** Enforce Role-Based Access Control (RBAC) to restrict access based on user roles.
#
# By outputting the iam_role_arn, we facilitate integration with AWS services that require role assumption,
# maintaining secure access control as per our security protocols.

output "iam_role_arn" {
  description = "The ARN of the IAM role created for granting permissions to AWS resources."
  value       = aws_iam_role.main.arn
}