const app = require("./server");
const request = require(`supertest`);
const expect = require("chai").expect;

describe("[LIONS]", () => {
  it("should get all lions", done => {
    request(app)
      .get("/lions")
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an("array");
        done();
      });
  });

  it("should get one lion", done => {
    request(app)
      .post("/lions/")
      .send({
        name: "test",
        age: 200,
        pride: "test",
        gender: "male"
      })
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, resp) => {
        const lion = resp.body;
        request(app)
          .get("/lions/" + lion.id)
          .end((err, resp) => {
            expect(resp.body).to.be.an("object");
            done();
          });
      });
  });

  it("should create a lion", done => {
    const lion = {
      name: "simba",
      age: 200,
      pride: "good lions",
      gender: "male"
    };
    request(app)
      .post("/lions")
      .send(lion)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(201)
      .end((err, resp) => {
        const simba = resp.body;

        expect(simba).to.be.an("object");
        //       expect(simba).to.eql(lion);
        done();
      });
  });

  it("should delete a lion", done => {
    request(app)
      .post("/lions")
      .send({
        name: "test",
        age: 200,
        pride: "test",
        gender: "male"
      })
      .set("Accept", "application/json")
      .end((err, resp) => {
        var lion = resp.body;
        request(app)
          .delete("/lions/" + lion.id)
          .end((err, req) => {
            expect(resp.body).to.eql(lion);
            done();
          });
      });
  });

  it("should update a lion", done => {
    request(app)
      .post("/lions")
      .send({
        name: "test lion",
        age: 202,
        pride: "test",
        gender: "female"
      })
      .set("Accept", "application/json")
      .end((err, resp) => {
        var lion = resp.body;
        request(app)
          .put("/lions/" + lion.id)
          .send({
            name: `new name`
          })
          .end((err, resp) => {
            expect(resp.body).to.be.an("object");
            //expect(resp.body.name).to.equal("new name");
            done();
          });
      });
  });
});
