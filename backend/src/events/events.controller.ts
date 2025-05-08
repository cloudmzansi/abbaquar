import { Controller, Get, Post, Put, Delete, Body, Param, Req, UnauthorizedException } from '@nestjs/common';
import { EventsService } from './events.service';

const ADMIN_EMAIL = 'andrewmichaelsrsa@gmail.com';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  private checkAuth(req: any) {
    if (req.headers['x-admin-email'] !== ADMIN_EMAIL) throw new UnauthorizedException();
  }

  @Get()
  async getAll(@Req() req: any) {
    this.checkAuth(req);
    return this.eventsService.getAll();
  }

  @Post()
  async create(@Body() body: any, @Req() req: any) {
    this.checkAuth(req);
    return this.eventsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    this.checkAuth(req);
    return this.eventsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    this.checkAuth(req);
    return this.eventsService.delete(id);
  }
} 