

  
var handleSubmit = {
  firstName:"John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  }
}


module.exports = handleSubmit;