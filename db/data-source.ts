import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../src/users/entities/user.entity";
import { Blog } from "../src/blogs/entities/blog.entity";
import { config } from "dotenv";
import { Comment } from "../src/comments/entities/comment.entity";
import { Category } from "../src/categories/entities/category.entity";
import { Role } from "../src/roles/entities/role.entity";
import { Permission } from "../src/permissions/entities/permission.entity";
import { RolePermission } from "../src/roles/entities/role-permission.entity";

// .env config 
config({ path: process.env.NODE_ENV !== "production" ? `.env.${process.env.NODE_ENV || "development"}` : ".env" });


// data source options 
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    entities: [User, Blog, Comment, Category, Role, Permission, RolePermission],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
