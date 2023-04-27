export interface IConfig {
  nest: INestConfig;
  temporary: ITemporary;
  template: ITemplate;
  questions: IQuestions;
}

export interface INestConfig {
  port: number;
  globalPrefix: string;
}

export interface ITemporary {
  path: string;
}

export interface ITemplate {
  path: string;
}

export interface IQuestions {
  path: string;
}
