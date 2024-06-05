import { dataSelector } from "../fixtures/selector.fixture";

describe("messages", () => {
    it("should display message liste", () => {
        when_i_visit_the_jmessenger_page();
        then_i_should_see_messages_page_title();
    })
})

describe("posting a message", () => {
    it("should access to the adding message form", () => {
        when_i_visit_the_jmessenger_page();
        then_i_should_see_adding_message_form();
    });

    it("should post a message when the user click on the send button", () => {
        given_now_is("2019-01-01T14:02:30.000Z");
        given_adding_message_should_return_201();
        when_i_visit_the_jmessenger_page();
        when_user_post_a_message("my first message");
        then_the_message_should_be_posted_with({ author: "Alice", message: "my first message", postedAt: "2019-01-01T14:00:00.000Z"});
    })
})

const when_i_visit_the_jmessenger_page = () => {
    cy.visit("/");
}

const then_i_should_see_messages_page_title = () => {
    cy.contains(dataSelector('messages.title'), "Messages");
}

const then_i_should_see_adding_message_form = () => {
    cy.contains(dataSelector('message.add.title'), "Add a message");
    cy.get(dataSelector('message.add.text'));
    cy.get(dataSelector('message.add.button')).contains("Send");
}

const given_now_is = (date: string) => {
    cy.clock(new Date(date));
}

const when_user_post_a_message = (message: string) => {
    cy.get(dataSelector('message.add.text')).type(message);
    cy.get(dataSelector('message.add.button')).click();
}

const then_the_message_should_be_posted_with = (expectedPostedMessage: {author: string, message: string, postedAt: string}) => {
    cy.wait('@addMessage')
        .its('request.body')
        .should("deep.equal" , expectedPostedMessage);
}

const given_adding_message_should_return_201 = () => {
    cy.intercept('POST', '/api/add-message', {
        statusCode: 201,
    }).as('addMessage');
}
