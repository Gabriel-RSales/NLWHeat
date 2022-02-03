import { serverHttp } from "./app";

const port = process.env.PORT | 3636;

serverHttp.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));