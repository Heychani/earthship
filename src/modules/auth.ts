import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id, 
    username: user.username
  },
    process.env.JWT_SECRET
  );
  return token
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401)
    res.json({message: 'Not Authorized'})
    return
  }

  const [, token] = bearer.split(' ')

  if (!token) {
    res.status(401)
    res.json({message: "Not valid token"})
    return
  }

  try { // helps that the server doesn't break when somethings doesn't work
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(user)
    next()
  } catch (e) {
    console.error(e)
    res.status(401)
    res.send({message: "Not valid token"})
    return
  }
}