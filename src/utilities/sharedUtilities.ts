import path from 'path'

type RequestConfiguration = {
  theme: string;
  title: string;
  subtitle: string;
  custom: boolean;
  template: string;
};

type IncomingConfiguration = {
  theme?: string;
  title?: string;
  subtitle?: string;
  custom?: boolean;
  filePath?:string;
}

export const getRequiredConfiguration = (data: IncomingConfiguration): RequestConfiguration => {
  const finalConfig = {
    theme: data.theme ? data.theme : 'light',
    title: data.title ? data.title : 'With love from SRMKZILLA',
    subtitle: data.subtitle ? data.subtitle : '@srmkzilla',
    custom: data.custom ? data.custom : false,
    template: getTemplateFile(data.custom,data.filePath,data.theme)
  };

  return finalConfig;
};

const getTemplateFile = (custom?:boolean, filePath?:string, theme?:string): string=>{
  if(custom){
    return filePath;
  }
  else{
    return path.join(__dirname,"..","assets",theme==='dark'?"default-dark.png":"default-light.png");
  }
}
