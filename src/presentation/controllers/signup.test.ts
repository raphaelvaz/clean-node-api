import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-params-error'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_name@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // toBe identicos
    expect(httpResponse.body).toEqual(new MissingParamError('name')) // valores iguais
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // toBe identicos
    expect(httpResponse.body).toEqual(new MissingParamError('email')) // valores iguais
  })
})
