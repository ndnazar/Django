const path = require('path');

module.exports = {
  entry: {
    main: './src/TextBoxindex',
    another: './src/TransactionTypeindex',
    multiline: './src/MultilineTextboxindex',
    income: './src/P&Lgridindex',
    stage: './src/DealStageindex',
    industry: './src/Industryindex',
    date: './src/CloseDateindex',
    placeholder: './src/Placeholderindex',
    projectID: './src/ProjectIDindex',
    save: './src/SaveProjectindex'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
