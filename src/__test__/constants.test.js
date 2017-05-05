const CONFIG_DEFAULT = {
  apiKey: "",
  apiKey: "1234",
  auth: {}
};

const TOKEN = {
  accessToken: "1.f464e4625d7e1a5dadbb3ff8cae0856fbcee84ee5b4",
  expiresIn: null,
  gwid: "0c597f3e-d5cc-4e1f-a772-38d1ffcb281e",
  tokenType: "Bearer"
};

const RESPONSE_GENERIC = {
  config: {},
  data: {},
  headers: {},
  status: 0,
  statusText: ""
};

const RESPONSE_200 = {
  status: 200,
  statusText: "OK",
  responseText: {
    wu: 1,
    tang: 2,
    clan: 3
  },
  headers: {
    "Content-Type": "application/json"
  }
};

const RESPONSE_201 = {
  status: 201,
  statusText: "Created",
  responseText: {},
  headers: {
    "Content-Type": "application/json"
  }
};

const RESPONSE_202 = {
  status: 202,
  statusText: "Accepted",
  responseText: {},
  headers: {
    "Content-Type": "application/json"
  }
};

const RESPONSE_204 = {
  status: 204,
  statusText: "No Content",
  responseText: "",
  headers: {
    "Content-Type": "text/html; charset=UTF-8"
  }
};

const RESPONSE_400 = {
  status: 400,
  statusText: "Bad Request",
  responseText: JSON.parse('{"message": "invalid_request", "code": 400}'),
  headers: {
    "Content-Type": "text/html; charset=UTF-8"
  }
};

const RESPONSE_403 = {
  status: 403,
  statusText: "FORBIDDEN",
  responseText: JSON.parse('{"detail":"Permission denied."}'),
  headers: {
    "Content-Type": "application/json"
  }
};

const RESPONSE_404 = {
  status: 404,
  statusText: "Not Found",
  responseText: JSON.parse('{"message": "not_found", "code": 404}'),
  headers: {
    "Content-Type": "text/html; charset=UTF-8"
  }
};

export {
  CONFIG_DEFAULT,
  TOKEN,
  RESPONSE_GENERIC,
  RESPONSE_200,
  RESPONSE_201,
  RESPONSE_202,
  RESPONSE_204,
  RESPONSE_400,
  RESPONSE_403,
  RESPONSE_404
};
