// logics for handling user operations
// import uuidv1 from 'uuid/v1';
import bcrypt from 'bcrypt';
import { userStore, User } from '../models/User';
import { hasPassword } from '../helpers/userHelper';
import {
  success, dataCreated, notFound, accessDenied, alreadyExist,
} from '../helpers/messages';
import { GenerateTokens } from '../helpers/jwtAuthHelper';

const signup = async (req, res) => {
  // get user data from request body
  const {
    firstName, lastName, email, password, gender, jobRole, department,
    phoneNumber, address,
  } = req.body.data;
  const encryptedPassword = hasPassword(password);
  // const id = uuidv1();commentted out as id is not really necessary,email can work on it place
  const createdOn = new Date();
  const tokens = GenerateTokens(firstName, lastName, email);
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
    // send response to the requester
    // res.header('authorizes', tokens).status(201).json({ status: 'success' });
    dataCreated(data, res);
  };
  if (userStore.length === 0) {
    // user is created when the data store is empty
    creatingUser();
  } else {
    // check if user with given email already exist
    if (user.findUserEmail()) return alreadyExist(res);
    // create new  user, when arry is not empty and email doesn't exist
    creatingUser();
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body.data;
  // check to see if the data repository is not emplty
  if (userStore.length === 0) return notFound(res);
  const user = new User(null, null, email, password, null, null, null, null, null);
  const userFound = user.findUserEmail(email);
  if (!userFound) return accessDenied(res);
  // check password match
  bcrypt.compare(password, userFound.password, (err, result) => {
    if (!result) return accessDenied(res);
    // send success response
    const data = {
      token: GenerateTokens(userFound.firstName, userFound.lastName, email),
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email,
      jobRole: userFound.jobRole,
      password: userFound.password,
    };
    success(data, res);
  });
};

export default { signup, signin };
