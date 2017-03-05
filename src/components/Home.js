import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { getLoginInfo } from '../service/UrlService';

const remote = window.require('electron').remote;
const request = remote.require('request');
// const tough = remote.require('tough-cookie');
// const Cookie = tough.Cookie;

const key = {
  method: 'gdata',
  gidlist: [['618395', '0439fa3666']],
  namespace: 1,
};
//
// // 需要一个登录页面
@inject('AuthStore')
@autobind
@observer
export default class Home extends Component {

  // constructor() {
  //   super();
  // }
  componentDidMount() {
    // this.username;
    // ...do something with component
    // console.log(this.props)
  }
  getInfo(e) {
    const option = this.props.AuthStore.getExInfo(key);
    request.post(option, (error, response, body) => {
      console.log(response.statusCode);
      console.log(decodeURI(body));
    });
    e.preventDefault();
  }

  login(e) {
    if (this.props.AuthStore.isLoggedIn) {
      const option = getLoginInfo('sd5shi', '1990117');
      const j = request.jar();
      option.jar = j;
      console.log(option);
      request.post(option, (error, response) => {
        console.log(error);
        if (!error && response.statusCode === 200) {
          const cookies = j.getCookies(option.url);
          this.props.AuthStore.setCookie(cookies);
          console.log('dengluchenggong1');
        }
      });
    }
  //   this.props.AuthStore.login(this.username.value.trim(), this.password.value.trim())
  //   .then(() => {
  //     console.log('11111111111111111');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
    e.preventDefault();
  }
  render() {
    return (
      <div>{this.props.AuthStore.user}
        <button className="button" onClick={this.login}>{'登录'}</button>
        <button className="button" onClick={this.getInfo}>{'获取'}</button>
      </div>
    );
  }
}
