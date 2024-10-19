# This Terraform variables configuration file defines the input variables for the database module,
# allowing customization of the PostgreSQL RDS instance settings such as instance type, storage,
# engine version, and security configurations.

# Requirements Addressed:
# - Database Management (SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL))
#   - Manages PostgreSQL databases with automated backups, scaling, and maintenance.

# Variable: db_instance_class
# Description: The instance type for the RDS database.
# This variable allows setting the compute and memory capacity of the PostgreSQL RDS instance.
# Addressing Requirement:
# - Database Management (SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL))
#   - Supports automated scaling by specifying the appropriate instance class.

variable "db_instance_class" {
  type        = string
  description = "The instance type for the RDS database."
}

# Variable: db_allocated_storage
# Description: The storage size for the RDS database in gigabytes.
# This variable sets the allocated storage capacity for the database, supporting scalability requirements.
# Addressing Requirement:
# - Database Management (SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL))
#   - Ensures efficient storage management with automated scaling.

variable "db_allocated_storage" {
  type        = number
  description = "The storage size for the RDS database in gigabytes."
}

# Variable: db_engine_version
# Description: The PostgreSQL engine version.
# Allows specifying the version of PostgreSQL to maintain compatibility and leverage specific features.
# Addressing Requirement:
# - Database Management (SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL))
#   - Facilitates automated maintenance by defining the engine version.

variable "db_engine_version" {
  type        = string
  description = "The PostgreSQL engine version."
}

# Variable: db_name
# Description: The name of the database to create.
# Defines the primary database name used by application services.
# Addressing Requirement:
# - Database Management (SYSTEM ARCHITECTURE/2.2 API Layer/Relational Database (PostgreSQL))
#   - Supports management of PostgreSQL databases.

variable "db_name" {
  type        = string
  description = "The name of the database to create."
}

# Variable: db_username
# Description: The username for the master DB user.
# Specifies the admin username for database access and management.
# Addressing Requirement:
# - User Authentication and Authorization (TECHNICAL SPECIFICATION/13.1 User Authentication and Authorization)
#   - Implements secure user access and permissions within the database.

variable "db_username" {
  type        = string
  description = "The username for the master DB user."
}

# Variable: db_password
# Description: The password for the master DB user.
# Stores the admin password for database authentication securely.
# Addressing Requirement:
# - Data Security (SECURITY CONSIDERATIONS/Data Security)
#   - Protects sensitive information through encryption and secure handling.

variable "db_password" {
  type        = string
  description = "The password for the master DB user."
  sensitive   = true
}

# Variable: db_subnet_group
# Description: The subnet group for the RDS instance.
# Determines the VPC subnets where the RDS instance will be deployed to ensure network security and isolation.
# Addressing Requirement:
# - Infrastructure (INFRASTRUCTURE/Cloud Services)
#   - Utilizes VPCs with subnets segmented into public and private zones for secure communication.

variable "db_subnet_group" {
  type        = string
  description = "The subnet group for the RDS instance."
}

# Variable: db_security_groups
# Description: The security groups associated with the RDS instance.
# Lists the security groups to control inbound and outbound traffic to the database.
# Addressing Requirement:
# - Security Protocols (SECURITY CONSIDERATIONS/Security Protocols)
#   - Implements network security measures, including firewalls and secure access controls.

variable "db_security_groups" {
  type        = list(string)
  description = "The security groups associated with the RDS instance."
}