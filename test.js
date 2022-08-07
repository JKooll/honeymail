let startDate = new Date("2022-4-4").getTime()
let now = new Date().getTime()
console.log(Math.ceil((now - startDate) / (1000 * 3600 * 24)))