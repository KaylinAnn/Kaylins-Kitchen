const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const controller = require("./controller");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.get("/auth/callback", (req, res) => {
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  function tradeCodeForAccessToken() {
    return axios.post(
      `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
      payload
    );
  }

  function tradeAccessTokenForUserInfo(accessTockenResponse) {
    const accessToken = accessTockenResponse.data.access_token;
    return axios.get(
      `https://${
        process.env.REACT_APP_AUTH0_DOMAIN
      }/userinfo?access_token=${accessToken}`
    );
  }

  function storeUserInfoInDatabase(response) {
    const auth0Id = response.data.sub;
    console.log(auth0Id);

    const db = req.app.get("db");
    return db
      .get_user_by_auth0_id(auth0Id)
      .then(users => {
        if (users.length) {
          const user = users[0];
          req.session.user = user;

          res.redirect("/dashboard");
        } else {
          const userArray = [
            auth0Id,
            response.data.name,
            response.data.email,
            response.data.picture
          ];
          return db
            .create_user(userArray)
            .then(() => {
              return db.get_user_by_auth0_id(auth0Id);
            })
            .then(newUser => {
              req.session.user = newUser;
              res.redirect("/dashboard");
            })
            .catch(error => {
              console.log("error w/ create_user", error);
              res.status(500).send("unknown1 error");
            });
        }
      })
      .catch(error => {
        console.log("error w/ create_user", error);
        res.status(500).send("unknown2 error");
      });
  }

  tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(error => {
      console.log("error", error);
      res.status(500).send("unknown3 error");
    });
});

app.get("/api/user-data", (req, res) => {
  res.json(req.session.user);
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.send();
});

massive(process.env.CONNECTION_STRING)
  .then(database => {
    app.set("db", database);
    console.log("database is kickin");
  })
  .catch(error => {
    console.log("-------------- database issue", error);
  });

app.get("/api/myrecipes", controller.getUsersRecipes);
app.get("/api/drink", controller.readRandomDrinkAPI);
app.get("/api/recipes", controller.getRandomFourRecipes);
app.get("/api/ingredients", controller.getAllIngredients);
app.get("/api/myingredients", controller.getUsersIngredients);
app.post("/api/myingredients", controller.createIngredients);
app.delete("/api/myingredients/:id", controller.deleteIngredient);
app.delete("/api/myrecipes/:id", controller.deleteRecipeFromUsersFavorites);
app.post("/api/myrecipes", controller.addUserRecipe);
app.get("/api/matchedrecipes", controller.getRecipesThatMatchUsersPantry);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
