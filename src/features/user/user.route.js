let auth=module.exports = {}
const User = require("./user.model");
const jwt = require("jsonwebtoken");



auth.signup=async (req, res) => {
  const { name, email, password, age, gender } = req.body;

  try {
    let user = await User.findOne({ email, password });
    if (user) {
      return res.status(409).send("User Already Created");
    } else {
      const newUser = new User({ name, email, password, age, gender });

      await newUser.save();
      return res.status(201).send("User created successfully");
    }
  } catch (e) {
    return res.send(`${e.status} ${e.message}`);
  }
}

auth.login= async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  try{

    if (user) {
      const token = jwt.sign(
        { id: user._id, name: user.name, age: user.age },
        "BLOG109",
        {
          //also give EXP in response
          expiresIn: "1 hr",
        }
      );
  
      const refreshToken = jwt.sign({}, "BLOGREFRESHTOKEN109", {
        expiresIn: "7 days",
      });
      var date = new Date();
  var tokenExpire = date.setTime(date.getTime() + (360 * 1000));
      res.status(201)
     .cookie('token', token, { maxAge: tokenExpire, httpOnly: true })
     .send();
      // res.cookie("aman",token,{
      //   httpOnly:true
      // })
  
      
      //  return res.send({ message: "Login Successfully", token, refreshToken });
    }
  }catch(e){

     res.status(401).send("invalid Credentials");
  }
}

//for refresh token

auth.refresh= (req, res) => {
  const refreshToken = req.headers["authorization"];
  if (!refreshToken) {
    return res.status(401).send("unauthorized");
  }
  try {
    const verification = jwt.verify(refreshToken, "BLOGREFRESHTOKEN109");
    console.log(verification);
    if (verification) {
      const newToken = jwt.sign(
        { id: verification.id, name: verification.name, age: verification.age },
        "SECRET1234",
        { expiresIn: "5 mins" }
      );
      return res.send({ token: newToken });
    }
  } catch (e) {
    res.send(e.message);
  }
}


