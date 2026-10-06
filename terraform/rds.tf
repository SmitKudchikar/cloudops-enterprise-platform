resource "aws_db_subnet_group" "cloudops" {
  name        = "cloudops-enterprise-platform-db-subnet-group"
  description = "Private subnet group for CloudOps PostgreSQL"

  subnet_ids = [
    aws_subnet.public.id,
    aws_subnet.private.id
  ]
}

resource "aws_db_instance" "cloudops" {
  identifier = "cloudops-enterprise-platform-db"

  engine         = "postgres"
  engine_version = "18.3"
  instance_class = "db.t4g.micro"

  allocated_storage     = 20
  max_allocated_storage = 1000
  storage_type          = "gp2"
  storage_encrypted     = true

  skip_final_snapshot = true
  username            = "cloudopsadmin"

  port = 5432

  availability_zone = "ap-south-1a"

  db_subnet_group_name = aws_db_subnet_group.cloudops.name

  vpc_security_group_ids = [
    aws_security_group.db.id
  ]

  publicly_accessible = false

  multi_az = false

  backup_retention_period = 1

  auto_minor_version_upgrade = true

  copy_tags_to_snapshot = true

  monitoring_interval = 60

  performance_insights_enabled          = true
  performance_insights_retention_period = 7

  deletion_protection = false
}