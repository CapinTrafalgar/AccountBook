// 声明中间件函数进行登录校验
module.exports = (req, res, next) => {
    // 通过session进行用户登录状态的校验
    if (!req.session.username) {
      return res.redirect('/login')
    }
    next()
}