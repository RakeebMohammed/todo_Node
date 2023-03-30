var express = require("express");
var router = express.Router();
let todoHelpers = require("../helpers/todoHelpers");
/* GET home page. */
router.get("/", async function (req, res, next) {
  
  let { pending, cancelled, completed, deleted } =
    await todoHelpers.getAllactions();
  // console.log(pending);
  todoHelpers.getTasks().then((task) => {
    todoHelpers
      .sortedReport()
      .then((report) => {
         console.log(report);
        res.render("index", {
          task,
          pending,
          cancelled,
          completed,
          deleted,
          report,
        });
      })
      .catch(() => {
        res.render("index", { notask: true });
      });
  }) .catch(() => {
    res.render("index", { notask: true });
  });
});
router.post("/addTask", (req, res) => {
  
  todoHelpers.insertTask(req.body).then((success) => {
    console.log(req.body);
    res.redirect("/");
  });
});
router.get("/completeTask/:id", (req, res) => {
  todoHelpers.completeTask(req.params.id).then(() => {
    res.redirect("/");
  });
});
router.get("/cancelTask/:id", (req, res) => {
  todoHelpers.cancelTask(req.params.id).then(() => {
    res.redirect("/");
  });
});
router.get("/deleteTask/:id", (req, res) => {
  todoHelpers.deleteTask(req.params.id).then(() => {
    res.redirect("/");
  });
});
module.exports = router;
