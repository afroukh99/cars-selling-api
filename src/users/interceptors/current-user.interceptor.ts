import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";






@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {


    constructor(private userService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const req = context.switchToHttp().getRequest()
        const {userId} = req.session || {};
        if (userId) {
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }

        return handler.handle();
    }
}