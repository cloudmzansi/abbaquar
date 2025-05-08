import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  async createPhoto(filename: string, description: string) {
    return this.prisma.photo.create({
      data: { filename, description },
    });
  }

  async deletePhoto(filename: string) {
    const photo = await this.prisma.photo.findUnique({ where: { filename } });
    if (!photo) throw new NotFoundException('Photo not found');
    await this.prisma.photo.delete({ where: { filename } });
    fs.unlinkSync(path.join(process.cwd(), 'public/assets', filename));
    return { success: true };
  }
} 