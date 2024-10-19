#!/bin/bash

# ------------------------------------------------------------------------
# Script Name: deploy_scripts.sh
#
# Description:
#   - Automates the deployment process of the Terraform infrastructure for the Global Employee Travel Expense Tracking App.
#   - Ensures that the infrastructure is provisioned and configured according to the defined Terraform configurations and environment-specific variables.
#
# Requirements Addressed:
#   - Automated Deployment Process
#     Location: SYSTEM ARCHITECTURE/Deployment Architecture
#     Description: Automates the deployment of infrastructure resources using Terraform, ensuring consistency and reliability across environments.
#
# Dependencies:
#   - Internal:
#       - initialize_environment function from init_scripts.sh
#         Path: infrastructure/terraform/scripts/init_scripts.sh
#         Purpose: Initializes the Terraform environment before deployment.
#   - External:
#       - Terraform v1.0.0
#         Purpose: Infrastructure as Code tool used to define and provision the infrastructure.
#       - jq (Command-line JSON processor)
#         Purpose: Parses JSON output from Terraform commands.
# ------------------------------------------------------------------------

# Global Variables
# Set the path to the Terraform configuration directory as specified in the global settings.
TERRAFORM_DIR="/path/to/terraform/configuration"

# Check if 'jq' is installed
command -v jq >/dev/null 2>&1 || {
    echo "Error: 'jq' is required but not installed. Please install 'jq' to continue."
    exit 1
}

# Check if Terraform is installed and meets the version requirement
required_terraform_version="1.0.0"
if ! command -v terraform >/dev/null 2>&1; then
    echo "Error: Terraform is not installed. Please install Terraform v$required_terraform_version or higher."
    exit 1
fi

current_terraform_version=$(terraform version -json | jq -r '.terraform_version')

if [[ "$current_terraform_version" != "$required_terraform_version" ]]; then
    echo "Error: Terraform v$required_terraform_version is required. Installed version is v$current_terraform_version."
    exit 1
fi

# Function: deploy_infrastructure
# Description:
#   Executes the Terraform apply command to deploy the infrastructure.
#   Steps:
#     1. Navigate to the Terraform configuration directory.
#     2. Execute 'terraform apply' with the appropriate .tfvars file for the specified environment.
#     3. Monitor the deployment process and log outputs.
#     4. Handle any errors and ensure rollback if necessary.
# Parameters:
#   - environment: The target deployment environment (e.g., development, staging, production).
deploy_infrastructure() {

    local environment="$1"

    # Navigate to the Terraform configuration directory
    echo "Navigating to Terraform configuration directory: $TERRAFORM_DIR"
    cd "$TERRAFORM_DIR" || {
        echo "Error: Unable to navigate to Terraform directory at $TERRAFORM_DIR"
        exit 1
    }

    # Source the initialization script
    echo "Initializing Terraform environment for $environment..."
    if [[ -f "../scripts/init_scripts.sh" ]]; then
        source "../scripts/init_scripts.sh"
        initialize_environment "$environment"
    else
        echo "Error: Initialization script init_scripts.sh not found."
        exit 1
    }

    # Execute 'terraform apply' with the appropriate .tfvars file for the specified environment
    tfvars_file="environments/$environment/terraform.tfvars"
    if [[ ! -f "$tfvars_file" ]]; then
        echo "Error: Terraform variable file $tfvars_file does not exist."
        exit 1
    fi

    echo "Applying Terraform configurations for $environment environment..."
    terraform apply -var-file="$tfvars_file" -auto-approve | tee "deploy_$environment.log"

    if [[ ${PIPESTATUS[0]} -eq 0 ]]; then
        echo "Terraform apply completed successfully for $environment environment."
    else
        echo "Error: Terraform apply failed for $environment environment."
        # Handle errors and ensure rollback if necessary
        echo "Initiating rollback procedure for $environment environment..."

        # Rollback procedure
        echo "Destroying resources to rollback changes..."
        terraform destroy -var-file="$tfvars_file" -auto-approve

        if [[ $? -eq 0 ]]; then
            echo "Rollback completed successfully."
        else
            echo "Error: Rollback failed. Manual intervention may be required."
        fi
        exit 1
    fi

    # Monitor the deployment process and log outputs
    # The 'tee' command above logs the outputs to deploy_<environment>.log

}

# Main Script Execution
# Check if environment parameter is provided
if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <environment>"
    echo "Example: $0 development"
    exit 1
fi

# Get the environment parameter
ENVIRONMENT="$1"

# Validate environment
case "$ENVIRONMENT" in
    development|staging|production)
        ;;
    *)
        echo "Error: Invalid environment specified. Valid options are development, staging, production."
        exit 1
        ;;
esac

# Start the deployment process
echo "Starting deployment for $ENVIRONMENT environment..."

deploy_infrastructure "$ENVIRONMENT"

echo "Deployment script completed successfully for $ENVIRONMENT environment."