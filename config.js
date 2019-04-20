const mongoURI = process.env.MONGODB || 'mongodb://localhost:27017/shop';
const port = process.env.PORT || 2323

module.exports = {
  port: port,
  db: mongoURI,
  secret_key_token: 'mySecretTokenKey'
}