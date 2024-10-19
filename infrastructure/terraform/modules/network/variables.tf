###########################################################
# Variable: vpc_cidr
#
# Description:
# The CIDR block for the Virtual Private Cloud (VPC).
#
# Requirement Addressed:
# - Name: Network Configuration Variables
# - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
# - Description: Defines input variables for configuring network components like VPC CIDR, subnet CIDRs, and DNS settings.
#
# This variable allows customization of the VPC CIDR block, enabling the definition of IP address ranges for the AWS VPC.
###########################################################
variable "vpc_cidr" {
  description = "The CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

###########################################################
# Variable: public_subnet_cidrs
#
# Description:
# The CIDR blocks for the public subnets within the VPC.
#
# Requirement Addressed:
# - Name: Network Configuration Variables
# - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
# - Description: Defines input variables for configuring network components like VPC CIDR, subnet CIDRs, and DNS settings.
#
# This variable specifies the CIDR blocks for each public subnet, allowing configuration of public IP ranges within the VPC.
###########################################################
variable "public_subnet_cidrs" {
  description = "The CIDR blocks for the public subnets."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

###########################################################
# Variable: private_subnet_cidrs
#
# Description:
# The CIDR blocks for the private subnets within the VPC.
#
# Requirement Addressed:
# - Name: Network Configuration Variables
# - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
# - Description: Defines input variables for configuring network components like VPC CIDR, subnet CIDRs, and DNS settings.
#
# This variable specifies the CIDR blocks for each private subnet, allowing configuration of private IP ranges within the VPC.
###########################################################
variable "private_subnet_cidrs" {
  description = "The CIDR blocks for the private subnets."
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

###########################################################
# Variable: availability_zones
#
# Description:
# The availability zones for subnet creation.
#
# Requirement Addressed:
# - Name: Network Configuration Variables
# - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
# - Description: Defines input variables for configuring network components like VPC CIDR, subnet CIDRs, and DNS settings.
#
# This variable specifies the AWS availability zones in which the subnets will be created, enhancing redundancy and fault tolerance.
###########################################################
variable "availability_zones" {
  description = "The availability zones for subnet creation."
  type        = list(string)
  default     = ["us-west-1a", "us-west-1b"]
}

###########################################################
# Variable: enable_dns_support
#
# Description:
# Enable DNS support in the VPC.
#
# Requirement Addressed:
# - Name: Network Configuration Variables
# - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
# - Description: Defines input variables for configuring network components like VPC CIDR, subnet CIDRs, and DNS settings.
#
# This variable enables or disables DNS resolution support for the VPC, which is essential for name resolution within the VPC.
###########################################################
variable "enable_dns_support" {
  description = "Enable DNS support in the VPC."
  type        = bool
  default     = true
}

###########################################################
# Variable: enable_dns_hostnames
#
# Description:
# Enable DNS hostnames in the VPC.
#
# Requirement Addressed:
# - Name: Network Configuration Variables
# - Location: INFRASTRUCTURE/Deployment Environment/Network Architecture
# - Description: Defines input variables for configuring network components like VPC CIDR, subnet CIDRs, and DNS settings.
#
# This variable enables or disables DNS hostnames for instances within the VPC, allowing instances to have DNS hostnames that can be resolved within the VPC.
###########################################################
variable "enable_dns_hostnames" {
  description = "Enable DNS hostnames in the VPC."
  type        = bool
  default     = true
}