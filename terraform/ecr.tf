resource "aws_ecr_repository" "frontend" {
  name                 = "cloudops-enterprise-platform/frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}