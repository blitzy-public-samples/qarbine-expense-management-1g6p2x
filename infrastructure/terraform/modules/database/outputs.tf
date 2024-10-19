// outputs.tf - Defines outputs for the database module, providing essential information for the PostgreSQL RDS instance.

// Requirement Addressed:
// Name: Database Management
// Location: SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL)
// Description: Manages PostgreSQL databases with automated backups, scaling, and maintenance.

// Dependency:
// Internal Resource:
// - Name: aws_db_instance defined in infrastructure/terraform/modules/database/main.tf
//   Purpose: Provides the RDS instance details required for output values.

// Output: db_instance_endpoint
// Description: Outputs the endpoint of the PostgreSQL database instance.
// This endpoint is used by application services to connect to the database.

output "db_instance_endpoint" {
  description = "The endpoint of the PostgreSQL database instance."
  value       = aws_db_instance.db.endpoint
}

// Output: db_instance_identifier
// Description: Outputs the identifier of the PostgreSQL database instance.
// This helps in uniquely identifying the database instance for management and monitoring purposes.

output "db_instance_identifier" {
  description = "The identifier of the PostgreSQL database instance."
  value       = aws_db_instance.db.id
}

// Output: db_instance_arn
// Description: Outputs the Amazon Resource Name (ARN) of the PostgreSQL database instance.
// The ARN is required for specifying resource permissions in IAM policies.

output "db_instance_arn" {
  description = "The Amazon Resource Name (ARN) of the PostgreSQL database instance."
  value       = aws_db_instance.db.arn
}