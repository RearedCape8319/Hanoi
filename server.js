const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listeing on port ${port}!`);
});
app.use(express.static("public"));
app.use(express.json({
  limit: "1mb"
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   // Add this
   if (req.method === 'OPTIONS') {
  
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Max-Age', 120);
        return res.status(200).json({});
    }
    next();
});