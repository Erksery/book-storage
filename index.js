const express = require("express");
const Sequelize = require("sequelize");
const {
  sequelizeUsersData,
  sequelizeMangaDatabase,
} = require("./configDatabase/sequlizeDatabase");
const {
  UsersData,
  MangaTable,
  ChaptersTable,
  BooksMarks,
} = require("./configDatabase/TableValidation");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const cors = require("cors");

const urlencodedParser = express.urlencoded({ extended: false });
const app = express();
app.use(express.json());
app.use(cors());

MangaTable.hasMany(ChaptersTable);
MangaTable.hasMany(BooksMarks);

sequelizeMangaDatabase
  .sync()
  .then(() => {
    app.listen(5001, () => {
      console.log("ALL COMPLETE: http://localhost:5001/users");
    });
  })
  .catch((err) => console.log("Error:", err));

sequelizeUsersData
  .sync()
  .then(() => {
    console.log("ALL COMPLETE: http://localhost:5001/users");
  })
  .catch((err) => console.log("Error:", err));

app.use(multer({ dest: "uploads" }).single("fileData"));

app.get("/image/:id", (req, res) => {
  const userId = req.params.id;
  fs.readFile(`uploads/${userId}.jpg`, (err, data) => {
    if (err) {
      res.status(500).send("Error reading the image file");
    } else {
      res.setHeader("Content-Type", "image/jpg");
      res.send(data);
    }
  });
});

app.get("/users", (req, res) => {
  UsersData.findAll({ limit: 10, order: [["idUser", "desc"]] }).then((data) => {
    res.json(data);
  });
});

app.get("/manga", (req, res) => {
  MangaTable.findAll({ limit: 20, order: [["idManga", "desc"]] }).then(
    (data) => {
      res.json(data);
    }
  );
});

app.get("/manga/:id/chapters", urlencodedParser, (req, res) => {
  const id = req.params.id;
  ChaptersTable.findAll({
    where: { mangaTableIdManga: id },
    order: [["idChapter", "desc"]],
  }).then((data) => {
    res.json(data);
  });
});

app.post("/uploadImage", (req, res) => {
  let fileData = req.file;
  const fileExt = path.extname(fileData.originalname);
  const fileName = path.basename(fileData.originalname, fileExt);
  const newFileName = fileName + ".jpg";
  const newPath = path.join(fileData.destination, newFileName);
  fs.renameSync(fileData.path, newPath);
});

app.post("/createManga", urlencodedParser, (req, res) => {
  const addNewManga = req.body;
  console.log(addNewManga);

  MangaTable.create({
    titleManga: addNewManga.title,
    coverImageManga: addNewManga.avatarUrl,
    rateManga: "8",
  })
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.post("/manga/:id/createChapters", urlencodedParser, (req, res) => {
  const id = req.params.id;
  const dataArray = req.body.array;
  const numberChapter = req.body.numberChapter;
  const arrayImageChapter = JSON.parse(dataArray);
  const imagesData = JSON.stringify(arrayImageChapter);
  ChaptersTable.create({
    numberChapter: numberChapter,
    imagesChapter: imagesData,
    mangaTableIdManga: id,
  }).then((data) => res.send(data));
});

app.get("/manga/:id/chapters/:idChapter", urlencodedParser, (req, res) => {
  const id = req.params.id;
  const idChapter = req.params.idChapter;
  ChaptersTable.findOne({
    where: { idChapter: idChapter, mangaTableIdManga: id },
  }).then((data) => {
    res.json(data);
  });
});

app.get("/manga/:id", (req, res) => {
  const id = req.params.id;
  MangaTable.findOne({ where: { idManga: id } }).then((data) => {
    res.json(data);
  });
});

app.get("/searchManga", (req, res) => {
  const value = req.query.value;
  console.log(value);
  MangaTable.findAll({
    where: {
      [Op.or]: [{ titleManga: { [Op.like]: `%${value}%` } }],
    },
    limit: 15,
  }).then((data) => {
    res.json(data);
  });
});

app.post("/registration", (req, res) => {
  const inputData = req.body;
  UsersData.create({
    loginUser: inputData.name,
    passwordUser: inputData.password,
    emailUser: inputData.email,
    avatarUrl: "uploads/userLogo",
  }).then((data) => console.log(data));
});

app.get("/authorization", (req, res) => {
  const inputData = req.query;
  UsersData.findOne({ where: { emailUser: inputData.email } }).then((data) => {
    if (inputData.password === data.passwordUser) {
      res.json(data);
    }
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  UsersData.findOne({ where: { idUser: id } }).then((data) => {
    res.json(data);
  });
});

app.get("/bookMarks", (req, res) => {
  const id = req.query;
  BooksMarks.findAll({ where: { idUser: id.idUser } }).then((data) => {
    res.json(data);
  });
});

app.post("/addBookMarks", (req, res) => {
  const userId = req.body.idUser;
  const mangaData = req.body;

  BooksMarks.create({
    mangaTableIdManga: mangaData.id,
    titleManga: mangaData.title,
    imageManga: mangaData.image,
    idUser: userId,
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Закладка успешно добавлена" });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "Произошла ошибка при добавлении закладки" });
    });
});
