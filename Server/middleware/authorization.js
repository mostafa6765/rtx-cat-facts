export const authorization = (req, res, next) => {
  const theAuthorization = req.headers.authorization
  if (!theAuthorization) {
    return res.status(401).json({
      status: 401,
      message: 'UNAUTHORIZED'
    })
  } else {
    next()
  }
}