import * as path from 'path';
import { IConfig } from './config.interface';

export const baseConfig: IConfig = {
  nest: {
    port: 1234,
    globalPrefix: '/outer/api',
  },
  temporary: {
    path: path.join(__dirname, '../../temporary'),
  },
  template: {
    path: path.join(__dirname, '../../template/'),
  },
  questions: {
    path: path.join(__dirname, '../../questions'),
  },
};
