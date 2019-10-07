import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../app';
import { User} from '../models/User';

chai.use(chaiHttp);
const { expect } = chai;
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
          },
        })
        .end((err, res) => {
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
    const url = '/api/v1/auth/signin';
    it('should not signin when email is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            email: '',
            password: '123435',
          },
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when email is not not valid ie kose@gmail', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            email: 'kose@gmail',
            password: '123435',
          },
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when password is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            email: 'kose@gmail.com',
            password: '',
          },
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when unregistered email is provided', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            email: 'None@gmail.com',
            password: '123435',
          },
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not signin when wrong password is provided', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            email: 'kose@gmail.com',
            password: '123435000',
          },
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should signin when everything is ok', (done) => {
      chai
        .request(app)
        .post(url)
        .send({
          data: {
            email: 'kose@gmail.com',
            password: '123435',
          },
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
