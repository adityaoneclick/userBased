"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const register_entity_1 = require("./entities/register.entity");
const typeorm_2 = require("typeorm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(registerRepository) {
        this.registerRepository = registerRepository;
    }
    async getUser(id) {
        const User = await this.registerRepository.findOne({
            where: { id: id },
        });
        if (User) {
            return {
                message: 'User Found',
                data: { email: User.email, name: User.name },
            };
        }
        else {
            return {
                message: 'Not Found',
            };
        }
    }
    async registerUser(Users) {
        const existingUser = await this.registerRepository.findOne({
            where: { email: Users.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        if (Users.password === Users.confirmPassword) {
            Users.password = bcrypt.hashSync(Users.password, 10);
            return {
                message: 'User Registered',
                data: await this.registerRepository.save(Users),
            };
        }
        else {
            throw new common_1.UnauthorizedException('Passwords are not matching!!');
        }
    }
    async loginUser(UserData) {
        const validatedUser = await this.registerRepository.findOne({
            where: { email: UserData.email },
        });
        if (validatedUser &&
            bcrypt.compareSync(UserData.password, validatedUser.password)) {
            const token = jwt.sign({ email: UserData.email }, JSON.stringify(process.env.SECRET_KEY), { expiresIn: 60 * 5 });
            UserData.token = `Bearer ${token}`;
            return {
                message: 'Login Successful',
                data: { email: UserData.email, token: UserData.token },
            };
        }
        else {
            throw new common_1.NotFoundException('Invalid Credentials');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(register_entity_1.Register)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map