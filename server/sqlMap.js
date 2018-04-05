// sql语句
var sqlMap = {
    // 用户
    user: {
      add: 'insert into user(name, age) values (?, ?)',
      select : 'select * from user where username=?',
      login: 'select id,username,img,chname from user where username=? and password=?'
    },
    article: {
      add: 'insert into article(title, sortid, time, puretext, htmltext) values (?, ?)',
      search: 'SELECT * FROM (SELECT article.id AS aid,title,time,sort.id AS sid,sort.name AS sortname,htmltext,puretext FROM article,sort WHERE sortid=sort.id)a WHERE  title LIKE ? or puretext LIKE ?'
    }
  }
  
  module.exports = sqlMap
  