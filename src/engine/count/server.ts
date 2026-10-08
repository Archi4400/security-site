import config from '../load-config';
import { createCountUp } from './getters';

export const countUp = createCountUp(config);
