import { Injectable, HttpException } from '@nestjs/common';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import * as fs from 'fs';
import * as path from 'path';

const ACTIVITIES_PATH = path.join(__dirname, '../../../../data/activities.json');

@Injectable()
export class ActivitiesService {
  async findAll() {
    try {
      const data = fs.readFileSync(ACTIVITIES_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw new HttpException('Failed to fetch activities', 500);
    }
  }

  async findOne(id: string) {
    try {
      const data = fs.readFileSync(ACTIVITIES_PATH, 'utf-8');
      const activities = JSON.parse(data);
      return activities.find((a: any) => a.id === id);
    } catch (err) {
      throw new HttpException('Failed to fetch activity', 500);
    }
  }

  async create(createActivityDto: CreateActivityDto) {
    try {
      const data = fs.readFileSync(ACTIVITIES_PATH, 'utf-8');
      const activities = JSON.parse(data);
      const newActivity = { id: Date.now().toString(), ...createActivityDto };
      activities.push(newActivity);
      fs.writeFileSync(ACTIVITIES_PATH, JSON.stringify(activities, null, 2));
      return newActivity;
    } catch (err) {
      throw new HttpException('Failed to create activity', 500);
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      const data = fs.readFileSync(ACTIVITIES_PATH, 'utf-8');
      const activities = JSON.parse(data);
      const idx = activities.findIndex((a: any) => a.id === id);
      if (idx === -1) throw new HttpException('Activity not found', 404);
      activities[idx] = { ...activities[idx], ...updateActivityDto };
      fs.writeFileSync(ACTIVITIES_PATH, JSON.stringify(activities, null, 2));
      return activities[idx];
    } catch (err) {
      throw new HttpException('Failed to update activity', 500);
    }
  }

  async remove(id: string) {
    try {
      const data = fs.readFileSync(ACTIVITIES_PATH, 'utf-8');
      let activities = JSON.parse(data);
      activities = activities.filter((a: any) => a.id !== id);
      fs.writeFileSync(ACTIVITIES_PATH, JSON.stringify(activities, null, 2));
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to remove activity', 500);
    }
  }
} 
} 