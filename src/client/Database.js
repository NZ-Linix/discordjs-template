const { QuickYAML } = require('quick-yaml.db');

class Database {

    database = new QuickYAML("src/data/database.yml");
    
}

module.exports = Database;