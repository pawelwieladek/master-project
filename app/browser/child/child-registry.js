import Registry from "../common/registry";
import childHandlers from "../handlers/child-handlers";

let childRegistry = new Registry();

childRegistry.use(childHandlers);

export default childRegistry;