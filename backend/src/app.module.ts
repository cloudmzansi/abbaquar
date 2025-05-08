import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { ActivitiesModule } from './activities/activities.module';
// import { EventsModule } from './events/events.module';
import { ContactModule } from './contact/contact.module';
// import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    // ActivitiesModule,
    // EventsModule,
    ContactModule,
    // PhotosModule,
  ],
})
export class AppModule {} 