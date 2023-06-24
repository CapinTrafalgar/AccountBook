var express = require('express');
var router = express.Router();

// 数据存储到数据库了，用不到斜面这些了
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
 
// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)

const AccountModel = require('../../models/AccountModel')

// moment包--可以将字符串形式的日期转化为Date格式
const moment = require('moment')
// console.log(moment('2023-02-24').toDate());

const shortid = require('shortid')

// 声明中间件函数进行登录校验
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

// 记账本的列表
router.get('/account', checkLoginMiddleware, function(req, res, next) {

  // let accounts = db.get('accounts').value()
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
        res.status(500).send('读取失败！')
        return
      }
      res.render(
        'list',
        {
          accounts: data,
          moment: moment
        }
      );
    }
  )
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  // 获取请求体数据
  // 写入文件
  let id = shortid.generate()
  db.get('accounts')
    .unshift({
      id: id,
      ...req.body
    })
    .write()
  // console.log(req.body);
  AccountModel.create(
    {
      ...req.body,
      time: moment(req.body.time).toDate()
    },
    (err, data) => {
      if(err) {
        res.status(500).send('插入失败！')
        return
      }
      // 成功提醒
      res.render(
        'success',
        {
          msg: '添加成功！！！',
          url: '/account'
        }
      )
    }
  )
})

// 删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
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
          .status(500)
          .send('删除失败！')
      }
      // 删除成功的提醒
      res.render(
        'success',
        {
          msg: '删除成功！！！',
          url: '/account'
        }
      )
    }
  )
})

module.exports = router;
