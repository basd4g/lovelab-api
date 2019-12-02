import { Sequelize } from "sequelize";
import configfunc from "./config/config";
import { Users, usersFactory } from "./models/users";
import { Invitations, invitationsFactory } from "./models/invitations";
import { Groups, groupsFactory } from "./models/groups";
import { Tasks, tasksFactory } from "./models/tasks";
import { Tokens, tokensFactory } from "./models/tokens";
// database接続
let isConnected = false;
const connectDataBase = (
  forceReset = false,
  isTest = false
): Promise<boolean> => {
  console.log(`isConnected: ${isConnected}`);
  if (isConnected === true) {
    return Promise.resolve(true);
  }

  const config = configfunc(isTest);
  const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      port: config.port
    }
  );

  groupsFactory(sequelize);
  usersFactory(sequelize);
  invitationsFactory(sequelize);
  tasksFactory(sequelize);
  tokensFactory(sequelize);

  return sequelize
    .authenticate()
    .then(() => {
      return Groups.sync({
        force: forceReset
      });
    })
    .then(() => {
      return Users.sync({
        force: forceReset
      });
    })
    .then(() => {
      return Invitations.sync({
        force: forceReset
      });
    })
    .then(() => {
      return Tasks.sync({
        force: forceReset
      });
    })
    .then(() => {
      return Tokens.sync({
        force: forceReset
      });
    })
    .then(() => {
      isConnected = true;
      return true;
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log("create or connect database is failed.");
      process.exit(1);
    });
};

export default connectDataBase;
