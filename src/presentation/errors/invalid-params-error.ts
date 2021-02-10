export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalidd param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
