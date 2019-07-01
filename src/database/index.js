import Sequelize from 'sequelize';
// Importar models
import User from '../app/models/User';

// importar configuracoes do banco
import databaseConfig from '../config/database';

// array com todos os models
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    // percorrer o array chamando cada init dos models
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
