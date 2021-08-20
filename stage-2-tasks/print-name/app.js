const express =require("express");

const app = express();


// Prints name to the screen
app.get("/", (req,res) => {
    res.send("<h3>My name is Olanrewaju Moshood</h3>");
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})