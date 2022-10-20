const handlerSaveError = (error, data, next) => {
    const {name, code} = error;
    error.status = (name === "MangoServerError" && code === 11000) ? 409 : 400;
    next();
  }

module.exports = handlerSaveError;
