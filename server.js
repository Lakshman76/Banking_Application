const app = require("./app.js");// import
require("dotenv").config();

const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})