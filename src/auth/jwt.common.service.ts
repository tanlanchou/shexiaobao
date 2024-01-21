import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/connect/User';
import { UserService } from 'src/service/user.service';

@Injectable()
export class JwtCommonService {
  private readonly logger = new Logger(JwtService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateToken(user: User): string {
    const payload = { user };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Generated token for user ${user.id}`);
    return token;
  }

  verifyToken(token: string): any {
    try {
      const payload = this.jwtService.verify(token);
      this.logger.log(`Verified token: ${token}`);
      return payload;
    } catch (error) {
      this.logger.error(`Failed to verify token: ${token}`);
      return null;
    }
  }

  decodeToken(token: string): any {
    try {
      const payload = this.jwtService.decode(token);
      this.logger.log(`Decode token: ${token}, result: ${payload}`);
      return payload;
    } catch (error) {
      this.logger.error(`Failed to decode token: ${token}`);
      return null;
    }
  }

  async refreshToken(token: string): Promise<string> {
    const payload = this.verifyToken(token);
    if (payload) {
      delete payload.exp;
      const user = await this.userService.findUserById(payload.id);
      if (!user) {
        throw new Error(
          `更新令牌时，查询用户出错, 用户电话${payload.phoneNumber}`,
        );
      }
      const newToken = this.jwtService.sign({ user });
      this.logger.log(`Refreshed token for user ${payload.userId}`);
      return newToken;
    }
    this.logger.error(`Failed to refresh token for token: ${token}`);
    return null;
  }
}
