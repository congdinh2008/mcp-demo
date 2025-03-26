module "vpc" {
  source = "../modules/vpc"

  environment         = var.environment
  vpc_cidr           = var.vpc_cidr
  public_subnets_cidr = var.public_subnets_cidr
  availability_zones  = var.availability_zones
}

module "security" {
  source = "../modules/security"

  environment = var.environment
  vpc_id     = module.vpc.vpc_id
}

module "ec2" {
  source = "../modules/ec2"

  environment       = var.environment
  subnet_id        = module.vpc.public_subnet_ids[0]
  security_group_id = module.security.security_group_id
  key_name         = var.key_name
  instance_type    = var.instance_type
  app_name         = var.app_name
  app_port         = var.app_port
}

output "application_url" {
  value = "http://${module.ec2.instance_public_ip}"
}