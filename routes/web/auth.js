var express = require('express');
var router = express.Router();

// 导入用户模型UserModel
const UserModel = require('../../models/UserModel')

// 导入MD5加密模块
const md5 = require('md5')

// 注册页面
router.get(
  '/reg',
  (req, res) => {
    // 响应HTML
    res.render(
      'auth/reg'
    )
  }
)

// 注册
router.post(
  '/reg',
  (req, res) => {
    // 表单验证
    // 将注册信息存入数据库
    UserModel.create(
      {
        ...req.body,
        password: md5(req.body.password)
      },
      (err, data) => {
        if (err) {
          res
          .status(500)
          .send('注册失败')
          return
        } 
        res.render(
          'success',
          {
            msg: '注册成功',
            url: '/login'
          }
        )
      }
    )
  }
)

// 登录页面
router.get(
  '/login',
  (req, res) => {
    res
    .render(
      'auth/login'
    )
  }
)

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
          return
        }
        if (!data) {
          return res.send('账号或密码错误')
        } 
        // 写入session
        req.session.username = data.username
        req.session._id = data._id

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
