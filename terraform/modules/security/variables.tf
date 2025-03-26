variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

output "security_group_id" {
  value = aws_security_group.web.id
}