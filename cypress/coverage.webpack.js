const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: path.join(__dirname, '..', 'src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['istanbul']
            }
          }
        ]
      }
    ]
  }
};