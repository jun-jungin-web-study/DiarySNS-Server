export enum SERVE_MODE {
  TEST,
  DEV
}

export interface SERVER_CONFIG {
  port: number;
  mode: SERVE_MODE;
}
