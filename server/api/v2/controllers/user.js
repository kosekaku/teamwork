import bcrypt from 'bcrypt';
import uuid from 'uuid/v1';
import  User  from '../models/User';
import { hasPassword } from '../helpers/userHelper';
import {
  success, dataCreated, notFound, badRequest, alreadyExist,
  somethingWrongErr,
} from '../helpers/messages';
import { GenerateTokens } from '../helpers/jwtAuthHelper';
import { serverExceptions } from '../../v1/helpers/messages';

const signup = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const user = new User(uuid(), firstName, lastName, email, hasPassword(password), null, null,
    null, null, new Date());
    // response data to requester
      const result = await User.findUserEmail(email);
      if(result.rows.length !== 0) return alreadyExist(res);
      const creatingUser = await user.createUser(); // create user and do something with data from RETURNING
      if(!creatingUser) return somethingWrongErr(res)
      const data = { //data from postgresql RETURNING 
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
