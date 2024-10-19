# -------------------------------------------------------------------------------------------------------------------
    # Terraform Backend Configuration
    #
    # This file configures Terraform to use AWS S3 for remote state storage and DynamoDB for state locking. By storing
    # the state in a central location, we enable team collaboration and maintain consistency across the infrastructure
    # deployments. State locking ensures that multiple team members do not execute conflicting operations simultaneously.
    #
    # Requirements Addressed:
    # - Name: State Management
    #   Location: INFRASTRUCTURE/Deployment Environment/Cloud Services
    #   Description:
    #     - Configures the backend for Terraform state management.
    #     - Utilizes AWS S3 for state storage and DynamoDB for state locking.
    #
    # Refer to the Technical Specification under "Infrastructure" > "Deployment Environment" > "Cloud Services" for more
    # details on the cloud infrastructure setup.
    # -------------------------------------------------------------------------------------------------------------------

    terraform {
      # Specifies the minimum required version of Terraform to ensure compatibility with the configuration syntax.
      required_version = ">= 0.12"

      # Backend configuration to define where and how the Terraform state is stored.
      backend "s3" {
        # The name of the S3 bucket where the Terraform state file will be stored securely.
        bucket = "my-terraform-state"

        # The key within the S3 bucket under which the state file will be saved.
        # Organizes the state file under a specific path for this project.
        key    = "global-employee-travel-expense-tracking-app/terraform.tfstate"

        # The AWS region where the S3 bucket and DynamoDB table are located.
        # Ensures that all resources are in the same region for compliance and latency considerations.
        region = "us-west-2"

        # The name of the DynamoDB table used for state locking and consistency checking.
        # Prevents concurrent Terraform executions that could lead to corrupt state.
        dynamodb_table = "terraform-lock"

        # Enables server-side encryption at rest for the state file in S3.
        # Encrypts the state file to protect sensitive information it may contain.
        encrypt = true
      }
    }