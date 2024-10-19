# Terraform Infrastructure Setup

This documentation provides detailed instructions and information about the Terraform infrastructure setup for the Global Employee Travel Expense Tracking App. It covers the configuration, deployment, and management of infrastructure components using Terraform, including CI/CD, compute, database, network, security, and storage modules.

*(This documentation addresses the requirement "**Infrastructure Documentation**" as specified in "**SYSTEM ARCHITECTURE/Deployment Architecture**", providing comprehensive guidance for setting up and managing the infrastructure with Terraform.)*

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Directory Structure](#directory-structure)
- [Infrastructure Modules](#infrastructure-modules)
  - [CI/CD Module](#cicd-module)
  - [Compute Module](#compute-module)
  - [Database Module](#database-module)
  - [Network Module](#network-module)
  - [Security Module](#security-module)
  - [Storage Module](#storage-module)
- [Environment Configurations](#environment-configurations)
- [Deployment Process](#deployment-process)
  - [Initialization](#initialization)
  - [Validation](#validation)
  - [Planning](#planning)
  - [Applying](#applying)
  - [Automation](#automation)
- [State Management](#state-management)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Solutions](#solutions)
- [Contact](#contact)

## Introduction

This section introduces the Terraform setup for the Global Employee Travel Expense Tracking App, outlining the purpose and scope of the infrastructure components.

The infrastructure is managed using [Terraform](https://www.terraform.io/) (*version 1.0.0*). The configuration orchestrates cloud resources on AWS using the [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest) (*version >= 3.0.0*).

*(Refer to "**SYSTEM ARCHITECTURE**" for more context on the infrastructure components.)*

## Getting Started

Instructions on how to set up the Terraform environment, including prerequisites, installation steps, and initial configuration.

### Prerequisites

- Install **Terraform v1.0.0**
- Configure AWS CLI with appropriate credentials
- Ensure access to the AWS account with permissions to create resources

### Directory Structure

The Terraform configuration is organized as follows:

```
infrastructure/
├── terraform/
    ├── backend.tf
    ├── main.tf
    ├── outputs.tf
    ├── providers.tf
    ├── variables.tf
    ├── environments/
    │   ├── development/
    │   │   └── terraform.tfvars
    │   ├── staging/
    │   │   └── terraform.tfvars
    │   └── production/
    │       └── terraform.tfvars
    ├── modules/
    │   ├── ci-cd/
    │   ├── compute/
    │   ├── database/
    │   ├── network/
    │   ├── security/
    │   └── storage/
    └── scripts/
        ├── deploy_scripts.sh
        └── init_scripts.sh
```

*(Global variable `TERRAFORM_DIR` is set to `/path/to/terraform/configuration`.)*

## Infrastructure Modules

Detailed descriptions of each infrastructure module, including CI/CD, compute, database, network, security, and storage, along with their configurations and dependencies.

*(Refer to "**SYSTEM COMPONENTS**" in the technical specification for detailed descriptions of each module.)*

### CI/CD Module

- **Path:** `modules/ci-cd/`
- **Purpose:** Sets up CI/CD infrastructure using AWS services.
- **Key Files:**
  - `main.tf` – Defines resources for CodePipeline, CodeBuild, and CodeDeploy.
  - `variables.tf` – Input variables for customization.
  - `outputs.tf` – Outputs exported by the module.
- **Dependencies:**
  - Internal: Integrates with `providers.tf` for AWS configurations.
  - External: Depends on AWS services via `hashicorp/aws` provider (*version >= 3.0.0*).

### Compute Module

- **Path:** `modules/compute/`
- **Purpose:** Manages compute resources such as EC2 instances and Auto Scaling Groups.
- **Key Files:**
  - `main.tf` – Defines EC2 instances and related configurations.
  - `variables.tf` – Input variables for instance types and counts.
  - `outputs.tf` – Outputs such as instance IDs and IP addresses.
- **Dependencies:**
  - Internal: Relies on `network` and `security` modules for networking and security groups.
  - External: AWS EC2 service.

### Database Module

- **Path:** `modules/database/`
- **Purpose:** Manages PostgreSQL RDS instances and related configurations.
- **Key Files:**
  - `main.tf` – Defines RDS instances and parameter groups.
  - `variables.tf` – Input variables for database configurations.
  - `outputs.tf` – Outputs including endpoint addresses.
- **Dependencies:**
  - Internal: Depends on `network` and `security` modules.
  - External: AWS RDS service.

### Network Module

- **Path:** `modules/network/`
- **Purpose:** Defines network infrastructure components like VPCs and subnets.
- **Key Files:**
  - `main.tf` – Sets up VPCs, subnets, internet gateways.
  - `variables.tf` – Variables for CIDR blocks and subnets.
  - `outputs.tf` – Outputs VPC IDs and subnet IDs.
- **Dependencies:**
  - External: AWS networking services.

### Security Module

- **Path:** `modules/security/`
- **Purpose:** Implements security measures such as Security Groups and IAM roles.
- **Key Files:**
  - `main.tf` – Defines security groups and IAM policies.
  - `variables.tf` – Allows customization of security parameters.
  - `outputs.tf` – Outputs security group IDs.
- **Dependencies:**
  - External: AWS IAM and Security Group services.

### Storage Module

- **Path:** `modules/storage/`
- **Purpose:** Defines storage resources such as S3 buckets.
- **Key Files:**
  - `main.tf` – Creates S3 buckets.
  - `variables.tf` – Variables for bucket configurations.
  - `outputs.tf` – Exports bucket names and ARNs.
- **Dependencies:**
  - External: AWS S3 service.

## Environment Configurations

Explanation of environment-specific configurations for development, staging, and production, using `.tfvars` files to set variable values.

- **Development Environment:**
  - **File:** `environments/development/terraform.tfvars`
  - Contains variables tailored for development, such as smaller instance sizes.
- **Staging Environment:**
  - **File:** `environments/staging/terraform.tfvars`
  - Uses configurations that mirror production for testing purposes.
- **Production Environment:**
  - **File:** `environments/production/terraform.tfvars`
  - Specifies configurations for high availability and performance.

*(Refer to "**SYSTEM ARCHITECTURE/Deployment Architecture**" for more details on environment configurations.)*

## Deployment Process

Step-by-step guide on deploying the infrastructure using Terraform, including initialization, validation, and apply commands.

### Initialization

Run the initialization script to set up the Terraform environment:

```bash
./scripts/init_scripts.sh
```

This script executes `terraform init`, configuring the backend and installing necessary providers.

### Validation

Validate the Terraform configuration:

```bash
terraform validate
```

### Planning

Generate an execution plan:

```bash
terraform plan -var-file=environments/<environment>/terraform.tfvars -out=plan.tfplan
```

Replace `<environment>` with `development`, `staging`, or `production`.

### Applying

Apply the planned changes:

```bash
terraform apply plan.tfplan
```

### Automation

Automate the deployment process using the deployment script:

```bash
./scripts/deploy_scripts.sh <environment>
```

*(Scripts are located in `scripts/` directory.)*

## State Management

Details on managing Terraform state using AWS S3 and DynamoDB, ensuring secure and consistent state storage and locking.

- **Backend Configuration:** Specified in `backend.tf`.
  - **S3 Bucket:** Stores the Terraform state file.
  - **DynamoDB Table:** Manages state locking to prevent concurrent modifications.
- **Security:** Ensure encryption and versioning are enabled on the S3 bucket.

*(Refer to the "State Management" section in "**SYSTEM ARCHITECTURE/Deployment Architecture**" for detailed information.)*

## Troubleshooting

Common issues and solutions related to Terraform deployment and infrastructure management.

### Common Issues

- **State Locking Issues:**
  - Occur when the state lock isn't released due to interruption.
- **Authentication Errors:**
  - Result from misconfigured AWS credentials.
- **Resource Conflicts:**
  - Happen when manual changes are made outside of Terraform.

### Solutions

- **Releasing State Locks:**
  - Use the DynamoDB console to remove stale locks carefully.
- **Verifying AWS Credentials:**
  - Ensure AWS access keys and profiles are correctly configured.
- **Avoiding Manual Changes:**
  - Always manage resources through Terraform to maintain state integrity.

*(For additional assistance, refer to the "Troubleshooting" section in "**SYSTEM ARCHITECTURE/Deployment Architecture**".)*

## Contact

For further assistance, please contact the DevOps Team at [devops@example.com](mailto:devops@example.com).