terraform {
required_providers { aws = { source = "hashicorp/aws" version = ">= 5.0" } }
}
provider "aws" { region = var.aws_region }


# VPC (use module or minimal VPC)
resource "aws_vpc" "main" {
cidr_block = "10.0.0.0/16"
tags = { Name = "demo-vpc" }
}


resource "aws_subnet" "public" {
count = 2
vpc_id = aws_vpc.main.id
cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
availability_zone = data.aws_availability_zones.available.names[count.index]
}


# Security groups
resource "aws_security_group" "alb_sg" {
name = "alb-sg"
vpc_id = aws_vpc.main.id
ingress { from_port=80; to_port=80; protocol="tcp"; cidr_blocks=["0.0.0.0/0"] }
egress { from_port=0; to_port=0; protocol="-1"; cidr_blocks=["0.0.0.0/0"] }
}


resource "aws_security_group" "ecs_sg" {
name = "ecs-sg"
vpc_id = aws_vpc.main.id
}

