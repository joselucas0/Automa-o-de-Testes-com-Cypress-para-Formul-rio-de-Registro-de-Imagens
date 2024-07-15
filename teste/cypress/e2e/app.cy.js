import assert from 'assert'
import { describe, it } from 'mocha';

class RegisterForm{ //para interagir com o formulario
  elements = {
    titleInput: () => cy.get('#title'),//bater no html e receber o valor, cy variavel do cypress e get.
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit'),
    
  }

  typeTitle(text){
    if(!text) return;
    this.elements.titleInput().type(text)
  }
  typeUrl(url) {
    if (!url) return;
    this.elements.imageUrlInput().type(url)
  }
  clickSubmit() {
    this.elements.submitBtn().click()
  }
}


const registerForm = new RegisterForm() //para se precisarmos reutilizar ele
const colors = {
  errors: 'rgb(220, 53, 69)',
  sucess: ''
}

describe('Image Registration', () => {
  describe('Submitting an image with invalid inputs', () => {
    after(()=>{
      cy.clearAllLocalStorage()
    })
    const input = {
      title: '',
      url: ''
    }
    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })
    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })
    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })
    it('Then I click the submit button', () =>{
      registerForm.clickSubmit()
    })
    it('Then I should see "Please type a title for the image" message above the title field', () => {
      registerForm.elements.titleFeedback().should('contain.text', 'Please type a title for the image')
    })


    it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
      registerForm.elements.urlFeedback().should('contain.text', 'Please type a valid URL')
    })
    it('And I should see an exclamation icon in the title and URL fields', () => {
      registerForm.elements.titleInput().should(([$input]) => {
        const styles = window.getComputedStyle($input);
        const border = styles.getPropertyValue('border-right-color');
        assert.strictEqual(border, colors.errors)
      })
    })

  })
})