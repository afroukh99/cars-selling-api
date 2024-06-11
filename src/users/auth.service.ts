import { BadRequestException, Injectable, NotFoundException, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _script } from "crypto";
import { promisify } from "util";


const script = promisify(_script)


@Injectable()
export class AuthService {

    constructor(private userService: UsersService) { }


    async signup(username: string, email: string, password: string) {

        const users = await this.userService.find(email);

        if (users.length > 0) {
            throw new BadRequestException("Email already in use")
        }

        //Hash the users  password
        //Generate a salt
        const salt = randomBytes(8).toString("hex");

        // Hash the salt and the password together
        const hash = (await script(password, salt, 16)) as Buffer;

        // Join the hash with the salt
        const result = hash.toString("hex") + "." + salt;

        //Save the user to the database
        const savedUser = await this.userService.create(email, username, result)

        return savedUser;


    }



    async signin (email: string, password: string) {

        const [userExist] = await this.userService.find(email);

        if (!userExist) {
            throw new NotFoundException("user not found");
        }

        //Retrieve the sal and hashed password from DB
        const [storedPassword, salt] = userExist.password.split(".")

        // Hash the salt and the password together
        const hash = (await script(password, salt, 16)) as Buffer;



        if (hash.toString("hex") !== storedPassword) {
            throw new BadRequestException("Invalid password")
        }


        return userExist;


    }

}