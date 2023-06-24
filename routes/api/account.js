// 与账单相关的接口
var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')

const AccountModel = require('../../models/AccountModel')

// moment包--可以将字符串形式的日期转化为Date格式
const moment = require('moment')
// console.log(moment('2023-02-24').toDate());

const shortid = require('shortid');

let checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

// 记账本的列表
router.get('/account', checkTokenMiddleware, function(req, res, next) {
    console.log(req.user);
    AccountModel
    .find()
    .sort(
      {
        time: -1
      }
    )
    .exec(
      (err, data) => {
        if(err) {
          res.json({
            // 响应编号
            code: '1001', // 状态码200×100 或者 0000
            // 响应信息
            msg: '读取失败',
            // 响应数据
            data: null
          })
          return
        }
        // 响应成功的提示：
        res.json({
          // 响应编号
          code: '0000', // 状态码200×100 或者 0000
          // 响应信息
          msg: '读取成功',
          // 响应数据
          data: data
        })
      }
    )
  }
);

// 新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
  // 获取请求体数据
  // console.log(req.body);
  AccountModel.create(
    {
      ...req.body,
      time: moment(req.body.time).toDate()
    },
    (err, data) => {
      if(err) {
        res.json({
          code: "1002",
          msg: "添加失败",
          data: null //因为添加失败
        })
        return
      }
      // 成功提醒
      res.json({
        code: '0000',
        msg: '创建成功',
        data: data
      })
    }
  )
})

// 删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  // 用id做标识
  let id = req.params.id
  AccountModel.deleteOne(
    {
      _id: id
    },
    (err, data) => {
      if(err) {
        // 删除失败的提醒
        res
        .json({
          code: "1003",
          msg: "删除失败",
          data: null
        })
      }
      // 删除成功的提醒
      res
      .json({
        code: "0000",
        msg: "删除成功",
        data: {} //写null也可以
      })
    }
  )
})

// 读取单条记录
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
  // 用id做标识
  let id = req.params.id
  AccountModel.findById(
    {
      _id: id
    },
    (err, data) => {
      if(err) {
        // 删除失败的提醒
        return res
        .json({
          code: "1004",
          msg: "读取失败",
          data: null
        })
      }
      // 删除成功的提醒
      res
      .json({
        code: "0000",
        msg: "读取成功",
        data: data //写null也可以
      })
    }
  )
})


module.exports = router;
