// helper functions for response messages

// joi validation error messages
const joiError = (errorFound, res) => {
  res.status(400).json({ status: 400, error: errorFound.details[0].message });
};

const success = (data, res) => {
  res.status(200).json({ status: 200, message: 'Operation successful', data });
};

const dataCreated = (data, res) => {
  res.status(201).json({ status: 201, error: 'Operation successful, data created', data });
};
const notFound = (res) => {
  res.status(404).json({ status: 404, error: 'resource not found' });
};

const accessDenied = (res) => {
  res.status(401).json({ status: 401, error: 'operation denied, please ensure you provide correct credentials ' });
};

const alreadyExist = (res) => {
  res.status(409).json({ status: 409, error: 'data already exist , please try with new credentials' });
};

export {
  success, dataCreated, notFound, accessDenied, alreadyExist, joiError,
};
