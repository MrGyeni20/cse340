const errorCont = {}

/* ****************************************
*  Trigger intentional error for testing
* *************************************** */
errorCont.triggerError = async function(req, res, next) {
  throw new Error("Intentional 500 error triggered for testing purposes")
}

module.exports = errorCont