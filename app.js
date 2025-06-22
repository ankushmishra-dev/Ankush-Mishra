const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 999;

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.status(200).render('index.pug');
});

app.get("/contact", (req, res) => {
  res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const output = `CONTACT - Name: ${name}, Email: ${email}, Message: ${message}\n`;

  fs.appendFileSync(path.join(__dirname, 'output.txt'), output);
  res.status(200).render('success.pug', { name });
});

app.get("/about", (req, res) => {
  res.status(200).render("about.pug");
});

app.get("/services", (req, res) => {
  res.status(200).render("services.pug");
});

app.get('/auth', (req, res) => {
  const mode = req.query.mode || 'login';
  const error = req.query.error;
  res.render('login-signup', { mode, error });
  
});


app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const userData = `SIGNUP - Name: ${name}, Email: ${email}, Password: ${password}\n`;

  fs.appendFileSync(path.join(__dirname, 'output.txt'), userData);
  res.redirect('/auth?mode=login');
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const data = fs.readFileSync(path.join(__dirname, 'output.txt'), 'utf8');
  const lines = data.split('\n');
  fs.appendFileSync(path.join(__dirname, 'output.txt'), output);
  res.status(200).render('logini.pug');
  const userFound = lines.find(line => 
    line.startsWith('SIGNUP') && line.includes(`Email: ${email}`) && line.includes(`Password: ${password}`)
  );

//   if (userFound) {
//     console.log("✅ Login matched:", email);
//     res.send("✅ Login successful!");
//   } else {
//     console.log("❌ Login failed:", email);
//     res.redirect('/auth?mode=login&error=invalid');
//   }
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
