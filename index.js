let express = require("express");
let app = express();

let pieRepo = require("./repos/pieRepo");

let router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: 200,
    statusText: "OK",
    message: "All pies retrieved",
    data: pieRepo.get(),
  });
});

app.use("/api/", router);

const server = app.listen(5000, () => {
  console.log("Node Server is running on http://localhost:5000/...");
});
