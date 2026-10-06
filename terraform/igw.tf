resource "aws_internet_gateway" "cloudops" {
  vpc_id = aws_vpc.cloudops.id

  tags = {
    Name = "cloudops-enterprise-platform-igw"
  }
}