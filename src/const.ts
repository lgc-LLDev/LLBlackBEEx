import { description, version } from '../package.json';

export const PLUGIN_NAME = 'LLBlackBEEx';
export const PLUGIN_VERSION = <[number, number, number]>(
  version.split('.').map((v) => Number(v))
);
export const PLUGIN_DESCRIPTION = description;
export const PLUGIN_EXTRA = {
  Author: 'student_2333',
  License: 'Apache-2.0',
};

logger.setTitle(PLUGIN_NAME);
logger.setFile(`logs/${PLUGIN_NAME}.log`);

export const DATA_PATH = `data/${PLUGIN_NAME}`;
if (!file.exists(DATA_PATH)) file.mkdir(DATA_PATH);

export const DIVIDING_LINE = '-=-=-=-=-=-=-=-=-=-=-=-=-=-';
