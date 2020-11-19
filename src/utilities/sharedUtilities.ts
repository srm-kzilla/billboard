import { chromium } from 'playwright';
import ReactDOMServer from 'react-dom/server';
import { IncomingConfiguration, RequestConfiguration } from '../types/customTypes';
import Component from './reactComponent';

export const getRequiredConfiguration = (data: IncomingConfiguration): RequestConfiguration => {
  const finalConfig = {
    theme: data.theme ? data.theme : 'light',
    title: data.title ? data.title : 'With love from SRMKZILLA',
    subtitle: data.subtitle ? data.subtitle : '@srmkzilla',
    custom: data.custom ? data.custom : false,
    template: getTemplateFile(data.custom, data.filePath, data.theme),
    fontSize: data.fontSize ? data.fontSize : '96px',
    fileType: data.fileType ? data.fileType : 'png',
  };

  return finalConfig;
};

const getTemplateFile = (custom?: boolean, filePath?: string, theme?: string): string => {
  if (custom) {
    return filePath;
  } else {
    return theme === 'dark' ? 'default-dark.png' : 'default-light.png';
  }
};

const getHtmlCode = async (config: RequestConfiguration): Promise<string> => {
  console.log(config);
  const htmlSting = ReactDOMServer.renderToString(Component(config));
  return htmlSting;
};

export const getScreenshot = async (config: RequestConfiguration): Promise<Buffer> => {
  const browser = await chromium.launch({ headless: process.env.NODE_ENV !== 'development' });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 2048, height: 1170 });
  await page.setContent(await getHtmlCode(config));
  const file = await page.screenshot({ type: config.fileType === 'jpeg' ? 'jpeg' : 'png' });
  return file;
};
