import Groundwork from "./Groundwork";

function groundworkFactory(services) {
  return function lambda(opts) {
    return new Groundwork(services, opts);
  };
}

export default groundworkFactory;
