// test for article operations
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import jwt from 'jsonwebtoken';
import app from '../../../../app';
import { GenerateTokens } from '../helpers/jwtAuthHelper';
import data from '../data/data';
import User from '../models/User';


chai.use(chaiHttp);
const { expect } = chai;
const { firstName, lastName, email } = data[0];
const {
  atUserId, atFirstName, atLastName, atEmail, atPassword, atCreatedOn,
} = data[4];

const { title, article } = data[5];
let tokens;
let notOwnerTokens;
let expiredToken;
describe('Article test cases /api/v2/', () => {
  // post article test
  before(async () => {
    // create new test user to avoid foreign key constraint error
    const newUser = new User(atUserId, atFirstName, atLastName, atEmail, atPassword,
      null, null, null, null, atCreatedOn);
    await newUser.createUser();
    tokens = GenerateTokens(atUserId, firstName, lastName, email);
    notOwnerTokens = GenerateTokens(2, firstName, lastName, email); // notice the id is 2
    // tokens that expires immediatly after creation
    expiredToken = jwt.sign(
      {
        atUserId,
        atFirstName,
        atLastName,
        atEmail,
      }, process.env.JWT_KEY,
      {
        expiresIn: 0,
      },
    );
  });
  after(async () => {
    // delete the test user so we can have a clean test in the next run
    await User.deleteUser(atEmail);
  });
  describe('POST /articles', () => {
    const url = '/api/v2/articles';
    it('deny access to articles route when no access tokens is provided', (done) => {
      chai
        .request(app)
        .post(url)
        // .set('x-auth-token', `Bearer ${tokens}`) dont provie access tokens
        .send({
          title,
          article,
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('operation denied, authentication failed ');
          expect(res).to.have.status(401);
          done();
        });
    });

    it('deny access to articles route  when malformed access token is given', (done) => {
      const malformedTokens = 'qeqrlkhjgmngmbnd;ghjjfgjkhsjsfgjfhdfgjgf';
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${malformedTokens}`) // json verifcation fails here during verify() at auth middleware
        .send({
          title,
          article,
        })
        .end((err, res) => {
          expect(res.body.error.message).to.equal('jwt malformed');
          expect(res).to.have.status(401);
          done();
        });
    });

    it('deny access to articles route when invalid access token is given', (done) => {
      // invalid token ie token, notice the "invalid" word prefix
      const invalidTokens = 'invalidiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJrb3NlIiwibGFzdE5hbWUiOiJ1azQ1IiwiZW1haWwiOiJrb3NlMkBnbWFpbC5jb20iLCJpYXQiOjE1Njk1MjgxMjQsImV4cCI6MTU2OTUzMTcyNH0.Lwr64IA2_8GDtxCsMCY97Y6WzQX42vvXH3XiU4SLWH4';
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${invalidTokens}`) // json verifcation fails here during verify() at auth middleware
        .send({
          title,
          article,
        })
        .end((err, res) => {
          expect(res.body.error.message).to.equal('invalid token');
          expect(res).to.have.status(401);
          done();
        });
    });

    it('deny access to articles route when expired access token is given', (done) => {
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${expiredToken}`) // json verifcation fails here during verify() at auth middleware
        .send({
          title,
          article,
        })
        .end((err, res) => {
          expect(res.body.error.message).to.equal('jwt expired');
          expect(res).to.have.status(401);
          done();
        });
    });

    it('allow access to articles route, but should not post article when title is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${tokens}`)
        .send({
          title: '',
          article,
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('"title" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('access to articles route allowed, should not post article when article body is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${tokens}`)
        .send({
          title,
          article: '',
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('"article" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('return 400 when data is not supplied ie request with no data(empty object)', (done) => {
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${tokens}`)
        .send({
        })
        .end((err, res) => {
          expect(res.body.error).to.equal('"title" is required');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('when everthing goes well, article is created 201', (done) => {
      chai
        .request(app)
        .post(url)
        .set('x-auth-token', `Bearer ${tokens}`)
        .send({
          title,
          article,
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Operation successful, data created');
          expect(res.body.data).to.have.property('articleid');
          expect(res.body.data).to.have.property('createdon');
          expect(res.body.data).to.have.ownProperty('author');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data).to.have.property('article');
          expect(res.body.data.title).to.equal(title);
          expect(res.body.data.article).to.equal(article);
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
