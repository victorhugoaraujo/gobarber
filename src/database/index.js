import Sequelize from 'sequelize';
// Importar models
import User from '../app/models/User';
import File from '../app/models/File';

// importar configuracoes do banco
import databaseConfig from '../config/database';

// array com todos os models
const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    // percorrer o array chamando cada init dos models
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
