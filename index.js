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

router.get("/search", (req, res, next) => {
  let searchObj = {
    id: Number.parseInt(req.query.id),
    name: req.query.name,
  };
  pieRepo.search(
    searchObj,
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All Pies Retrieved",
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
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "All pies retrieved",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: "Not Found",
          message: `The pie ${req.params.id} could not be found`,
          error: {
            code: "NOT_FOUND",
            message: `The pie ${req.params.id} could not be found`,
          },
        });
      }
    },
    (err) => {
      next(err);
    }
  );
});

router.post("/", (req, res, next) => {
  pieRepo.insert(
    req.body,
    (data) => {
      res.status(200).json({
        status: 201,
        statusText: "Created",
        message: "New Pie Added",
        data: data,
      });
    },
    (err) => {
      next(err);
    }
  );
});

router.put("/:id", (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  pieRepo.getById(id, (data) => {
    if (data) {
      pieRepo.update(
        id,
        req.body,
        (_data) => {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: `Pie ${id} updated.`,
            data: _data,
          });
        },
        (err) => {
          next(err);
        }
      );
    } else {
      res.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: `The pie ${id} could not be found.`,
        error: {
          code: "NOT_FOUND",
          message: `The pie ${id} could not be found.`,
        },
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  let id = Number.parseInt(req.params.id);
  pieRepo.getById(
    id,
    (data) => {
      if (data) {
        pieRepo.delete(
          id,
          (_data) => {
            res.status(200).json({
              status: 200,
              statusText: "OK",
              message: `The pie ${id} is deleted`,
              data: `Pie ${id} deleted`,
            });
          },
          (err) => {
            next(err);
          }
        );
      } else {
        res.status(404).json({
          status: 404,
          statusText: "Not Found",
          message: `The pie ${id} could not be found`,
          error: {
            code: "NOT_FOUND",
            message: `The pie ${id} could not be found`,
          },
        });
      }
    },
    (err) => {
      next(err);
    }
  );
});

router.patch("/:id", (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  pieRepo.getById(
    id,
    (data) => {
      console.log(data);
      if (data) {
        pieRepo.update(
          id,
          req.body,
          (_data) => {
            res.status(200).json({
              status: 200,
              statusText: "OK",
              message: `The pie ${id} patched`,
              data: _data,
            });
          },
          (_err) => {
            next(_err);
          }
        );
      } else {
        res.status(404).json({
          status: 404,
          statusText: "Not Found",
          message: `The pie ${id} could not be found`,
          error: {
            code: "NOT_FOUND",
            message: `The pie ${id} could not be found`,
          },
        });
      }
    },
    (err) => {
      next(err);
    }
  );
});

app.use(express.json());
app.use("/api/", router);

const server = app.listen(5000, () => {
  console.log("Node Server is running on http://localhost:5000/...");
});
