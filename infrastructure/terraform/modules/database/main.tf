// Terraform configuration for managing PostgreSQL RDS instance in AWS.
//
// Requirements Addressed:
// - Database Management (SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL))
//   - Manages PostgreSQL databases with automated backups, scaling, and maintenance.
//
// External Dependency: aws_db_instance resource from hashicorp/aws provider version >= 3.0

// Define a custom parameter group for the PostgreSQL instance.
//
// This resource allows for customization of database parameters to optimize performance
// and meet specific application requirements.
//
// Location in Documentation:
// - SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL)
//
resource "aws_db_parameter_group" "db_parameter_group" {
  name        = "${var.db_name}-pg"
  family      = "postgres${var.db_engine_version}"
  description = "Custom parameter group for ${var.db_name}."

  // Define database parameters here.
  // Example:
  // parameter {
  //   name  = "max_connections"
  //   value = "500"
  // }

  tags = {
    Name = "${var.db_name}-parameter-group"
  }
}

// Define the PostgreSQL RDS instance.
//
// This resource creates a managed PostgreSQL database instance with specified configurations
// to ensure scalability, reliability, and security.
//
// Location in Documentation:
// - SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL)
//
resource "aws_db_instance" "db" {

  // Specify the instance class for the RDS instance.
  // Controls the compute and memory capacity of the database.
  instance_class            = var.db_instance_class   // e.g., "db.t3.medium"

  // Set the allocated storage size for the RDS instance (in GB).
  allocated_storage         = var.db_allocated_storage  // e.g., 20

  // Define the database engine and version.
  engine                    = "postgres"
  engine_version            = var.db_engine_version   // e.g., "12.4"

  // Create the database with the specified name.
  name                      = var.db_name             // e.g., "mydatabase"

  // Set the master username and password for the database.
  username                  = var.db_username
  password                  = var.db_password

  // Assign the RDS instance to a subnet group.
  // Ensures the database is accessible within the VPC subnets.
  db_subnet_group_name      = var.db_subnet_group     // e.g., "my-subnet-group"

  // Associate the RDS instance with security groups.
  // Controls inbound and outbound traffic to the database instance.
  vpc_security_group_ids    = var.db_security_groups  // list of security group IDs

  // Assign the custom parameter group to the RDS instance.
  parameter_group_name      = aws_db_parameter_group.db_parameter_group.name

  // Enable automated backups and set backup retention period.
  // Supports automated backups for disaster recovery.
  backup_retention_period   = 7     // Retain backups for 7 days

  // Specify the daily backup window.
  backup_window             = "03:00-04:00"  // UTC time

  // Enable multi-AZ deployment for high availability.
  // Provides failover support in case of primary instance failure.
  multi_az                  = true

  // Enable monitoring of the RDS instance.
  monitoring_interval       = 60  // Collect metrics every 60 seconds

  // Specify the maintenance window for database updates.
  maintenance_window        = "Mon:04:00-Mon:05:00"  // UTC time

  // Prevent accidental deletion of the RDS instance.
  deletion_protection       = true

  // Enable encryption at rest for data security.
  storage_encrypted         = true

  // Tagging for resource management and identification.
  tags = {
    Name = "DatabaseInstance"
  }
}