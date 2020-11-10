import { join } from 'path';
import { IncomingConfiguration, RequestConfiguration } from '../types/customTypes';

export const getRequiredConfiguration = (data: IncomingConfiguration): RequestConfiguration => {
  const finalConfig = {
    theme: data.theme ? data.theme : 'light',
    title: data.title ? data.title : 'With love from SRMKZILLA',
    subtitle: data.subtitle ? data.subtitle : '@srmkzilla',
    custom: data.custom ? data.custom : false,
    template: getTemplateFile(data.custom, data.filePath, data.theme),
  };

  return finalConfig;
};

const getTemplateFile = (custom?: boolean, filePath?: string, theme?: string): string => {
  if (custom) {
    return filePath;
  } else {
    return join(__dirname, '..', 'assets', theme === 'dark' ? 'default-dark.png' : 'default-light.png');
  }
};
