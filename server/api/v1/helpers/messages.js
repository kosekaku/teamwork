// helper functions for response messages

// joi validation error messages
const joiError = (errorFound, res) => {
  res.status(400).json({ status: 400, error: errorFound.details[0].message });
};
const serverExceptions = (errors, res) => {
  res.status(500).json({ status: 500, error: errors });
};

const somethingWrongErr = (res) => {
  res.status(400).json({ status: 400, error: 'something went wrong, please ensure to provide required data' });
};

const success = (data, res) => {
  res.status(200).json({ status: 200, message: 'Operation successful', data });
};

const dataCreated = (data, res) => {
  res.status(201).json({ status: 201, message: 'Operation successful, data created', data });
};
const notFound = (res) => {
  res.status(404).json({ status: 404, error: 'resource not found' });
};

const accessDenied = (res) => {
  res.status(401).json({ status: 401, error: 'operation denied, you dont have access rights ' });
};

const badRequest = (res) => {
  res.status(400).json({ status: 400, error: 'bad request, please ensure you provide correct credentials ' });
};

const alreadyExist = (res) => {
  res.status(409).json({ status: 409, error: 'data already exist , please try with new credentials' });
};

export {
  success, dataCreated, notFound, accessDenied, badRequest, alreadyExist, joiError, 
  serverExceptions,
  somethingWrongErr,
};
