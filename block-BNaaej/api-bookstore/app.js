/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require(`mongoose`);

var indexRouter = require("./routes/index");
var commentRouter = require(`./routes/comment`);

var v1Router = require(`./routes/v1`);
var v2Router = require(`./routes/v2`);
var v3Router = require(`./routes/v3`);

// connect Database

mongoose.connect(
  `mongodb://localhost/api-bookstore`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    console.log(err ? err : `database connected`);
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/comment", commentRouter);

app.use("/api/v1/books", v1Router);
app.use("/api/v2/books", v2Router);
app.use("/api/v3/books", v3Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
