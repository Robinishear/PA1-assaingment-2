import app from "./app.js";
import config from "./config/index.js";

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});
