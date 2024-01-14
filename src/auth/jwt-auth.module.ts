import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dasdasdasdasdqweqweqw',
      signOptions: {
        expiresIn: '60h',
      },
    }),
  ],
  controllers: [],
  exports: [JwtModule],
})
export class JwtAuthModule {}
