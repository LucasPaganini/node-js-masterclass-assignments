export class HTTPError extends Error {
  public readonly statusCode: number
  public readonly userMessage: string

  constructor(
    statusCode: number,
    userMessage: string,
    internalMessage?: string,
  ) {
    if (internalMessage === undefined) internalMessage = userMessage
    super(internalMessage)

    this.statusCode = statusCode
    this.userMessage = userMessage
  }
}
