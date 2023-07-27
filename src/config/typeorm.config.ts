import {TypeOrmModuleOptions} from "@nestjs/typeorm"
import {ConfigModule} from "@nestjs/config"

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: "postgres",
    host : 'localhost',
    username : 'mnigina',
    port: 5432,
    password : 'password1',
    database: "agro_graphql",
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
}
