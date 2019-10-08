import bcrypt from 'bcrypt';
import uuid from 'uuid/v1';
import User from '../models/User';
import { hasPassword } from '../helpers/userHelper';
import {
  success, dataCreated, notFound, alreadyExist,
  somethingWrongErr,
} from '../helpers/messages';
import { GenerateTokens } from '../helpers/jwtAuthHelper';

const signup = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const user = new User(uuid(), firstName, lastName, email, hasPassword(password), null, null,
      null, null, new Date());
    // response data to requester
    const result = await User.findUserEmail(email);
    if (result.rows.length !== 0) return alreadyExist(res);
    const creatingUser = await user.createUser(); // do something with user data from RETURNING
    if (!creatingUser) return somethingWrongErr(res);
    const data = { // data from postgresql RETURNING
      token: GenerateTokens(firstName, lastName, email),
      userId: creatingUser.rows[0].userid,
      firstName: creatingUser.rows[0].firstname,
      lastName: creatingUser.rows[0].lastname,
      email: creatingUser.rows[0].email,
      createdOn: creatingUser.rows[0].createdon,
    };
    dataCreated(data, res);
  } catch (err) {
    somethingWrongErr(res);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findUserEmail(email);
    if (userFound.rows.length === 0) return notFound(res);
    await bcrypt.compare(password, userFound.rows[0].password, (err, result) => {
      if (!result) return notFound(res);
      const data = {
        token: GenerateTokens(userFound.rows[0].firstName, userFound.rows[0].lastName, email),
        firstName: userFound.rows[0].firstName,
        lastName: userFound.rows[0].lastName,
        email,
      };
      success(data, res);
    });
  } catch (err) {
    somethingWrongErr(res);
  }
};

export default { signup, signin };
