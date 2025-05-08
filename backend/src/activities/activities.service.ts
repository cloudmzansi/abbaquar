import { Injectable, HttpException } from '@nestjs/common';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.activity.findMany();
    } catch (err) {
      console.error('Error fetching activities:', err);
      throw new HttpException('Failed to fetch activities', 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.activity.findUnique({ where: { id } });
    } catch (err) {
      console.error('Error fetching activity:', err);
      throw new HttpException('Failed to fetch activity', 500);
    }
  }

  async create(createActivityDto: CreateActivityDto) {
    try {
      return await this.prisma.activity.create({ data: createActivityDto });
    } catch (err) {
      console.error('Error creating activity:', err);
      throw new HttpException('Failed to create activity', 500);
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      return await this.prisma.activity.update({ where: { id }, data: updateActivityDto });
    } catch (err) {
      console.error('Error updating activity:', err);
      throw new HttpException('Failed to update activity', 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.activity.delete({ where: { id } });
    } catch (err) {
      console.error('Error removing activity:', err);
      throw new HttpException('Failed to remove activity', 500);
    }
  }
} 
} 