const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

// 初始化数据
// Set some defaults
db.defaults({ posts: [], user: {} })
  .write()

db.get('posts')
  .push({
    id: 1,
    title: '今天天气还不错'
  })
  .write()
