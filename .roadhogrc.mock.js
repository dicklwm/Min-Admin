export default {
  'POST /api/auth/login': (req, res) => {

    //roadhog作者还没有把body加上去，所以这里先硬编码
    // console.log(req.body);

    res.end(JSON.stringify({
      data: {
        user: {
          nickname: 'admin',
        }
      },
      errcode: 0
    }));
  },

  'POST /api/auth/logout': (req, res) => {
    res.end(JSON.stringify({
      errcode: 0
    }));
  }

};
