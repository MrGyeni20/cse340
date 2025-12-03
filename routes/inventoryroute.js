const express = require("express")
const router = new express.Router() 
const invcontroller = require("../controllers/invcontroller")
const utilities = require("../utilities")
const invValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invcontroller.buildByClassificationId))

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invcontroller.buildByInvId))

// Route to build management view
router.get("/", utilities.handleErrors(invcontroller.buildManagement))

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invcontroller.buildAddClassification))

// Route to process add classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invcontroller.buildAddInventory))

// Route to process add inventory
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invcontroller.addInventory)
)

module.exports = router