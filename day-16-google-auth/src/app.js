require("dotenv").config();
let express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
let authRoutes = require("./routes/auth.routes");
const UserModel = require("./models/user.model");

let app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("profiles->", profile);
      let name = profile.name.givenName;
      let email = profile.emails[0].value;

      let isExisted = await UserModel.findOne({ email });

      if (isExisted) {
        return cb(null, isExisted);
      }

      let newUser = await UserModel.create({
        name,
        email,
        provider: "google",
        provider_id: profile.id,
      });

      return cb(null, newUser);
    }
  )
);

app.get("/", (req, res) => {
  return res.send("tumse nahi ho paega...");
});

app.use("/api/auth", authRoutes);

module.exports = app;