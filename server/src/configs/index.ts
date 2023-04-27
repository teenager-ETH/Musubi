export type { IConfig } from './config.interface';
import { IConfig } from './config.interface';
import development from './dev.config';
import production from './prod.config';
import test from './test.config';

const map: Record<string, IConfig> = {
  development,
  production,
  test,
};

export const config = () => map[process.env.NODE_ENV!] ?? test;
