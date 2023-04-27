import { merge } from 'lodash';

import { baseConfig } from './base.config';
import { IConfig } from './config.interface';

// 线上生产
export default merge({}, baseConfig, {} as IConfig);
