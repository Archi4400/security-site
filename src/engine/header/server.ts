import config from '../load-config';
import { i18n } from '../i18n/server';
import { createHeader } from './getters';

export const header = createHeader(config, i18n.label);
