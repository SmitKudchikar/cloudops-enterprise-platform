resource "aws_vpc" "cloudops" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "cloudops-enterprise-platform"
  }
}