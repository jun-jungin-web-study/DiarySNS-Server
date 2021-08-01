export enum ServerStatus {
  TEST,
  DEV
}

export interface ServerOptions {
  status: ServerStatus;
}
