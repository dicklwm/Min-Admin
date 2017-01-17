export default {

  'POST /api/login': (req, res) => {
    const response = {
      success: true,
      message: '登陆成功'
    }
    res.json(response);
  },

  'POST /api/logout' (req, res) {
    const response = {
      success: true,
      message: '退出成功'
    };
    res.json(response);
  },

  'GET /api/userInfo' (req, res) {
    const response = {
      message: ''
    }
    res.json(response)
  },

};
