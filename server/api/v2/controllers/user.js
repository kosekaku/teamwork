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
    const result = await User.findUserEmail(email);
    if (result.rows.length !== 0) return alreadyExist(email, res);
    const creatingUser = await user.createUser(); // do something with user data from RETURNING
    if (!creatingUser) return somethingWrongErr(res);
    const data = { // data from postgresql RETURNING
      token: GenerateTokens(creatingUser.rows[0].userid, firstName, lastName, email),
      // get data using spread operator
      ...creatingUser.rows[0],
    };
    dataCreated(data, res);
  } catch (err) {
    somethingWrongErr(res);
  }
};

const signin = async (req, res) => {
  try {
    const { email } = req.body;
    const passwordFromUser = req.body.password;
    const userFound = await User.findUserEmail(email);
    if (userFound.rows.length === 0) return notFound(res);
    await bcrypt.compare(passwordFromUser, userFound.rows[0].password, (err, result) => {
      if (!result) return notFound(res);
      // using destructuring and spread to get data but exclude password in response
      const { password, ...allColumns } = userFound.rows[0];
      const data = {
        token: GenerateTokens(allColumns.userid, allColumns.firstname, allColumns.lastname,
          allColumns.email),
        ...allColumns,
      };
      success(data, res);
    });
  } catch (err) {
    somethingWrongErr(res);
  }
};

export default { signup, signin };
