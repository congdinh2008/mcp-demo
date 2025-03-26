variable "environment" {
  description = "Environment name"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "Subnet ID where the instance will be launched"
  type        = string
}

variable "security_group_id" {
  description = "Security group ID for the instance"
  type        = string
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "mcp-demo"
}

variable "app_port" {
  description = "Application port"
  type        = number
  default     = 80
}

output "instance_public_ip" {
  value = aws_eip.web.public_ip
}

output "instance_id" {
  value = aws_instance.web.id
}