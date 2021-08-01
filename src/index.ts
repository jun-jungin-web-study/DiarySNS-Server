import App from "./app";
import logger from "./middleware/logger";

const app = new App(logger);

app.run();
