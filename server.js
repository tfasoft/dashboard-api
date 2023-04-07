import app from "./app/index.js";

import { appConfig } from "$app/config/index.js";
app.listen(appConfig.port, () => {
  console.log(`Connected. Running in ${appConfig.port}`);
});
