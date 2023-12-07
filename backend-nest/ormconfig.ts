/* eslint-disable prettier/prettier */
 
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { User } from 'src/entities/user.entity';
 
const config: MysqlConnectionOptions = {
  type: 'mysql', // ajustado para MySQL
  database: 'testedb',
  host: 'localhost',
  port: 3306, // porta padrão para MySQL
  username: 'root',
  password: '',
  entities: [User],
  synchronize: true,
};

export default config;
