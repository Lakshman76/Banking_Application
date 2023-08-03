const express = require('express');
const connectToDB = require("./config/db");
const path = require('path');
const hbs = require('hbs');
const Register = require('./models/register');
const bcrypt = require('bcryptjs');

const app = express();

connectToDB();

// const static_path = path.join(__dirname, "./public");
// app.use(express.static(static_path));

app.set('view engine', 'hbs'); // use this if views folder present anywhere

const views_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");
app.set('views', views_path);
hbs.registerPartials(partials_path);


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res)=>{
    res.render('index');
})

app.get("/register.hbs", (req, res)=>{
        res.render('register');
})

app.get("/login.hbs", (req, res)=>{
        res.render('login');
})

// For signup 

app.post("/register", async (req, res)=>{

        const {name, email, password, confirmPassword} = req.body;

        try {
                if(!name || !email || !password || !confirmPassword){
                        return res.send("Every field is required");
                }
                else if(password !== confirmPassword){
                        return res.send("Password doesn't match")
                }

                const registerUser = new Register({
                        name,
                        email,
                        password,
                        confirmPassword
                })

                const registered = await registerUser.save();
                
                res.status(201).render("login");

        } catch (err) {
                res.status(400).send("Invalid credentials");
        }
})

// For signin

app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).send("Email and password are required");
            }
    
            const user = await Register.findOne({ email }).select('+password');
    
            if (!user) {
                return res.status(401).send("Invalid credentials!");
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send("Invalid credentials");
            }
    
            // Successful login
            res.status(200).render('main');
        } catch (err) {
            res.status(500).send("Internal server error");
        }
});
    
    
module.exports = app;