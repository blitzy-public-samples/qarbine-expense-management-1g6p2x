// variables.tf
// This Terraform variables file defines the input variables for the compute module, which are used to configure and manage compute resources such as EC2 instances and auto-scaling groups within the AWS cloud environment.

// This file addresses the requirement of Scalability and Reliability as specified in SYSTEM ARCHITECTURE/Scalability and Redundancy.
// It ensures that compute resources can scale and maintain high availability to meet application demands.

// Variable: ami_id
// Description: The ID of the Amazon Machine Image (AMI) to use for the EC2 instances.
// This variable allows for specifying the AMI, which determines the operating system and software configuration of the instances.
// By customizing the AMI, we can ensure that all EC2 instances have the required environment for the application.
// Requirement Addressed: Scalability and Reliability (SYSTEM ARCHITECTURE/Scalability and Redundancy)
// Related Documentation: Technical Specification - "3. Technology Stack" and "4. Deployment Architecture"

variable "ami_id" {
  description = "The ID of the Amazon Machine Image (AMI) to use for the EC2 instances."
  type        = string
  default     = "ami-0abcdef1234567890"
}

// Variable: instance_type
// Description: The type of instance to use for the EC2 instances.
// Different instance types offer various combinations of CPU, memory, storage, and networking capacity.
// Selecting the appropriate instance type is crucial for application performance and cost optimization.
// Requirement Addressed: Scalability and Reliability (SYSTEM ARCHITECTURE/Scalability and Redundancy)
// Related Documentation: Technical Specification - "3. Technology Stack" and "6. Scalability and Redundancy"

variable "instance_type" {
  description = "The type of instance to use for the EC2 instances."
  type        = string
  default     = "t2.micro"
}

// Variable: key_name
// Description: The name of the key pair to use for SSH access to the EC2 instances.
// This variable specifies the SSH key pair, allowing secure access to the instances for management and debugging.
// Ensuring secure access aligns with the security considerations of the system.
// Requirement Addressed: Security and Compliance (SECURITY CONSIDERATIONS/Authentication and Authorization)
// Related Documentation: Technical Specification - "Security Layer"

variable "key_name" {
  description = "The name of the key pair to use for SSH access to the EC2 instances."
  type        = string
  default     = "default-key-pair"
}

// Variable: min_size
// Description: The minimum number of instances in the auto-scaling group.
// This sets the baseline capacity to handle the application's load under normal conditions.
// Maintaining a minimum number of instances ensures high availability.
// Requirement Addressed: Scalability and Reliability (SYSTEM ARCHITECTURE/Scalability and Redundancy)
// Related Documentation: Technical Specification - "6. Scalability and Redundancy"

variable "min_size" {
  description = "The minimum number of instances in the auto-scaling group."
  type        = number
  default     = 1
}

// Variable: max_size
// Description: The maximum number of instances in the auto-scaling group.
// This sets the upper limit for scaling out resources to handle peak loads.
// It helps in controlling costs while ensuring the application can scale during high demand.
// Requirement Addressed: Scalability and Reliability (SYSTEM ARCHITECTURE/Scalability and Redundancy)
// Related Documentation: Technical Specification - "6. Scalability and Redundancy"

variable "max_size" {
  description = "The maximum number of instances in the auto-scaling group."
  type        = number
  default     = 3
}

// Variable: region
// Description: The AWS region where the compute resources will be deployed.
// Deploying resources in the appropriate region reduces latency and improves performance for users.
// It also allows compliance with data residency requirements.
// Requirement Addressed: Scalability and Reliability (SYSTEM ARCHITECTURE/Scalability and Redundancy)
// Related Documentation: Technical Specification - "4. Deployment Architecture" and "7. Security Considerations"

variable "region" {
  description = "The AWS region where the compute resources will be deployed."
  type        = string
  default     = "us-west-2"
}