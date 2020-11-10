import { join } from 'path';
import { IncomingConfiguration, RequestConfiguration } from '../types/customTypes';

export const getRequiredConfiguration = (data: IncomingConfiguration): RequestConfiguration => {
  const finalConfig = {
    theme: data.theme ? data.theme : 'light',
    title: data.title ? data.title : 'With love from SRMKZILLA',
    subtitle: data.subtitle ? data.subtitle : '@srmkzilla',
    custom: data.custom ? ((<unknown>data.custom) as boolean) : false,
    template: getTemplateFile(data.custom, data.filePath, data.theme),
  };

  return finalConfig;
};

const getTemplateFile = (custom?: string, filePath?: string, theme?: string): string => {
  if (custom === 'true') {
    return filePath;
  } else {
    return join(__dirname, '..', 'assets', theme === 'dark' ? 'default-dark.png' : 'default-light.png');
  }
};

export const getHtmlCode = async (config: RequestConfiguration): Promise<void> => {
  console.log(config);
};
