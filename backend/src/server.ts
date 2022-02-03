import { serverHttp } from "./app";

const port = 3636;

serverHttp.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));