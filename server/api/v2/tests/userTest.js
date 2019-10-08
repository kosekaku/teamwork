import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../app';
import pool from '../models/dbConfig';

chai.use(chaiHttp);
const { expect } = chai;
describe('User /api/v2/auth/', () => {
  // signup test cases
  describe('POST /signup', () => {
    const url = '/api/v2/auth/signup';
    it('should not create when first name field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          firstName: '',
          lastName: 'uk45',
          email: 'kose@gmail.com',
          password: '123435',
        })
        .end((err, res) => {
          expect(res.body.error).to.equals('"firstName" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when last name field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          firstName: 'kose',
          lastName: '',
          email: 'kose@gmail.com',
          password: '123435',
        })
        .end((err, res) => {
          expect(res.body.error).to.equals('"lastName" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when email field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          firstName: 'kose',
          lastName: 'uk45',
          email: '',
          password: '123435',
        })
        .end((err, res) => {
          expect(res.body.error).to.equals('"email" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create user when password field is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          firstName: 'kose',
          lastName: 'uk45',
          email: 'kose@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res.body.error).to.equals('"password" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });

    // delete data that already exist such that no conflict arise
    before(async () => {
      await pool.query('DELETE FROM userStore WHERE email = $1', ['kose@gmail.com']);
    });
    it('should create user when all fields are correctly filled', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          firstName: 'kose',
          lastName: 'uk45',
          email: 'kose@gmail.com',
          password: '123435',
        })
        .end((err, res) => {
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data.firstName).to.equal('kose');
          expect(res.body.data.lastName).to.equal('uk45');
          expect(res.body.data.email).to.equal('kose@gmail.com');
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not create user when email already exist', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          firstName: 'kose',
          lastName: 'uk45',
          email: 'kose@gmail.com',
          password: '123435',
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('data already exist , please try with new credentials');
          expect(res).to.have.status(409);
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
  });

  // signin test case
  describe('POST /signin', () => {
    const url2 = '/api/v2/auth/signin';
    it('should not signin when email is empty', (done) => {
      chai
        .request(app)
        .post(url2)
        .send({
          email: '',
          password: '123435',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when email is not not valid ie kose@gmail', (done) => {
      chai
        .request(app)
        .post(url2)
        .send({
          email: 'kose@gmail',
          password: '123435',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when password is empty', (done) => {
      chai
        .request(app)
        .post(url2)
        .send({
          email: 'kose@gmail.com',
          password: '',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when unregistered email is provided', (done) => {
      chai
        .request(app)
        .post(url2)
        .send({
          email: 'None@gmail.com',
          password: '123435',
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should not signin when wrong password is provided', (done) => {
      chai
        .request(app)
        .post(url2)
        .send({
          email: 'kose@gmail.com',
          password: '12343500000',
        })
        .end((error, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should signin when everything is ok', (done) => {
      chai
        .request(app)
        .post(url2)
        .send({
          email: 'kose@gmail.com',
          password: '123435',
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
