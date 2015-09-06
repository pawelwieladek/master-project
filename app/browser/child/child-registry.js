import Registry from "../common/registry";
import childHandlers from "./child-handlers";

let childRegistry = new Registry();

childRegistry.use(childHandlers);

export default childRegistry;