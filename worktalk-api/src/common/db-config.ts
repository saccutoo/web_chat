import path = require("path");
const output = path.join(__dirname, "../db-model-exported");
const options = {
  directory: output,
  //   caseFile: "l",
  //   caseModel: "p",
  //   caseProp: "c",
  lang: "ts",
  spaces: true,
  indentation: 2,
};

// // mysql
// const mysql = {
//   dbname: "work_talk",
//   user: "root",
//   pass: "root",
//   options: { dialect: "mysql" },
//   autoOptions: { dialect: "mysql", ...options },
// };

// export { mysql };
