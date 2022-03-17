import pg from "pg";
import { Sequelize } from "sequelize";

const { PGPORT, PGPASSWORD, PGDATABASE, PGUSER, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection is 🆗");
  } catch (error) {
    console.log(error);
  }
};
export const syncDB = async () => {
  try {
    await sequelize.sync({ logging: false });
  } catch (error) {
    console.log("There is an error", error);
  }
};

export default sequelize;
