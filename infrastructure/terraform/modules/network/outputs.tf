// Outputs for the network module
// This file defines the outputs for the network module, providing essential identifiers for the VPC and subnets.
// These outputs are crucial for other modules to integrate with the network infrastructure.

// Requirement Addressed:
// - Name: Network Outputs
// - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
// - Description: Provides outputs for network components like VPC ID and subnet IDs, enabling other modules to reference these resources.

// Output: vpc_id
// This output exposes the ID of the VPC created by the network module.
// Other modules can use this VPC ID to deploy resources within the same VPC, ensuring network consistency and facilitating inter-service communication.

output "vpc_id" {
  description = "The ID of the VPC created by the network module."
  value       = aws_vpc.main.id
}

// Output: public_subnet_ids
// This output provides the IDs of the public subnets created within the VPC.
// Modules that need to deploy resources accessible from the internet, such as load balancers or NAT gateways, can use these subnet IDs.
// This aligns with the network architecture specifications requiring public-facing services to be placed in public subnets.

output "public_subnet_ids" {
  description = "The IDs of the public subnets created within the VPC."
  value       = [for subnet in aws_subnet.public : subnet.id]
}

// Output: private_subnet_ids
// This output provides the IDs of the private subnets created within the VPC.
// Modules deploying internal services, databases, or other resources that should not be publicly accessible can use these subnet IDs.
// This supports the network security requirements by segregating resources into private subnets.

output "private_subnet_ids" {
  description = "The IDs of the private subnets created within the VPC."
  value       = [for subnet in aws_subnet.private : subnet.id]
}