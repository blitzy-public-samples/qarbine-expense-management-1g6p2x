# outputs.tf - Defines and exposes outputs from the compute module for integration and reference.

# This file is responsible for defining the outputs of the compute module, such as the IDs of the EC2 instances
# and the name of the Auto Scaling Group. These outputs are essential for other modules to reference and integrate
# with the compute resources, facilitating scalability and reliability in the system architecture.

# Requirements Addressed:
# - **Scalability and Reliability** (Location: SYSTEM ARCHITECTURE/Scalability and Redundancy)
#   - Description: Ensures that the outputs related to compute resources are accessible for integration and monitoring purposes.

# Dependencies:
# - **Internal Dependency**:
#   - Resource: `aws_instance.example` from `infrastructure/terraform/modules/compute/main.tf`
#     - Purpose: To retrieve and expose the IDs of the EC2 instances created.
#   - Resource: `aws_autoscaling_group.example` from `infrastructure/terraform/modules/compute/main.tf`
#     - Purpose: To retrieve and expose the name of the Auto Scaling Group managing the EC2 instances.

# Output: instance_ids
# Description: The IDs of the EC2 instances created by the compute module.
output "instance_ids" {
  description = "The IDs of the EC2 instances created by the compute module."
  value       = aws_instance.example[*].id
}

# Output: autoscaling_group_name
# Description: The name of the Auto Scaling Group managing the EC2 instances.
output "autoscaling_group_name" {
  description = "The name of the Auto Scaling Group managing the EC2 instances."
  value       = aws_autoscaling_group.example.name
}