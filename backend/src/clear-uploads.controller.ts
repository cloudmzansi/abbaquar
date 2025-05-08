import { Controller, Delete, HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const UPLOADS_PATH = path.join(__dirname, '../../../public/uploads');

@Controller('clear-uploads')
export class ClearUploadsController {
  @Delete()
  clearUploads() {
    try {
      const files = fs.readdirSync(UPLOADS_PATH);
      for (const file of files) {
        fs.unlinkSync(path.join(UPLOADS_PATH, file));
      }
      return { success: true };
    } catch (err) {
      throw new HttpException('Failed to clear uploads', 500);
    }
  }
} 