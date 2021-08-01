import App from "./app";
import { ServerStatus } from "./types/types";
import { SERVER_CONFIG } from "./config/env";
import { createConnection } from "typeorm";
import { connectionOptions } from "./config/ormconfig";

const PORT = SERVER_CONFIG.SERVER_PORT;

const serve = async (): Promise<void> => {
  const connection = await createConnection(
    connectionOptions(ServerStatus.DEV)
  );
  const app = new App({ status: ServerStatus.DEV }, connection);

  app.app.listen(PORT, () => app.logger?.info(`Server start on ${PORT}`));
};

serve();
