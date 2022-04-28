let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest Api',() => {
    it('Should return status 200 for Users Route',(done) => {
        chai.request(`http://localhost:9700`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err;
        })
    })
    it('Should return status 404 for Users Route',(done) => {
        chai.request(`http://localhost:9700`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404)
            done()
        })
        .catch((err) => {
            throw err;
        })
    })
    it('Should return status 200 for add User Route',(done) => {
        chai.request(`http://localhost:9700`)
        .post('/addUser')
        .send({"name":"Test User","isActive":true})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err;
        })
    })
})