/*
 * outputs.tf
 *
 * This Terraform outputs file defines the outputs for the CI/CD infrastructure module, exposing key information about the resources created, such as pipeline IDs and project names.
 *
 * Requirements Addressed:
 * - CI/CD Infrastructure Outputs
 *   - Description: Exposes outputs for the CI/CD module, providing essential information about the created resources for integration and management.
 *   - Location: SYSTEM ARCHITECTURE/Deployment Architecture
 */

/*
 * Output: pipeline_id
 *
 * Provides the ID of the created AWS CodePipeline.
 *
 * Requirement Addressed:
 * - Name: CI/CD Infrastructure Outputs
 *   - Description: Exposes outputs for the CI/CD module, providing essential information about the created resources for integration and management.
 *   - Location: SYSTEM ARCHITECTURE/Deployment Architecture
 */
output "pipeline_id" {
  description = "The ID of the created AWS CodePipeline."
  value       = aws_codepipeline.example.id
}

/*
 * Output: build_project_name
 *
 * Provides the name of the AWS CodeBuild project.
 *
 * Requirement Addressed:
 * - Name: CI/CD Infrastructure Outputs
 *   - Description: Exposes outputs for the CI/CD module, providing essential information about the created resources for integration and management.
 *   - Location: SYSTEM ARCHITECTURE/Deployment Architecture
 */
output "build_project_name" {
  description = "The name of the AWS CodeBuild project."
  value       = aws_codebuild_project.example.name
}