const jwt = require('jsonwebtoken')
const {
  secretKey
} = require('../config/config')
module.exports = (req, res, next) => {
    // 获取token
    let token = req.get(
      'token'
    )
    // 判断是否存在token
    if (!token) {
      return res.json(
        {
          code: '2005',
          msg: 'token缺失',
          data: null
        }
      )
    }
    // token校验
    jwt.verify(
      token,
      secretKey,
      (err, data) => {
        if (err) {
          return res
          .json(
            {
              code: '2006',
              msg: 'token校验失败',
              data: null
            }
          )
        }
        // 保存用户信息
        req.user = data
        // 如果token校验成功
        next()
      }
    )
  }