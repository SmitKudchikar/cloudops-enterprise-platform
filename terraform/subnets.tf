resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.cloudops.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = false

  tags = {
    Name = "cloudops-enterprise-platform-public-subnet"
  }
}

resource "aws_subnet" "private" {
  vpc_id                  = aws_vpc.cloudops.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-south-1b"
  map_public_ip_on_launch = false

  tags = {
    Name = "cloudops-enterprise-platform-private-subnet"
  }
}