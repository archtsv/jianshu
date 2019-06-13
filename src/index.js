import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './style';
import Iconfont from './statics/iconfont/iconfont';

const Root = (
  <Fragment>
    <GlobalStyle />
    <Iconfont />
    <App />
  </Fragment>
);

ReactDOM.render(Root, document.getElementById('root'));
