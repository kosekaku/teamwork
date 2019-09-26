// test for article operations
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../app';
import { GenerateTokens } from '../helpers/jwtAuthHelper';

chai.use(chaiHttp);
const { expect } = chai;
let tokens;
describe('Article test /api/v1/articles', () => {
  // post article test
  describe('POST /articles', () => {
    before(() => {
      tokens = GenerateTokens('kose', 'uk45', 'kose@gmail.com');
    });
    const url = '/api/v1/articles';

    it('deny access to articles route there is no access tokens', (done) => {
      chai
        .request(app)
        .post(url)
        // .set('authorization', `Bearer ${tokens}`) dont provie access tokens
        .send({
          data: {
            title: 'outting in the paradise',
            content: 'article content goes here',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('deny access to articles route  when malformed access token is given', (done) => {
      const malformedTokens = 'qeqrlkhjgmngmbnd;ghjjfgjkhsjsfgjfhdfgjgf';
      chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${malformedTokens}`) // json verifcation fails here during verify() at auth middleware
        .send({
          data: {
            title: 'outting in the paradise',
            content: 'article content goes here',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('deny access to articles route when invalid access token is given', (done) => {
      // invalid token ie token, notice the "invalid" word prefix
      const invalidTokens = 'invalidiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJrb3NlIiwibGFzdE5hbWUiOiJ1azQ1IiwiZW1haWwiOiJrb3NlMkBnbWFpbC5jb20iLCJpYXQiOjE1Njk1MjgxMjQsImV4cCI6MTU2OTUzMTcyNH0.Lwr64IA2_8GDtxCsMCY97Y6WzQX42vvXH3XiU4SLWH4';
      chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${invalidTokens}`) // json verifcation fails here during verify() at auth middleware
        .send({
          data: {
            title: 'outting in the paradise',
            content: 'article content goes here',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('deny access to articles route when expired access token is given', (done) => {
      // invalid token but expired
      const expiredTokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJrb3NlIiwibGFzdE5hbWUiOiJ1azQ1IiwiZW1haWwiOiJrb3NlMkBnbWFpbC5jb20iLCJpYXQiOjE1Njk1MjgxMjQsImV4cCI6MTU2OTUzMTcyNH0.Lwr64IA2_8GDtxCsMCY97Y6WzQX42vvXH3XiU4SLWH4';
      chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${expiredTokens}`) // json verifcation fails here during verify() at auth middleware
        .send({
          data: {
            title: 'outting in the paradise',
            content: 'article content goes here',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('when everthing goes well, article is created 201', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: 'jhfjhggj',
            content: 'article content goes here',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });


    it('access to articles route allowed, but should not post article when title is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: '',
            content: 'article content goes here',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('access to articles route allowed, should not post article when content body is empty', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: 'A day out in paradise',
            content: '',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });





  });
});
