// user models data structure goes here
const userStore = []; // this is where users are stored
class User {
  constructor(firstName, lastName, email, password, gender, jobRole, department,
    phoneNumber, address, createdOn) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.jobRole = jobRole;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.createdOn = createdOn;
  }

  createUser() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      gender: this.gender,
      jobRole: this.jobRole,
      department: this.department,
      phoneNumber: this.phoneNumber,
      address: this.address,
      createdOn: this.createdOn,
    };
    // store the new user in the userStore array
    userStore.push(data);
  }

  // find user by email
  static findUserEmail(emailFromUser) {
    const checkEmail = userStore.find( (email, index) => userStore[index].email === emailFromUser);
    return checkEmail;
  }
}


export { userStore, User };
