// import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;
// test cases goes here
describe('User /api/v1/auth/', () => {
  // signup test cases
  describe('POST /signup', () => {
    const url = '/api/v1/auth/signup';

    it('should not create when first name field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: '',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when last name field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: '',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when email field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: '',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when password field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when gender field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: '',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when jobRole field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: '',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when department field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: '',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when phone number field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when addres field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: '',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });


    it('should create user when all fields are correctly filled', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not create user when email already exist', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });

    it('should create user when all fields are correctly filled and array is not empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            firstName: 'kose',
            lastName: 'uk45',
            email: 'kose2@gmail.com',
            password: '123435',
            gender: 'Male',
            jobRole: 'Developer',
            department: 'Engineering',
            phoneNumber: '+12123',
            address: 'KG 101 EAST',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    // resource url is wrong
    it('should return "not found" error when non existing routes is called', (done) => {
      const wrongURL = '/api/v1/auth/signup/someRouteNotExisting';
      chai
        .request(app)
        .post(wrongURL)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    // check if server is running, test app.json BLOCKER
  });
});
