# Required providers configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # Using hashicorp/aws provider version >= 3.0.0 as specified in external dependencies
      version = ">= 3.0.0"
    }
  }
}

# Configure the AWS provider
provider "aws" {
  # AWS provider configuration
  # Region is provided via variables.tf (var.region)
  region = var.region
}

# Resource: AWS CodePipeline for CI/CD process
resource "aws_codepipeline" "ci_cd_pipeline" {
  # Defines an AWS CodePipeline for automating the CI/CD process.
  # Addresses Requirement: CI/CD Infrastructure Setup
  # Location: SYSTEM ARCHITECTURE/Deployment Architecture
  # Description: Automates the setup of CI/CD pipelines using AWS services, enabling continuous integration and deployment for the application.

  # Specify the pipeline name
  # Provided via variables.tf as var.pipeline_name
  name = var.pipeline_name

  # IAM role ARN for the pipeline to assume
  # Provided via variables.tf as var.pipeline_role_arn
  role_arn = var.pipeline_role_arn

  # Define the stages of the pipeline, including source, build, and deploy
  # Stages configuration provided via variables.tf or defined here
  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeCommit"
      version          = "1"
      output_artifacts = ["SourceOutput"]

      configuration = {
        RepositoryName = var.repository_name   # Repository name provided via variables.tf
        BranchName     = var.branch_name       # Branch name provided via variables.tf
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["SourceOutput"]
      output_artifacts = ["BuildOutput"]

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "CodeDeploy"
      version         = "1"
      input_artifacts = ["BuildOutput"]

      configuration = {
        ApplicationName     = var.codedeploy_application_name       # Provided via variables.tf
        DeploymentGroupName = var.codedeploy_deployment_group_name  # Provided via variables.tf
      }
    }
  }

  # Apply tags for resource identification and management
  # Tags provided via variables.tf as var.tags
  tags = var.tags
}

# Resource: AWS CodeBuild project
resource "aws_codebuild_project" "build_project" {
  # Defines an AWS CodeBuild project for building and testing the application.
  # Addresses Requirement: CI/CD Infrastructure Setup
  # Location: SYSTEM ARCHITECTURE/Deployment Architecture
  # Description: Automates the setup of CI/CD build environment for continuous integration.

  # Specify the project name
  # Provided via variables.tf as var.build_project_name
  name = var.build_project_name

  # Define the source configuration for the build project
  source {
    # Source type, e.g., CODEPIPELINE
    # Provided via variables.tf as var.build_source_type
    type = var.build_source_type

    # Buildspec file path
    # Provided via variables.tf as var.buildspec_path
    buildspec = var.buildspec_path
  }

  # Set the environment variables and compute resources for the build
  environment {
    # Compute type for the build
    # Provided via variables.tf as var.compute_type
    compute_type = var.compute_type

    # Build environment image
    # Provided via variables.tf as var.build_image
    image = var.build_image

    # Type of build environment; e.g., LINUX_CONTAINER
    # Provided via variables.tf as var.environment_type
    type = var.environment_type

    # Environment variables for the build
    # Provided via variables.tf as var.environment_variables (list of maps)
    environment_variable = var.environment_variables
  }

  # IAM service role for CodeBuild
  # Provided via variables.tf as var.build_service_role
  service_role = var.build_service_role

  # Apply tags for resource identification and management
  # Tags provided via variables.tf as var.tags
  tags = var.tags
}