const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate", (req, res) => {
  let { num1, num2, operation } = req.body;

  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.send("<h2> Invalid input! Please enter valid numbers.</h2><a href='/'>Go back</a>");
  }

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return res.send("<h2> Division by zero is not allowed!</h2><a href='/'>Go back</a>");
      }
      result = num1 / num2;
      break;
    default:
      return res.send("<h2> Unknown operation</h2><a href='/'>Go back</a>");
  }

  res.send(`<h2> Result: ${result}</h2><a href='/'>Go back</a>`);
});

app.listen(PORT, () => {
  console.log(`Calculator running at http://localhost:${PORT}`);
});
