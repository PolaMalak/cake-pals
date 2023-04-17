import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalBakerAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtBakerAuthGuard extends AuthGuard('bakers-jwt') {}
