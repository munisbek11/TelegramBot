export default class BaseError extends Error {
  status: number;
  errors: any[];
  constructor(status: number, message: string ,errors:any[] = []){
    super(message)
    this.status = status
    this.errors = errors
    Object.setPrototypeOf(this, BaseError.prototype)
  }
  static BadRequest (message: string ,errors:any[] = []){
    return new BaseError(400, message, errors)
  }
}