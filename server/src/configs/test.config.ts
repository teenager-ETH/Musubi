import { merge } from 'lodash';

import { baseConfig } from './base.config';
import { IConfig } from './config.interface';

// 测试环境
export default merge({}, baseConfig, {} as IConfig);
