// test for article operations
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../app';
import { GenerateTokens } from '../helpers/jwtAuthHelper';
import { articleStore, Article } from '../models/Article';

chai.use(chaiHttp);
const { expect } = chai;
let tokens;
let notOwnerTokens;
describe('Article test /api/v1/articles', () => {
  // post article test
  before(() => {
    tokens = GenerateTokens('kose', 'uk45', 'kose@gmail.com');
    notOwnerTokens = GenerateTokens('kose2', 'uk452', 'kose2@gmail.com');
  });
  describe('POST /articles', () => {
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

  // edit article
  describe('PATCH /articleId', () => {
    const url = '/api/v1/articles/<articleId>';
    before(() => {
      // do something here before patching
    });
    it('should not update article when title is empty', (done) => {
      chai
        .request(app)
        .patch(url)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: '',
            content: 'update content',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not update article when content is empty', (done) => {
      chai
        .request(app)
        .patch(url)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: 'updated title',
            content: '',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('return 404 when there\'s wrong id is given ', (done) => {
      chai
        .request(app)
        .patch(url)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: 'updated title',
            content: 'updated content',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should update article when id matchs ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/articles/${articleStore[0].articleId}`)
        .set('authorization', `Bearer ${tokens}`)
        .send({
          data: {
            title: 'updated title',
            content: 'updated content',
          },
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    // BLOCKER, test case
    // it('return 500 when somthing goes wrong ', (done) => {
    //   chai
    //     .request(app)
    //     .patch(`/api/v1/articles/${articleStore[0].articleId}`)
    //     .set('authorization', `Bearer ${tokens}`)
    //     .send({
    //       data: {
    //         title: 'updated title',
    //         content: 'updated content',
    //       },
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(500);
    //       done();
    //     });
    // });
  });

  // delete article
  describe('DELETE /articleId', () => {
    let wrongIdURL;
    let url;
    before(() => {
      wrongIdURL = '/api/v1/artilces/10';
      url = `/api/v1/articles/${articleStore[0].articleId}`;
    });
    it('404 not found, cannot delete non existing article', (done) => {
      chai
        .request(app)
        .delete(wrongIdURL)
        .set('authorization', `Bearer ${tokens}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('401 unauthorized, cannot delete existing article not own by user', (done) => {
      chai
        .request(app)
        .delete(url)
        .set('authorization', `Bearer ${notOwnerTokens}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('200 sucess, should delete existing article own by user', (done) => {
      chai
        .request(app)
        .delete(url)
        .set('authorization', `Bearer ${tokens}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
