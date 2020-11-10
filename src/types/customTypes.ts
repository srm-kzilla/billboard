export type RequestConfiguration = {
  theme: string;
  title: string;
  subtitle: string;
  custom: boolean;
  template: string;
  fontSize: string;
  fileType: string;
};

export type IncomingConfiguration = {
  theme?: string;
  title?: string;
  subtitle?: string;
  custom?: string;
  filePath?: string;
  fontSize?: string;
  fileType?: string;
};
