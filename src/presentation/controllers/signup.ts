import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidor: EmailValidator
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidor.isValid(httpRequest.body.email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      return {
        statusCode: 200,
        body: { ok: 'ok' }
      }
    } catch (error) {
      return serverError()
    }
  }
}
