import bcrypt from 'bcrypt';
import { userStore, User } from '../models/User';
import { hasPassword } from '../helpers/userHelper';
import {
  success, dataCreated, notFound, badRequest, alreadyExist,
  somethingWrongErr,
} from '../helpers/messages';
import { GenerateTokens } from '../helpers/jwtAuthHelper';

const signup = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body.data;
    const encryptedPassword = hasPassword(password);
    const createdOn = new Date();
    
    const tokens = GenerateTokens(firstName, lastName, email);
    const user = new User(firstName, lastName, email, encryptedPassword, null, null,
      null, null, null, createdOn);
    // response data to requester
    const data = {
      token: tokens,
      firstName,
      lastName,
      email,
      createdOn,
    };
    const creatingUser = async () => {
      await user.createUser(); // create user
      dataCreated(data, res);
    };
    if (userStore.length === 0) {
      creatingUser();
    } else {
      if (await User.findUserEmail(email)) return alreadyExist(res);
      creatingUser();
    }
  } catch (err) {
    somethingWrongErr(res);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body.data;
  // check to see if the data repository is not emplty
  if (userStore.length === 0) return notFound(res);
  const user = new User(null, null, email, password, null, null, null, null, null);
  const userFound = await user.findUserEmail(email);
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
  try {
    const { email, password } = req.body.data;
    if (userStore.length === 0) return notFound(res);
    const userFound = await User.findUserEmail(email);
    if (!userFound) return badRequest(res);
    await bcrypt.compare(password, userFound.password, (err, result) => {
      if (!result) return badRequest(res);
      const data = {
        token: GenerateTokens(userFound.firstName, userFound.lastName, email),
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email,
      };
      success(data, res);
    });
  } catch (err) {
    somethingWrongErr(res);
  }
};

export default { signup, signin };
