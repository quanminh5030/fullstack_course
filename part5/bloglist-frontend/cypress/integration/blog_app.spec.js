describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.createUser({
      name: "Quan Dao",
      username: "quanminh5030",
      password: "mypassword",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#username").should("not.have.class", "disabled");
    cy.get("#password").should("not.have.class", "disabled");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("quanminh5030");
      cy.get("#password").type("mypassword");
      cy.get("#login-button").click();

      cy.contains("Quan Dao logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("quanminh5030");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "quanminh5030", password: "mypassword" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Programming to Interface Vs to Implementation");
      cy.get("#author").type("Dmitri Pavlutin");
      cy.get("#url").type(
        "https://dmitripavlutin.com/interface-vs-implementation/"
      );
      cy.get("#create-button").click();

      cy.get(".blog")
        .should("have.length", 1)
        .and(
          "contain",
          "Programming to Interface Vs to Implementation Dmitri Pavlutin"
        );
    });
  });

  describe("blog functionalities", () => {
    beforeEach(function () {
      cy.login({ username: "quanminh5030", password: "mypassword" });
      cy.createBlog({
        title: "Programming to Interface Vs to Implementation",
        author: "Dmitri Pavlutin",
        url: "https://dmitripavlutin.com/interface-vs-implementation/",
      });
    });

    it("users can like a blog", function () {
      cy.get("#view-button").click();
      cy.get(".like").should("contain", 0);
      cy.get("#like-button").click();
      cy.get(".like").should("contain", 1);
    });

    it("user who created a blog can delete it", function () {
      cy.get(".blog") // blog exists in the beginning
        .should("have.length", 1);
      cy.get("#view-button").click();
      cy.get("#remove-button").click();

      cy.on("window:confirm", () => {
        return true;
      });
      cy.get(".blog") // blog is removed
        .should("have.length", 0);
    });

    it("user who was not created a blog cannot delete it", function () {
      cy.createUser({
        name: "Test User",
        username: "test",
        password: "mypassword",
      });
      cy.login({ username: "test", password: "mypassword" });
      cy.get("#view-button").click();
      cy.get("#remove-button").should("have.length", 0); // no remove button for users who not created this blog
    });
  });

  describe("blogs are ordered according to likes", function () {
    beforeEach(function () {
      cy.login({ username: "quanminh5030", password: "mypassword" });
    });

    beforeEach(function () {
      cy.createBlog({
        title: "Programming to Interface Vs to Implementation",
        author: "Dmitri Pavlutin",
        url: "https://dmitripavlutin.com/interface-vs-implementation/",
        likes: 3,
      });

      cy.createBlog({
        title: "Use React.memo() wisely",
        author: "Dmitri Pavlutin",
        url: "https://dmitripavlutin.com/use-react-memo-wisely/",
        likes: 5,
      });
    });

    it("second blogs with 5 likes should appear first", function () {
      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).should("contain", "Use React.memo() wisely");
      });
    });

    it("after click like button 3 times for the first blog, it appears first in the list", function () {
      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[1]).contains("view").click();

        cy.wrap(blogs[1]).find("#like-button").click();
        cy.wait(1000);
        cy.wrap(blogs[1]).find("#like-button").click();
        cy.wait(4000);
        cy.wrap(blogs[1]).find("#like-button").click();
      });

      cy.wait(1000);

      cy.get(".blog") // the list is sorted based on likes
        .then((blogs) => {
          cy.wrap(blogs[0])
            .should("contain", "Programming to Interface Vs to Implementation")
            .and("contain", 6);
        });
    });
  });
});
