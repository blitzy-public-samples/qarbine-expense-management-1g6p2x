/*
 * This variables.tf file defines the input variables required for configuring the CI/CD infrastructure module.
 * These variables allow customization of the CI/CD setup, such as specifying the pipeline name, stages, and environment settings.
 *
 * Requirements Addressed:
 * - CI/CD Infrastructure Configuration
 *   - Location: SYSTEM ARCHITECTURE > Deployment Architecture
 *   - Description: Provides configurable input variables for setting up the CI/CD infrastructure, enabling customization and flexibility in deployment.
 *   - Reference: Technical Specification > INFRASTRUCTURE > CI/CD Pipeline
 *
 * This file enables the module to be customized according to deployment needs, supporting different environments and workflows.
 */

/* Variable: pipeline_name
 * Description: The name of the AWS CodePipeline.
 * Type: string
 * Default: "default-pipeline"
 *
 * Requirement Addressed:
 * - Allows customization of the pipeline name to align with organizational naming conventions and distinguish between different pipelines.
 * - Location: Technical Specification > INFRASTRUCTURE > CI/CD Pipeline > Pipeline Workflow
 * - Detailed in the CI/CD pipeline setup to facilitate identification and management of pipelines across environments.
 */
variable "pipeline_name" {
  description = "The name of the AWS CodePipeline."
  type        = string
  default     = "default-pipeline"
}

/* Variable: stages
 * Description: The stages of the CI/CD pipeline.
 * Type: list(string)
 * Default: ["source", "build", "deploy"]
 *
 * Requirement Addressed:
 * - Enables configuration of pipeline stages to match the CI/CD workflow requirements.
 * - Location: Technical Specification > INFRASTRUCTURE > CI/CD Pipeline > Pipeline Workflow
 * - Supports the inclusion or exclusion of stages as needed, providing flexibility in the deployment process.
 */
variable "stages" {
  description = "The stages of the CI/CD pipeline."
  type        = list(string)
  default     = ["source", "build", "deploy"]
}

/* Variable: environment
 * Description: The environment configuration for the AWS CodeBuild project.
 * Type: string
 * Default: "production"
 *
 * Requirement Addressed:
 * - Specifies the target environment for deployment (e.g., development, staging, production).
 * - Location: Technical Specification > INFRASTRUCTURE > Deployment Environment
 * - Allows differentiation between environments, aiding in environment-specific configurations and deployments.
 */
variable "environment" {
  description = "The environment configuration for the AWS CodeBuild project."
  type        = string
  default     = "production"
}

/* Variable: tags
 * Description: Tags to apply to the CI/CD resources.
 * Type: map(string)
 * Default: {}
 *
 * Requirement Addressed:
 * - Facilitates resource tagging for cost allocation, management, and automation.
 * - Location: Technical Specification > INFRASTRUCTURE > Cloud Services
 * - Enables the application of metadata to resources, assisting in resource identification and policy enforcement.
 */
variable "tags" {
  description = "Tags to apply to the CI/CD resources."
  type        = map(string)
  default     = {}
}