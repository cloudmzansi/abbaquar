import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  private readonly allowedEmails = [
    'andrewmichaelsrsa@gmail.com',
    // Add more authorized emails here when needed
  ];

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: config.get('SMTP_HOST'),
      port: config.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: config.get('SMTP_USER'),
        pass: config.get('SMTP_PASS'),
      },
    });
  }

  async sendMagicLink(email: string): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if email is authorized
    if (!this.allowedEmails.includes(normalizedEmail)) {
      throw new UnauthorizedException('This email is not authorized to access the dashboard');
    }

    // Get or create user
    let user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          role: 'ADMIN', // Since we're only allowing authorized emails, they're all admins
        },
      });
    }

    // Generate token
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Save magic link
    await this.prisma.magicLink.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Generate JWT token that includes the magic link token
    const magicLinkToken = jwt.sign(
      { token },
      this.config.get('JWT_SECRET'),
      { expiresIn: '30m' },
    );

    // Create magic link URL
    const magicLinkUrl = `${this.config.get('FRONTEND_URL')}/auth/verify?token=${magicLinkToken}`;

    // Send email
    await this.transporter.sendMail({
      from: this.config.get('SMTP_FROM'),
      to: normalizedEmail,
      subject: 'Your Magic Link for Abbaquar-san Dream Centre Dashboard',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #073366;">Login to Dashboard</h2>
          <p>Click the button below to log in to your dashboard. This link will expire in 30 minutes.</p>
          <a href="${magicLinkUrl}" 
             style="display: inline-block; background-color: #073366; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 4px; 
                    margin: 20px 0;">
            Login to Dashboard
          </a>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this login link, please ignore this email.
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is a secure admin access link. Please do not share it with anyone.
          </p>
        </div>
      `,
    });

    return { message: 'Magic link sent successfully' };
  }

  async verifyMagicLink(token: string): Promise<{ accessToken: string }> {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, this.config.get('JWT_SECRET')) as { token: string };
      
      // Find magic link
      const magicLink = await this.prisma.magicLink.findUnique({
        where: { token: decoded.token },
        include: { user: true },
      });

      if (!magicLink || magicLink.usedAt || magicLink.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid or expired magic link');
      }

      // Mark magic link as used
      await this.prisma.magicLink.update({
        where: { id: magicLink.id },
        data: { usedAt: new Date() },
      });

      // Update user's last login
      await this.prisma.user.update({
        where: { id: magicLink.userId },
        data: { lastLoginAt: new Date() },
      });

      // Generate access token
      const accessToken = jwt.sign(
        {
          userId: magicLink.user.id,
          email: magicLink.user.email,
          role: magicLink.user.role,
        },
        this.config.get('JWT_SECRET'),
        { expiresIn: '1d' },
      );

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired magic link');
    }
  }
} 