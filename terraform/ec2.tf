resource "aws_instance" "web" {
  ami           = "ami-08e3b3155fc937a94"
  instance_type = "t3.micro"

  subnet_id = aws_subnet.public.id

  vpc_security_group_ids = [
    "sg-0a777867f564abd69"
  ]

  key_name = "cloudops-enterprise-platform-key"

  iam_instance_profile = "cloudops-enterprise-platform-ec2-role"

  monitoring = false

  ebs_optimized = true

  metadata_options {
    http_tokens = "required"
  }

  root_block_device {
    delete_on_termination = true
  }

  tags = {
    Name = "cloudops-enterprise-platform-web"
  }
}