describe("messages", () => {
    it("should display messages page", () => {
        when_i_visit_the_messages_page();
        then_i_should_see_messages_page_title();
    })
})

const when_i_visit_the_messages_page = () => {
    cy.visit("/messages");
}

const then_i_should_see_messages_page_title = () => {
    cy.contains("[data-selector='messages.title']", "Messages");
}
