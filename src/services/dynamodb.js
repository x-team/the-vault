class DynamoDBService {
  constructor (documentClient) {
    this.db = documentClient;
  }
}

module.exports = DynamoDBService;
