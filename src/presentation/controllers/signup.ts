import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/emailvalidator'
import { InvalidParamError } from '../errors/invalid-params-error'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidor: EmailValidator
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
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
  }
}
