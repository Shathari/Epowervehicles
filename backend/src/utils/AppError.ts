export class AppError extends Error {
  statusCode: number
  errors?: Record<string, string[]>

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.errors = errors
  }

  static badRequest(message: string, errors?: Record<string, string[]>) {
    return new AppError(message, 400, errors)
  }

  static unauthorized(message = 'Unauthorized') {
    return new AppError(message, 401)
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(message, 403)
  }

  static notFound(message = 'Not found') {
    return new AppError(message, 404)
  }

  static conflict(message: string) {
    return new AppError(message, 409)
  }

  static tooManyRequests(message = 'Too many requests, please try again later.') {
    return new AppError(message, 429)
  }
}
