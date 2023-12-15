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
  RatingsTable,
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
MangaTable.hasMany(RatingsTable);

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

app.get("/catalog", (req, res) => {
  MangaTable.findAll().then((data) => {
    res.json(data);
  });
});

app.get("/catalog/:tag", (req, res) => {
  try {
    const tag = req.params.tag;
    console.log(tag);

    if (tag !== "undefined") {
      MangaTable.findAll({
        where: {
          [Op.or]: [{ tagsManga: { [Op.like]: `%${tag}%` } }],
        },
      }).then((data) => {
        res.json(data);
      });
    } else {
      MangaTable.findAll().then((data) => {
        res.json(data);
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
    titleEnglish: addNewManga.titleEn,
    typeManga: addNewManga.type,
    formatManga: addNewManga.format,
    statusManga: addNewManga.status,
    translateStatusManga: addNewManga.translate,
    yearManga: addNewManga.year,
    summaryManga: addNewManga.summary,
    authorManga: addNewManga.author,
    painterManga: addNewManga.painter,
    tagsManga: addNewManga.tags,
    genresManga: addNewManga.genres,
    coverImageManga: addNewManga.avatarUrl,
    bannerImageManga: addNewManga.bannerUrl,
    rateManga: "8",
  })
    .then((r) => {
      res.status(200).json({ message: "Тайтл добавлен" });
    })
    .catch((err) =>
      res.status(400).json({ error: "Ошибка при добавлении тайтла" })
    );
});

app.post("/manga/:id/createChapters", urlencodedParser, (req, res) => {
  const id = req.params.id;
  const dataArray = req.body.array;
  const numberChapter = req.body.numberChapter;
  const arrayImageChapter = JSON.parse(dataArray);
  const imagesData = JSON.stringify(arrayImageChapter);
  const dateCreateChapter = new Date();

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
  const mangaData = req.body;

  BooksMarks.create({
    mangaTableIdManga: mangaData.id,
    titleManga: mangaData.title,
    coverImageManga: mangaData.image,
    idUser: mangaData.idUser,
    idManga: mangaData.id,
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Закладка успешно добавлена" });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(400)
        .json({ error: "Произошла ошибка при добавлении закладки" });
    });
});

app.post("/removeBookMark", (req, res) => {
  const id = req.body;
  BooksMarks.destroy({
    where: { idManga: id.idManga, idUser: id.idUser },
  })
    .then((r) => {
      res.status(200).json({ message: "Закладка успешно удалена" });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: "Произошла ошибка при Удалении закладки" });
    });
});

app.get("/mangaChapterAdded", (req, res) => {
  ChaptersTable.findAll({ order: [["idChapter", "desc"]] }).then(
    async (chapterData) => {
      const array = chapterData.map((chapter) => chapter.get());

      const mangaDataArray = [];

      const dateAdded = new Date();

      for (let i = 0; i < array.length; i++) {
        await MangaTable.findOne({
          where: array[i].mangaTableIdManga,
        }).then((mangaData) => {
          const difference = Math.floor(
            (dateAdded - array[i].dateCreateChapter) / 1000 / 60
          );
          mangaDataArray.push({
            ...mangaData.dataValues,
            numberChapter: array[i].numberChapter,
            difference,
          });
        });
      }

      res.json(mangaDataArray);
    }
  );
});

app.post("/addUserMangaRate", (req, res) => {
  const data = req.body;
  console.log(data);
  RatingsTable.create({
    idUser: data.idUser,
    ratingCount: data.ratingCount,
    mangaTableIdManga: data.idManga,
  })
    .then((r) => {
      res.status(200).json({ message: "Оценка успешно поставленна" });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: "Произошла ошибка при записи оценки" });
    });
});

app.get("/mangaRating", (req, res) => {
  const id = req.query.idManga;
  RatingsTable.findAll({ where: { mangaTableIdManga: id } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
