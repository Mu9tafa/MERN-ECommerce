const mongoose = require('mongoose');

mongoose.connect(process.env.LOCAL_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
