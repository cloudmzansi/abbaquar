import { Injectable } from '@nestjs/common';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

const DATA_PATH = path.resolve(__dirname, '../../../data/activities.json');

@Injectable()
export class ActivitiesService {
  private get activities() {
    if (!fs.existsSync(DATA_PATH)) return [];
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  }

  private saveActivities(activities) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(activities, null, 2));
    this.commitAndPush();
  }

  private commitAndPush() {
    exec(`git add ${DATA_PATH} && git commit -m "Update activities" && git push`, (err, stdout, stderr) => {
      if (err) {
        console.error('Git push error:', err, stderr);
      } else {
        console.log('Git push success:', stdout);
      }
    });
  }

  findAll() {
    return this.activities;
  }

  findOne(id: string) {
    return this.activities.find(a => a.id === id);
  }

  create(createActivityDto: CreateActivityDto) {
    const activities = this.activities;
    const activity = { id: uuidv4(), ...createActivityDto };
    activities.push(activity);
    this.saveActivities(activities);
    return activity;
  }

  update(id: string, updateActivityDto: UpdateActivityDto) {
    const activities = this.activities;
    const idx = activities.findIndex(a => a.id === id);
    if (idx === -1) return null;
    activities[idx] = { ...activities[idx], ...updateActivityDto };
    this.saveActivities(activities);
    return activities[idx];
  }

  remove(id: string) {
    const activities = this.activities;
    const idx = activities.findIndex(a => a.id === id);
    if (idx === -1) return null;
    const [removed] = activities.splice(idx, 1);
    this.saveActivities(activities);
    return removed;
  }
} 