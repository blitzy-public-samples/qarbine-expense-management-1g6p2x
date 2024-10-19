#!/bin/bash

# -------------------------------------------------------------------
# Script Name: init_scripts.sh
# Description:
#     This script initializes the Terraform environment for the Global Employee Travel Expense Tracking App.
#     It sets up necessary configurations and prepares the environment for infrastructure deployment.
#
# Requirement Addressed:
#     - Environment Initialization
# Location:
#     - SYSTEM ARCHITECTURE/Deployment Architecture
# Description:
#     - Prepares the Terraform environment by setting up configurations and ensuring readiness for infrastructure deployment.
# -------------------------------------------------------------------

# Global Variables
# TERRAFORM_DIR: The directory where Terraform configuration files are located.
TERRAFORM_DIR="/path/to/terraform/configuration"

# External Dependencies
# Terraform version 1.0.0 is required.
# This script depends on Terraform to define and provision the infrastructure.
# Purpose:
#     - Infrastructure as Code tool used to define and provision the infrastructure.

# Functions

# Function: check_terraform_version
# Description:
#     Checks if the installed Terraform version matches the required version (1.0.0).
#     Ensures compatibility and prevents deployment issues.
# Requirement Addressed:
#     - Environment Initialization
# Location:
#     - SYSTEM ARCHITECTURE/Deployment Architecture
# Parameters:
#     - None
# Returns:
#     - None
check_terraform_version() {
    local required_version="1.0.0"
    local installed_version

    # Check if Terraform is installed
    if ! command -v terraform >/dev/null 2>&1; then
        echo "Error: Terraform is not installed."
        exit 1
    fi

    # Get installed Terraform version
    installed_version=$(terraform version | head -n1 | sed 's/Terraform v\([0-9\.]*\).*/\1/')

    echo "Installed Terraform version: $installed_version"
    echo "Required Terraform version: $required_version"

    # Compare installed version with required version
    if [ "$installed_version" != "$required_version" ]; then
        echo "Error: Terraform version mismatch."
        echo "Please install Terraform version $required_version."
        exit 1
    fi

    echo "Terraform version check passed."
}

# Function: initialize_environment
# Description:
#     Sets up the Terraform environment by initializing configurations and preparing for deployment.
#     This function performs the following steps:
#         1. Navigate to the Terraform configuration directory.
#         2. Initialize Terraform with 'terraform init' to set up the backend and provider configurations.
#         3. Validate the Terraform configuration files using 'terraform validate'.
#         4. Prepare the environment-specific variables by sourcing the appropriate .tfvars file.
#         5. Log the initialization process and handle any errors.
# Requirement Addressed:
#     - Environment Initialization
# Location:
#     - SYSTEM ARCHITECTURE/Deployment Architecture
# Parameters:
#     - $1: environment (e.g., development, staging, production)
# Returns:
#     - None
initialize_environment() {
    local environment="$1"

    # Check if environment parameter is provided
    if [ -z "$environment" ]; then
        echo "Error: No environment specified."
        echo "Usage: $0 <environment>"
        exit 1
    fi

    echo "Initializing Terraform environment for '$environment'..."

    # Step 1: Navigate to the Terraform configuration directory
    # Requirement Addressed:
    #     - Environment Initialization
    # Location:
    #     - SYSTEM ARCHITECTURE/Deployment Architecture
    echo "Navigating to Terraform configuration directory: $TERRAFORM_DIR"
    cd "$TERRAFORM_DIR" || {
        echo "Error: Failed to navigate to Terraform directory: $TERRAFORM_DIR"
        exit 1
    }

    # Step 2: Initialize Terraform with 'terraform init'
    # Requirement Addressed:
    #     - Environment Initialization
    # Location:
    #     - SYSTEM ARCHITECTURE/Deployment Architecture
    echo "Running 'terraform init' with backend configuration for '$environment'..."
    terraform init -input=false -backend-config="environments/${environment}/backend.tfvars" || {
        echo "Error: Terraform initialization failed."
        exit 1
    }

    # Step 3: Validate the Terraform configuration files
    # Requirement Addressed:
    #     - Environment Initialization
    # Location:
    #     - SYSTEM ARCHITECTURE/Deployment Architecture
    echo "Validating Terraform configuration..."
    terraform validate || {
        echo "Error: Terraform validation failed."
        exit 1
    }

    # Step 4: Prepare environment-specific variables
    # Requirement Addressed:
    #     - Environment Initialization
    # Location:
    #     - SYSTEM ARCHITECTURE/Deployment Architecture
    echo "Preparing environment-specific variables for '$environment'..."
    TFVARS_FILE="environments/${environment}/terraform.tfvars"
    if [ -f "$TFVARS_FILE" ]; then
        echo "Using variables file: $TFVARS_FILE"
        export TF_VAR_environment="$environment"
    else
        echo "Error: Variables file for environment '$environment' not found at $TFVARS_FILE."
        exit 1
    fi

    # Step 5: Log the initialization process and handle any errors
    # Requirement Addressed:
    #     - Environment Initialization
    # Location:
    #     - SYSTEM ARCHITECTURE/Deployment Architecture
    LOG_DIR="$TERRAFORM_DIR/logs"
    mkdir -p "$LOG_DIR"

    LOG_FILE="$LOG_DIR/init_${environment}_$(date +%Y%m%d%H%M%S).log"
    echo "Logging initialization process to $LOG_FILE"

    # Redirect stdout and stderr to log file
    exec > >(tee -a "$LOG_FILE")
    exec 2>&1

    echo "Terraform environment initialization for '$environment' completed successfully."
}

# Main Script Execution
# Check if the script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Check Terraform version
    check_terraform_version

    # Call the initialize_environment function with the provided argument
    initialize_environment "$1"
fi