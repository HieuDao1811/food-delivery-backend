import { Sequelize } from 'sequelize';
import { config } from '../component/config';

export const sequelize = new Sequelize( config.mysql as any );