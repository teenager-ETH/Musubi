import { merge } from 'lodash';

import { baseConfig } from './base.config';
import { IConfig } from './config.interface';

// 本地开发
export default merge({}, baseConfig, {} as IConfig);
