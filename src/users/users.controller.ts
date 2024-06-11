import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from './user.entity';
import { AuthGuard } from './guards/auth.guard';




@Controller('auth')
@Serialize(UserDto)
export class UsersController {


  constructor(private usersService: UsersService, private authService: AuthService) { }



  @Get("/currentUser")
  getCurrentUser(@CurrentUser() user: User) {
    return user
  }





  @Get()
  async getUsers() {
    return await this.usersService.getUsers()
  }



  @Get("/:id")
  @UseGuards(AuthGuard)
  async getUser(@Param("id") id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException("User not found")
    } else {
      return user
    }
  }



  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.usersService.delete(parseInt(id))
  }


  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(parseInt(id), payload);
  }



  @Post("logout")
  logout(@Session() session: any) {
    session.userId = null;
  }

 


  @Post("signup")
  async signup(@Body() payload: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(payload.username, payload.email, payload.password)
    session.userId = user.id;
    return user;
  }

  @Post("login")
  async signin(@Body() payload: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(payload.email, payload.password);
    session.userId = user.id;
    return user
  }



}
