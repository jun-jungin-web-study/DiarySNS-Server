import App from "./app";
import { SERVER_CONFIG } from "./config/serverconfig";
import { createConnection } from "typeorm";
import { connectionOptions } from "./config/ormconfig";
import logger from "./middleware/logger";
import { DB } from "./config/dbcconfig";

const PORT = SERVER_CONFIG.SERVER_PORT;

const serve = async (): Promise<void> => {
  const connection = await createConnection(connectionOptions(DB.DEV));
  const app = new App(connection);
  app.app.listen(PORT, () => logger?.info(`Server start on ${PORT}`));
};

serve();
