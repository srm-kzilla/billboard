type RequestConfiguration = {
  theme: string;
  title: string;
  subtitle: string;
  custom: boolean;
};

const getRequiredConfiguration = (data: any): RequestConfiguration => {
  const finalConfig = {
    theme: data.theme ? data.theme : 'white',
    title: data.title ? data.title : 'With love from SRMKZILLA',
    subtitle: data.subtitle ? data.subtitle : '@srmkzilla',
    custom: data.custom ? data.custom : false,
  };

  return finalConfig;
};

export default getRequiredConfiguration;
