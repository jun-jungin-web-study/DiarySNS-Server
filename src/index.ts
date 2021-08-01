import App from "./app";
import { ServerStatus } from "./types/types";

const app = new App({ status: ServerStatus.DEV });

app.app.listen(3000, () => app.logger?.info("Server start on 3000"));
