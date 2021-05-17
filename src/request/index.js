import { CreateRequest, cache } from "./request";

export default CreateRequest().use(new cache()).generate();
