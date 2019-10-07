// user models using postgresql goes here
import pool from './dbConfig';

// create table if not created
const userSchema = `CREATE TABLE IF NOT EXISTS
userStore(
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(30) PRIMARY KEY NOT NULL,
  password VARCHAR(100) NOT NULL,
  createdOn VARCHAR NOT NULL
)`;
pool.query(userSchema, (error, results) => {
  if (error) return console.log(error);
  // table is created
});

class User {
  constructor(firstName, lastName, email, password, createdOn) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdOn = createdOn;
  }

  // create new user
  createUser() {
    const query = 'INSERT INTO userStore(firstName, lastName, email, password, createdOn) VALUES($1, $2, $3, $4, $5)';
    const values = [this.firstName, this.lastName, this.email, this.password, this.createdOn];
    return pool.query(query, values);
  }

  // find user by email
  static findUserEmail(emailFromUser) {
    return pool.query('SELECT * FROM userStore WHERE email=$1', [emailFromUser]);
  }
}


export default User;
