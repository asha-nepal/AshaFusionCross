const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

// serve files from 'public' dir
app.get('*.*', (req, res) => {
  const options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
  };

  res.sendFile(req.path, options,
    (err) => {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    }
  );
});

// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Production Express server running at localhost:${PORT}`);
});
