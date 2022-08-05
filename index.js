let express = require("express");
let app = express();

let pieRepo = require("./repos/pieRepo");

let router = express.Router();

router.get("/", (req, res, next) => {
  pieRepo.get(
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All pies retrieved",
        data: data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

router.get("/:id", (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  pieRepo.getById(
    id,
    (data) => {
      if(data) {
        res.status(200).json({
          'status': 200,
          'statusText': "OK",
          'message': "All pies retrieved",
          'data': data,
        });
      } else {
        res.status(404).json({
          'status': 404,
          'statusText': "Not Found",
          'message': `The pie ${req.params.id} could not be found`,
          'error': {
            'code': 'NOT_FOUND',
            'message': `The pie ${req.params.id} could not be found` 
          },
        });
      }
      
    },
    (err) => {
      next(err);
    }
  );
});

app.use("/api/", router);

const server = app.listen(5000, () => {
  console.log("Node Server is running on http://localhost:5000/...");
});
