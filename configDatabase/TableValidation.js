const Sequelize = require("sequelize");
const {
  sequelizeUsersData,
  sequelizeMangaDatabase,
} = require("./sequlizeDatabase");

const UsersData = sequelizeUsersData.define("usersTest", {
  idUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  loginUser: {
    type: Sequelize.STRING(12),
    unique: true,
    allowNull: false,
  },
  passwordUser: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  emailUser: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  avatarUrl: {
    type: Sequelize.STRING(35),
    allowNull: false,
  },
});

const MangaTable = sequelizeMangaDatabase.define("mangaTable", {
  idManga: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  titleManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  titleEnglish: {
    type: Sequelize.STRING(50),
    unique: false,
    allowNull: false,
  },
  typeManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  formatManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  statusManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  translateStatusManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  yearManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  summaryManga: {
    type: Sequelize.TEXT,
    unique: false,
    allowNull: false,
  },
  authorManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  painterManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  tagsManga: {
    type: Sequelize.STRING(500),
    unique: true,
    allowNull: false,
  },
  genresManga: {
    type: Sequelize.STRING(500),
    unique: true,
    allowNull: false,
  },

  rateManga: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  coverImageManga: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  bannerImageManga: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const ChaptersTable = sequelizeMangaDatabase.define("chaptersDataTable", {
  idChapter: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  numberChapter: {
    type: Sequelize.STRING(50),
    unique: false,
    allowNull: false,
  },
  imagesChapter: {
    type: Sequelize.STRING(1000),
    unique: false,
    allowNull: false,
  },
  dateCreateChapter: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
});

const BooksMarks = sequelizeMangaDatabase.define("bookMarks", {
  idBookMarks: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  idManga: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },

  idUser: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
  },
  titleManga: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  coverImageManga: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

const RatingsTable = sequelizeMangaDatabase.define("ratings", {
  idRating: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  idUser: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
  },
  ratingCount: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
  },
});

module.exports = {
  UsersData,
  MangaTable,
  ChaptersTable,
  BooksMarks,
  RatingsTable,
};
