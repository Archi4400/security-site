import config from '../load-config';
import { createFlags } from './sprite';

export const { flagHref } = createFlags(config.i18n.languages);
