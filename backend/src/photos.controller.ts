import { Controller, Get, Post, Body, Delete, HttpException, UploadedFile, UseInterceptors, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as sharp from 'sharp';

const PHOTOS_PATH = path.join(__dirname, '../../../data/photos.json');
const UPLOADS_PATH = path.join(__dirname, '../../../public/uploads');

@Controller('photos')
export class PhotosController {
  @Get()
  getPhotos() {
    try {
      const data = fs.readFileSync(PHOTOS_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw new HttpException('Failed to fetch photos', 500);
    }
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Req() req) {
    try {
      const { category } = req.body;
      if (!file) throw new HttpException('No file uploaded', 400);
      const filename = `${Date.now()}-${file.originalname.split('.')[0]}.webp`;
      const filepath = path.join(UPLOADS_PATH, filename);
      await sharp(file.buffer).webp().toFile(filepath);
      // Update photos.json
      const data = fs.readFileSync(PHOTOS_PATH, 'utf-8');
      const photos = JSON.parse(data);
      const photoMeta = { filename, category, uploadedAt: new Date().toISOString() };
      photos.push(photoMeta);
      fs.writeFileSync(PHOTOS_PATH, JSON.stringify(photos, null, 2));
      return { success: true, photo: photoMeta };
    } catch (err) {
      throw new HttpException('Failed to upload photo', 500);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  addPhoto(@Body() photo: any) {
    try {
      const data = fs.readFileSync(PHOTOS_PATH, 'utf-8');
      const photos = JSON.parse(data);
      photos.push(photo);
      fs.writeFileSync(PHOTOS_PATH, JSON.stringify(photos, null, 2));
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to add photo', 500);
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  clearPhotos() {
    try {
      fs.writeFileSync(PHOTOS_PATH, '[]');
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to clear photos', 500);
    }
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  deletePhoto(@Body() body: { filename: string }) {
    try {
      const { filename } = body;
      if (!filename) throw new HttpException('Filename required', 400);
      // Remove file from uploads
      const filepath = path.join(UPLOADS_PATH, filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      // Remove from photos.json
      const data = fs.readFileSync(PHOTOS_PATH, 'utf-8');
      let photos = JSON.parse(data);
      photos = photos.filter((p: any) => p.filename !== filename);
      fs.writeFileSync(PHOTOS_PATH, JSON.stringify(photos, null, 2));
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to delete photo', 500);
    }
  }
} 