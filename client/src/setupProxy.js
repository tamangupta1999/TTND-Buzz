const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/auth/google', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/auth/google/callback', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/currentUser', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/logout', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/user/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/user/update/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/uiconfig', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/uiConfig/update/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/complaint/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/buzz/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/buzz/all/**', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/buzz/update/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/buzz/like/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/buzz/dislike/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/complaint/all/**', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/complaint/update/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/complaint/update/status/*', { target: 'http://localhost:4000/' }));
    app.use(createProxyMiddleware('/complaint/add/comment/*', { target: 'http://localhost:4000/' }));
};
