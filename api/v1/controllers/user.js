// logics for handling user operations
// import uuidv1 from 'uuid/v1';
import { userStore, User } from '../models/User';
import { hasPassword, generateTokens } from '../helpers/userHelper';

const signup = async (req, res) => {
  // get user data from request body
  const {
    firstName, lastName, email, password, gender, jobRole, department,
    phoneNumber, address,
  } = req.body.data;
  const encryptedPassword = hasPassword(password);
  const tokens = generateTokens(email);
  // const id = uuidv1();commentted out as id is not really necessary,email can work on it place
  const createdOn = new Date();
  // create new obj to hold the data to put into the data store
  const user = new User(firstName, lastName, email, encryptedPassword, gender, jobRole,
    department, phoneNumber, address, createdOn);
  // response data to requester
  const data = {
    token: tokens,
    firstName,
    lastName,
    email,
    password: encryptedPassword,
    gender,
    jobRole,
    department,
    phoneNumber,
    address,
  };
  // create new user and send response
  const creatingUser = async () => {
    await user.createUser(); // create user
    res.status(201).json({ // send response to the requester
      status: 201,
      message: 'user successfuly been created',
      data,
    });
  };
  if (userStore.length === 0) {
    // user is created when the data store is empty
    creatingUser();
  } else {
    // check if user with given email already exist
    if (user.findUserEmail()) return res.status(409).json({ status: 409, error: 'email already exist, use another one' });
    // create new  user, when arry is not empty and email doesn't exist
    creatingUser();
  }
};

export default { signup };
