process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('App', function() {
    describe('/GET any page', () => {
        it('it should return the public index.html page', (done) => {
              chai.request('http://localhost:3000')
              .get('')
              .end((err, res) => {
                  res.should.have.status(200);
                  //res.body.length.should.be.eql(0);
                done();
              });
        });
    });

});