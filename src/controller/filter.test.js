import 'regenerator-runtime/runtime'
import bodyParser from "body-parser"
import app from "../app"
import supertest from "supertest"

const request = supertest(app)

app.use(bodyParser.json());

function fetch(data, url) {
    return request.post(url)
        .send(data)
        .set('Accept', 'application/json')
}

const correctRequest = {
    "startDate": "2016-01-29",
    "endDate": "2016-02-02",
    "minCount": 2000,
    "maxCount": 4000
}

const request1 = {
    "startDate": "2016-01-29",
    "minCount": 2000,
    "maxCount": 4000
}

const request2 = {
    "endDate": "2016-02-02",
    "minCount": 2000,
    "maxCount": 4000
}

const request3 = {
    "startDate": "2016-01-29",
    "endDate": "2016-02-02",
    "maxCount": 4000
}

const request4 = {
    "startDate": "2016-01-29",
    "endDate": "2016-02-02",
    "minCount": 2000,
}

describe('Filter controller test', () => {

    it("Sending wrong end date", async () => {
        jest.useFakeTimers()
        const result = await fetch(request1, '/filter')
        expect(result.body.msg).toBe('"endDate" is required')
    })

    it("Sending wrong start date", async () => {
        jest.useFakeTimers()
        const result = await fetch(request2, '/filter')
        expect(result.body.msg).toBe('"startDate" is required')
    })

    it("Sending wrong minCount", async () => {
        jest.useFakeTimers()
        const result = await fetch(request3, '/filter')
        expect(result.body.msg).toBe('"minCount" is required')
    })

    it("Sending wrong maxCount", async () => {
        jest.useFakeTimers()
        const result = await fetch(request4, '/filter')
        expect(result.body.msg).toBe('"maxCount" is required')
    })

    it("Sending maxCount less than minCount", async () => {
        jest.useFakeTimers()
        const cloneRequest = Object.assign({}, correctRequest);
        cloneRequest.maxCount = 1800 //less than minCount
        const result = await fetch(cloneRequest, '/filter')

        expect(result.body.msg).toBe('"maxCount" must be greater than ref:minCount')
    })

    it("Sending endDate less than startDate", async () => {
        jest.useFakeTimers()
        const cloneRequest = Object.assign({}, correctRequest);
        cloneRequest.endDate = '2016-01-28' //less than 2016-01-29
        const result = await fetch(cloneRequest, '/filter')
        expect(result.body.msg).toBe('"endDate" must be greater than "ref:startDate"')
    })
})
