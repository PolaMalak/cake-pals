import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalUserAuthGuard extends AuthGuard('users-local') {}

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('users-jwt') {}
