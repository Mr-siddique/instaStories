describe('Stories Feature', () => {
  beforeEach(() => {
    // Mock window.innerWidth to simulate mobile device
    cy.viewport('iphone-x')
    cy.visit('/')
  })

  it('should display story circles in horizontal list', () => {
    cy.get('[data-testid="story-circles-container"]')
      .should('be.visible')
      .scrollIntoView()
      .should('have.css', 'display', 'flex')
      
    // Check if we have all stories
    cy.get('[data-testid="story-circle"]')
      .should('have.length', 7)
  })

  it('should open story viewer when clicking a story circle', () => {
    cy.get('[data-testid="story-circle"]')
      .first()
      .click()

    cy.get('[data-testid="story-viewer"]')
      .should('be.visible')
  })

  it('should navigate through stories using tap gestures', () => {
    // Open first story
    cy.get('[data-testid="story-circle"]')
      .first()
      .click()

    // Get initial story heading
    cy.get('[data-testid="story-header-heading"]')
      .invoke('text')
      .as('firstStoryHeading')

    // Tap right side to go to next story
    cy.get('[data-testid="story-viewer"]')
      .click('right')

    // Verify heading changed
    cy.get('[data-testid="story-header-heading"]')
      .invoke('text')
      .should('not.equal', '@firstStoryHeading')

    // Tap left side to go back
    cy.get('[data-testid="story-viewer"]')
      .click('left')

    // Verify we're back to first story
    cy.get('[data-testid="story-header-heading"]')
      .invoke('text')
      .should('equal', '@firstStoryHeading')
  })

  it('should auto-advance stories after 5 seconds', () => {
    cy.get('[data-testid="story-circle"]')
      .first()
      .click()

    cy.get('[data-testid="story-header-heading"]')
      .invoke('text')
      .as('firstStoryHeading')

    // Wait for auto-advance
    cy.wait(5000)

    // Verify story changed
    cy.get('[data-testid="story-header-heading"]')
      .invoke('text')
      .should('not.equal', '@firstStoryHeading')
  })

  it('should show progress bars for stories', () => {
    cy.get('[data-testid="story-circle"]')
      .first()
      .click()

    cy.get('[data-testid="story-progress-bars"]')
      .should('be.visible')
      .find('[data-testid="progress-bar"]')
      .should('have.length', 7)

    // Check if first progress bar is animating
    cy.get('[data-testid="progress-bar"]')
      .first()
      .should('have.css', 'width', '0%')
      .wait(2500)
      .should('have.css', 'width', '50%')
  })

  it('should close story viewer when clicking close button', () => {
    cy.get('[data-testid="story-circle"]')
      .first()
      .click()

    cy.get('[data-testid="close-button"]')
      .click()

    cy.get('[data-testid="story-viewer"]')
      .should('not.exist')
  })
})

describe('Stories Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display stories', () => {
    // Check if stories container exists
    cy.get('[data-testid="stories-container"]').should('exist')

    // Check if we have all three stories
    cy.get('[data-testid="story-item"]').should('have.length', 3)
  })

  it('should display story details correctly', () => {
    // Check first story details
    cy.get('[data-testid="story-item"]').first().within(() => {
      cy.get('[data-testid="story-heading"]').should('contain', 'Mohit Karekar')
      cy.get('[data-testid="story-subheading"]').should('contain', 'Posted 5h ago')
      cy.get('[data-testid="story-profile-image"]').should('have.attr', 'src')
    })
  })

  it('should show see more content when clicked', () => {
    cy.get('[data-testid="story-item"]').first().click()
    cy.get('[data-testid="see-more-content"]').should('be.visible')
    cy.get('[data-testid="see-more-content"]').should('contain', 'see more')
  })
}) 