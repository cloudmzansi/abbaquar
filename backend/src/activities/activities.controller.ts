import { Controller, Get, Post, Body, Param, Delete, Put, HttpException } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findAll() {
    try {
      return this.activitiesService.findAll();
    } catch (err) {
      throw new HttpException('Failed to fetch activities', 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.activitiesService.findOne(id);
    } catch (err) {
      throw new HttpException('Failed to fetch activity', 500);
    }
  }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    try {
      return this.activitiesService.create(createActivityDto);
    } catch (err) {
      throw new HttpException('Failed to create activity', 500);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    try {
      return this.activitiesService.update(id, updateActivityDto);
    } catch (err) {
      throw new HttpException('Failed to update activity', 500);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.activitiesService.remove(id);
    } catch (err) {
      throw new HttpException('Failed to remove activity', 500);
    }
  }
} 