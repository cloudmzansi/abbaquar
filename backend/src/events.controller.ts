import { Controller, Get, Post, Body, Delete, HttpException, Param } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const EVENTS_PATH = path.join(__dirname, '../../../data/events.json');

@Controller('events')
export class EventsController {
  @Get()
  getEvents() {
    try {
      const data = fs.readFileSync(EVENTS_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw new HttpException('Failed to fetch events', 500);
    }
  }

  @Post()
  addEvent(@Body() event: any) {
    try {
      const data = fs.readFileSync(EVENTS_PATH, 'utf-8');
      const events = JSON.parse(data);
      events.push(event);
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2));
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to add event', 500);
    }
  }

  @Delete()
  clearEvents() {
    try {
      fs.writeFileSync(EVENTS_PATH, '[]');
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to clear events', 500);
    }
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    try {
      const data = fs.readFileSync(EVENTS_PATH, 'utf-8');
      let events = JSON.parse(data);
      events = events.filter((e: any) => e.id !== id);
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2));
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to delete event', 500);
    }
  }
} 