const { FILE } = require("dns");
const fs = require("fs");
const FILE_NAME = "./assets/pies.json";
const pieRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data).find((p) => p.id === id));
      }
    });
  },
  search: function (searchObj, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        if (searchObj) {
          pies = pies.filter(
            (p) =>
              (searchObj.id ? p.id === searchObj.id : true) &&
              (searchObj.name
                ? p.name.toLowerCase().indexOf(searchObj.name.toLowerCase()) >=
                  0
                : true)
          );
        }
        resolve(pies);
      }
    });
  },
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), function (_err) {
          if (_err) {
            reject(_err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
};

module.exports = pieRepo;
