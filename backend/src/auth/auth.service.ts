import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateAdmin(password: string): Promise<boolean> {
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD not configured in environment');
    }

    // For the first login, if the password is not hashed, hash it
    if (!adminPassword.startsWith('$2b$')) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      console.log(`Please update your .env file with the hashed password: ADMIN_PASSWORD=${hashedPassword}`);
      return adminPassword === password;
    }

    // For subsequent logins, compare with the hashed password
    return bcrypt.compare(password, adminPassword);
  }

  async login(password: string) {
    const isValid = await this.validateAdmin(password);
    
    if (!isValid) {
      throw new UnauthorizedException('Invalid admin credentials');
    }
    
    const payload = { sub: 'admin', username: 'admin' };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} 