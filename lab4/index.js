const { UserService, asyncHello, computeValue } = require("./src/labAssignment-lab4");

const userService = new UserService((first, last) => `${first} ${last}`);
console.log(userService.greet());

asyncHello().then(console.log);
computeValue().then(console.log);
