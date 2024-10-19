# Provider Configuration
# Using AWS provider version >= 3.0
# External Dependencies:
# - aws_vpc (hashicorp/aws >= 3.0): Manages the creation and configuration of VPCs.
# - aws_subnet (hashicorp/aws >= 3.0): Manages the creation and configuration of subnets within a VPC.
# - aws_internet_gateway (hashicorp/aws >= 3.0): Manages the creation and attachment of internet gateways to VPCs.
# - aws_route_table (hashicorp/aws >= 3.0): Manages route tables and their associations with subnets.
provider "aws" {
  version = ">= 3.0"
}

# Resource: AWS Virtual Private Cloud (VPC)
# Description:
# Defines a Virtual Private Cloud (VPC) with specific configurations for CIDR block, DNS support, and DNS hostnames.
# Requirements Addressed: Network Architecture
# Location in Documentation: INFRASTRUCTURE/Deployment Environment/Network Architecture
resource "aws_vpc" "main" {
  # Specify the CIDR block for the VPC.
  cidr_block = var.vpc_cidr

  # Enable or disable DNS support in the VPC.
  enable_dns_support = var.enable_dns_support

  # Enable or disable DNS hostnames in the VPC.
  enable_dns_hostnames = var.enable_dns_hostnames

  tags = {
    Name = "${var.environment}-vpc"
  }
}

# Resource: AWS Internet Gateway
# Description:
# Defines an internet gateway and attaches it to the VPC to enable internet access.
# Requirements Addressed: Network Architecture
# Location in Documentation: INFRASTRUCTURE/Deployment Environment/Network Architecture
resource "aws_internet_gateway" "igw" {
  # Attach the internet gateway to the specified VPC.
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.environment}-igw"
  }
}

# Resource: AWS Public Subnets
# Description:
# Defines subnets within the VPC with specific configurations for CIDR block and availability zone.
# Requirements Addressed: Network Architecture
# Location in Documentation: INFRASTRUCTURE/Deployment Environment/Network Architecture
resource "aws_subnet" "public" {
  count = length(var.public_subnet_cidrs)

  # Specify the CIDR block for the subnet.
  cidr_block = var.public_subnet_cidrs[count.index]

  # Assign the subnet to an availability zone.
  availability_zone = var.availability_zones[count.index]

  vpc_id = aws_vpc.main.id

  # Enable public IP assignment on subnet.
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.environment}-public-subnet-${count.index + 1}"
  }
}

# Resource: AWS Private Subnets
# Description:
# Defines subnets within the VPC with specific configurations for CIDR block and availability zone.
# Requirements Addressed: Network Architecture
# Location in Documentation: INFRASTRUCTURE/Deployment Environment/Network Architecture
resource "aws_subnet" "private" {
  count = length(var.private_subnet_cidrs)

  # Specify the CIDR block for the subnet.
  cidr_block = var.private_subnet_cidrs[count.index]

  # Assign the subnet to an availability zone.
  availability_zone = var.availability_zones[count.index]

  vpc_id = aws_vpc.main.id

  # Disable public IP assignment on subnet.
  map_public_ip_on_launch = false

  tags = {
    Name = "${var.environment}-private-subnet-${count.index + 1}"
  }
}

# Resource: AWS Route Table for Public Subnets
# Description:
# Defines a route table with specific routes and associates it with subnets.
# Requirements Addressed: Network Architecture
# Location in Documentation: INFRASTRUCTURE/Deployment Environment/Network Architecture
resource "aws_route_table" "public" {
  # Create a route table for the specified VPC.
  vpc_id = aws_vpc.main.id

  # Define routes for the route table.
  route {
    # Route all traffic to the internet gateway.
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.environment}-public-rt"
  }
}

# Resource: AWS Route Table Association for Public Subnets
# Description:
# Associates the public route table with each public subnet.
# Requirements Addressed: Network Architecture
# Location in Documentation: INFRASTRUCTURE/Deployment Environment/Network Architecture
resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  # Associate the route table with subnets.
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Note: Private route tables and their associations can be defined similarly if required.