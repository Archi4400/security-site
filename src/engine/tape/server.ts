import { i18n } from '../i18n/server';
import { createTape } from './getters';

export const tape = createTape(i18n.label);
