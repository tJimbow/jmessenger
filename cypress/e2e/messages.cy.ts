import { dataSelector } from "../fixtures/selector.fixture";

describe("messages", () => {
    it("should display messages page", () => {
        when_i_visit_the_messages_page();
        then_i_should_see_messages_page_title();
    })

    it("should list alice messages ordered by date", () => {
        given_that_the_current_time_is("2019-01-01T14:02:30.000Z");
        given_i_have_3_alice_messages();
        when_i_visit_the_messages_page();
        then_i_should_see_all_alice_messages_ordered_by_date();
    })
})

const when_i_visit_the_messages_page = () => {
    cy.visit("/messages");
}

const then_i_should_see_messages_page_title = () => {
    cy.contains("[data-selector='messages.title']", "Messages");
}

const given_i_have_3_alice_messages = () => {
    cy.intercept("GET", "/api/messages", { fixture: "messages.json" }).as("getMessages");
    cy.wait("@getMessages");
}

const then_i_should_see_all_alice_messages_ordered_by_date = () => {
    cy.get(dataSelector('message')).should("have.length", 3);
    
    cy.get(dataSelector('message.1')).should("have.text", "Alice: my first message - il y a 2 minutes");
    cy.get(dataSelector('message.2')).should("have.text", "Alice: my second message - il y a une minute");
    cy.get(dataSelector('message.3')).should("have.text", "Alice: my third message - il y a moins d'une minute");
}

const given_that_the_current_time_is = (dateTime: string) => {
    cy.clock(new Date(dateTime));
}
