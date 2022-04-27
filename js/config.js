axios.defaults.baseURL = 'http://www.itcbc.com:8000';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('user');

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    let token = localStorage.getItem('user');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});