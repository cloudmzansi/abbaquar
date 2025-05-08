import { Controller, Post, Delete, UseInterceptors, UploadedFile, Body, Req, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotosService } from './photos.service';
import { extname } from 'path';

const ADMIN_EMAIL = 'andrewmichaelsrsa@gmail.com';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  private checkAuth(req: any) {
    // Replace with real auth check
    if (req.headers['x-admin-email'] !== ADMIN_EMAIL) throw new UnauthorizedException();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/assets',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
  }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Body('description') description: string, @Req() req: any) {
    this.checkAuth(req);
    return this.photosService.createPhoto(file.filename, description);
  }

  @Delete('delete')
  async deletePhoto(@Body('filename') filename: string, @Req() req: any) {
    this.checkAuth(req);
    return this.photosService.deletePhoto(filename);
  }
} 