// src/auth/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly roleId: number) {}

  canActivate(context: ExecutionContext): boolean {
    console.log("RolesGuard - canActivate");
    
    const request = context.switchToHttp().getRequest();
    const user = request.user; // make sure you populate this via AuthGuard
    console.log("GUARD", user, user.role, this.roleId, user.role === this.roleId);

    if (!user) return false;

    return user.role === this.roleId;
  }
}

export function RoleGuard(roleId: number) {
    console.log("INIT FUNCTION", roleId);
    return new RolesGuard(roleId);
}
