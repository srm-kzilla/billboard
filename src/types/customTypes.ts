export type RequestConfiguration = {
  theme: string;
  title: string;
  subtitle: string;
  custom: boolean;
  template: string;
};

export type IncomingConfiguration = {
  theme?: string;
  title?: string;
  subtitle?: string;
  custom?: boolean;
  filePath?: string;
};
