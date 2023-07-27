import {TypeOrmModuleOptions} from "@nestjs/typeorm"
import {ConfigModule} from "@nestjs/config"
import {HOST, DB, PASSWORD,USERNAME, PORT} from "../../env"

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: "postgres",
    host : HOST,
    username : USERNAME,
    port: PORT,
    password : PASSWORD,
    database: DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
}
