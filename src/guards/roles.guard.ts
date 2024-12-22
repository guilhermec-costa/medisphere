import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if(!roles) return true;

    const req = context.switchToHttp().getRequest();

    req.user = {}
    req.user.roles = [
      "admin",
      "common"
    ];

    return matchRoles(roles, req.user);
  }
}

function matchRoles(requiredRoles: string[], user:{roles: string[]}) {
  return user.roles.some((role) => requiredRoles.includes(role));
}