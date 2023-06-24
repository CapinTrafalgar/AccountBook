var express = require('express');
var router = express.Router();
const {
  secretKey
} = require('../../config/config')
// 导入用户模型UserModel
const UserModel = require('../../models/UserModel')

// 导入MD5加密模块
const md5 = require('md5')
// 导入JWT
const jwt = require('jsonwebtoken');

// 登录
router.post(
  '/login',
  (req, res) => {
    // 获取用户名和密码
    let {
      username,
      password
    } = req.body
    // 查询数据库
    UserModel.findOne(
      {
        username: username,
        password: md5(password)
      },
      (err, data) => {
        if (err) {
          res
          .status(500)
          .send('注册失败')

          res
          .json(
            {
              code: '2001',
              msg: '数据库读取失败',
              data: null
            }
          )

          return
        }
        if (!data) {
          return res
          .json(
            {
              code: '2001',
              msg: '用户名或密码错误',
              data: null
            }
          )
        }

        let token = jwt.sign(
          {
            username: data.username,
            _id: data._id
          },
          secretKey,
          {
            expiresIn: 60 * 60 * 24 * 7
          }
        )
        // 响应token
        res
        .json(
          {
            code: '0000',
            msg: '登录成功',
            data: token
          }
        )

        // 登录成功的响应
        res.render(
          'success',
          {
            msg: '登录成功',
            url: '/account'
          }
        )
      }
    )
  }
)

// 退出登录
router.get(
  '/logout',
  (req, res) => {
    // 退出登录的话，销毁session就可以了
    req.session.destroy(
      () => {
        res.render(
          'success',
          {
            msg: '退出登录成功',
            url: '/login'
          }
        )
      }
    )
  }
)

module.exports = router;
