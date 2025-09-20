"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.serverHttp.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
