class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
