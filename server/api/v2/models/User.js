// user models using postgresql goes here
import pool from './dbConfig';

// create table if not created
const userSchema = `CREATE TABLE IF NOT EXISTS
userStore(
  userId VARCHAR(100) PRIMARY KEY NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  jobRole VARCHAR(30),
  department VARCHAR(30),
  address VARCHAR(30),
  createdOn timestamptz NOT NULL
)`;
pool.query(userSchema, (error, results) => {
  if (error) return console.log(error);
  // table is created
});

class User {
  constructor(userId, firstName, lastName, email, password, gender, jobRole, department,
    address, createdOn) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.jobRole = jobRole;
    this.department = department;
    this.address = address;
    this.createdOn = createdOn;
  }

  // create new user
  createUser() {
    const query = `INSERT INTO userStore(userId, firstName, lastName, email, password, gender, jobRole, department,
    address, createdOn) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING userId,firstName, lastName,
    email,gender, jobRole, department, address, createdOn`;
    const values = [this.userId, this.firstName, this.lastName, this.email, this.password,
      this.gender, this.jobRole, this.department, this.address, this.createdOn];
    return pool.query(query, values);
  }

  // find user by email
  static findUserEmail(emailFromUser) {
    return pool.query('SELECT * FROM userStore WHERE email=$1', [emailFromUser]);
  }
}


export default User;
