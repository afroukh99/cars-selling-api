import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import {  plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { UserDto } from "src/users/dtos/user.dto";



interface ClassConstructor {
    new (...args : any[]) : {};
}


//Custom Decorator function
export function Serialize (dto : ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}



export class SerializeInterceptor implements NestInterceptor {


    constructor (private dto : ClassConstructor) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map(((data: any) => {
                 return plainToClass(this.dto, data , {
                    excludeExtraneousValues : true
                 })
            }))
        )
    }
}