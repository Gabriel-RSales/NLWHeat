import { serverHttp } from "./app";

const port = process.env.PORT || 3000;

serverHttp.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));