const path = require('path');

module.exports = {
  entry: './src/index.js', // Path to your main JavaScript entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Inject CSS into the DOM
          'css-loader', // Turns CSS into CommonJS modules
          'postcss-loader', // Process CSS with PostCSS (for Tailwind)
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Adjust as necessary for your project
  },
  devServer: {
    contentBase: './dist',
  },
};
