const {Client} = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR (255),
  lastname VARCHAR (255),
  username VARCHAR (255),
  password VARCHAR (255),
  membership VARCHAR (255)  
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255),
  user_id INTEGER,
  timestamp TIMESTAMP,
  message TEXT
  );

INSERT INTO users (firstname, lastname, username, password, membership)
VALUES ('Testy', 'Testerson', 'TestMan', 'boogers', 'user'), 
    ('Testicles', 'Gloobiopolis', 'Gloobles', 'AssMan', 'user');

INSERT INTO messages (title, user_id, message)
VALUES
    ('Test', '1', 'This is just a test to see if the messages will render.'),
    ('Next Message Test', '2', 'This is a test to see if subsequent messages will render correctly.');

`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`,
});
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();