// outputs.tf
// This file aggregates and defines the outputs for the entire infrastructure setup,
// providing essential information such as resource identifiers, endpoints, and ARNs
// for integration and management purposes.
//
// Requirements Addressed:
// - 'Infrastructure Outputs'
//   Location: SYSTEM ARCHITECTURE/Deployment Architecture
//   Description: Aggregates outputs from various infrastructure modules, providing essential information for integration and management.

// -------------------------------------------------------------------
// Output: ci_cd_pipeline_id
// Description: The ID of the created AWS CodePipeline.
// Purpose:
// This output exposes the unique identifier of the AWS CodePipeline created by the CI/CD module.
// It is essential for integrating the pipeline with other services and for management purposes.
//
// Requirements Addressed:
// - Captures outputs related to CI/CD infrastructure.
//   Module: infrastructure/terraform/modules/ci-cd/outputs.tf
//   Purpose: Captures outputs related to CI/CD infrastructure.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "ci_cd_pipeline_id" {
  description = "The ID of the created AWS CodePipeline."
  value       = "${module.ci-cd.pipeline_id}"
}

// -------------------------------------------------------------------
// Output: ci_cd_build_project_name
// Description: The name of the AWS CodeBuild project.
// Purpose:
// This output provides the name of the AWS CodeBuild project set up by the CI/CD module.
// It is used for referencing the build project in deployment processes and monitoring.
//
// Requirements Addressed:
// - Captures outputs related to CI/CD infrastructure.
//   Module: infrastructure/terraform/modules/ci-cd/outputs.tf
//   Purpose: Captures outputs related to CI/CD infrastructure.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "ci_cd_build_project_name" {
  description = "The name of the AWS CodeBuild project."
  value       = "${module.ci-cd.build_project_name}"
}

// -------------------------------------------------------------------
// Output: compute_instance_ids
// Description: The IDs of the EC2 instances created by the compute module.
// Purpose:
// This output lists the IDs of EC2 instances provisioned by the compute module.
// It is crucial for operations that need to reference the instances directly, such as monitoring and management tasks.
//
// Requirements Addressed:
// - Captures outputs related to compute resources.
//   Module: infrastructure/terraform/modules/compute/outputs.tf
//   Purpose: Captures outputs related to compute resources.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "compute_instance_ids" {
  description = "The IDs of the EC2 instances created by the compute module."
  value       = "${module.compute.instance_ids}"
}

// -------------------------------------------------------------------
// Output: compute_autoscaling_group_name
// Description: The name of the auto-scaling group managing the EC2 instances.
// Purpose:
// This output provides the name of the Auto Scaling Group (ASG) that manages the EC2 instances.
// It is used for scaling policies, monitoring, and managing the compute resources.
//
// Requirements Addressed:
// - Captures outputs related to compute resources.
//   Module: infrastructure/terraform/modules/compute/outputs.tf
//   Purpose: Captures outputs related to compute resources.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "compute_autoscaling_group_name" {
  description = "The name of the auto-scaling group managing the EC2 instances."
  value       = "${module.compute.autoscaling_group_name}"
}

// -------------------------------------------------------------------
// Output: db_instance_endpoint
// Description: The endpoint of the PostgreSQL database instance.
// Purpose:
// This output provides the endpoint (hostname and port) of the PostgreSQL database.
// It is necessary for application services to connect to the database instance.
//
// Requirements Addressed:
// - Captures outputs related to database resources.
//   Module: infrastructure/terraform/modules/database/outputs.tf
//   Purpose: Captures outputs related to database resources.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "db_instance_endpoint" {
  description = "The endpoint of the PostgreSQL database instance."
  value       = "${module.database.db_instance_endpoint}"
}

// -------------------------------------------------------------------
// Output: db_instance_identifier
// Description: The identifier of the PostgreSQL database instance.
// Purpose:
// This output provides the unique identifier of the PostgreSQL database instance.
// It is useful for database management tasks, monitoring, and administrative operations.
//
// Requirements Addressed:
// - Captures outputs related to database resources.
//   Module: infrastructure/terraform/modules/database/outputs.tf
//   Purpose: Captures outputs related to database resources.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "db_instance_identifier" {
  description = "The identifier of the PostgreSQL database instance."
  value       = "${module.database.db_instance_identifier}"
}

// -------------------------------------------------------------------
// Output: network_vpc_id
// Description: The ID of the VPC created by the network module.
// Purpose:
// This output provides the ID of the Virtual Private Cloud (VPC) in which the infrastructure is deployed.
// It is essential for configuring network-related resources and integrations.
//
// Requirements Addressed:
// - Captures outputs related to network infrastructure.
//   Module: infrastructure/terraform/modules/network/outputs.tf
//   Purpose: Captures outputs related to network infrastructure.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "network_vpc_id" {
  description = "The ID of the VPC created by the network module."
  value       = "${module.network.vpc_id}"
}

// -------------------------------------------------------------------
// Output: network_public_subnet_ids
// Description: The IDs of the public subnets created within the VPC.
// Purpose:
// This output lists the IDs of the public subnets within the VPC, used for deploying public-facing resources.
// It is necessary for allocating resources that require public internet access.
//
// Requirements Addressed:
// - Captures outputs related to network infrastructure.
//   Module: infrastructure/terraform/modules/network/outputs.tf
//   Purpose: Captures outputs related to network infrastructure.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "network_public_subnet_ids" {
  description = "The IDs of the public subnets created within the VPC."
  value       = "${module.network.public_subnet_ids}"
}

// -------------------------------------------------------------------
// Output: security_group_id
// Description: The ID of the security group created for controlling inbound and outbound traffic.
// Purpose:
// This output provides the ID of the security group that controls network traffic to resources.
// It is critical for applying consistent security policies across resources.
//
// Requirements Addressed:
// - Captures outputs related to security configurations.
//   Module: infrastructure/terraform/modules/security/outputs.tf
//   Purpose: Captures outputs related to security configurations.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "security_group_id" {
  description = "The ID of the security group created for controlling inbound and outbound traffic."
  value       = "${module.security.security_group_id}"
}

// -------------------------------------------------------------------
// Output: storage_bucket_name
// Description: Outputs the name of the S3 bucket.
// Purpose:
// This output provides the name of the AWS S3 bucket created by the storage module.
// It is used by applications and services that need to store or retrieve objects from the bucket.
//
// Requirements Addressed:
// - Captures outputs related to storage resources.
//   Module: infrastructure/terraform/modules/storage/outputs.tf
//   Purpose: Captures outputs related to storage resources.
// - Aggregates outputs for integration and management purposes.
//   Requirement: 'Infrastructure Outputs' in SYSTEM ARCHITECTURE/Deployment Architecture
output "storage_bucket_name" {
  description = "Outputs the name of the S3 bucket."
  value       = "${module.storage.bucket_name}"
}