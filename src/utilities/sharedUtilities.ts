import { chromium } from 'playwright';
import ReactDOMServer from 'react-dom/server';
import config from '../config';
import logger from '../loaders/logger';
import { IncomingConfiguration, RequestConfiguration } from '../types/customTypes';
import Component from './reactComponent';

export const getRequiredConfiguration = (data: IncomingConfiguration): RequestConfiguration => {
  const finalConfig = {
    theme: data.theme ? data.theme : 'light',
    title: data.title ? data.title : 'With love from SRMKZILLA',
    subtitle: data.subtitle ? data.subtitle : '@srmkzilla',
    custom: data.custom ? data.custom : false,
    template: getTemplateFile(data.custom, data.filePath, data.theme),
    fontSize: data.fontSize ? data.fontSize : getFontSize(data),
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
  const htmlString = ReactDOMServer.renderToString(Component(config));
  return htmlString;
};

const getFontSize = (config: IncomingConfiguration): string => {
  const size = config.title ? config.title.length : 24;

  if (size <= 30) {
    return '120px';
  }
  return '90px';
};

export const getCssCode = (): string => {
  return `@font-face {
    font-family: bold-font;
    src: url(http://127.0.0.1:${config.port}/assets/bold.woff2);
  }

@font-face {
    font-family: book-font;
    src: url(http://127.0.0.1:${config.port}/assets/book.woff2);
  }

#title {
    width: 100%;
    text-align: center;
    margin-top: 400px;
    font-family: book-font, sans-serif;
}

#subtitle{
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 15px;
    font-size: 70px;
    font-family: bold-font, sans-serif;
}

#customText{
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 3px;
    font-size: 40px;
    font-family: 'bold', sans-serif;
}`;
};

export const getScreenshot = async (config: RequestConfiguration): Promise<Buffer> => {
  try {
    const browser = await chromium.launch({ headless: process.env.NODE_ENV !== 'development' });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 2048, height: 1170 });
    await page.setContent(await getHtmlCode(config));
    const file = await page.screenshot({ type: config.fileType === 'jpeg' ? 'jpeg' : 'png' });
    await browser.close();
    return file;
  } catch (error) {
    logger.error(error);
    throw Error('Failed to open playwright');
  }
};
