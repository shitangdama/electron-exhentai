import { observable, computed, action } from 'mobx';
import singleton from 'singleton';

import { ua } from '../service/UrlService';

const remote = window.require('electron').remote;
const request = remote.require('request');
const tough = remote.require('tough-cookie');


// 登录类，用于存储登录信息
class Auth extends singleton {
// 用于判断是否登录
  @observable cookie = null;
  constructor() {
    super();
    this.cookie = null;
  }
  @computed get isLoggedIn() {
    return this.cookie === null;
  }
  @action setCookie(cookies) {
    const exCookies = request.jar();
    cookies.forEach((item) => {
      const tmpJSON = item.toJSON();
      if (tmpJSON.key === 'ipb_member_id' || tmpJSON.key === 'ipb_pass_hash') {
        tmpJSON.domain = 'exhentai.org';
        console.log(tough.fromJSON(tmpJSON));
        exCookies.setCookie(tough.fromJSON(tmpJSON), 'https://exhentai.org');
        this.cookie = exCookies;
      }
    });
  }
  // @action setExCookie(cookie){
  //   if (tmpJSON.key === 'ipb_member_id' || tmpJSON.key === 'ipb_pass_hash') {
  //     tmpJSON.domain = 'exhentai.org';
  //     console.log(tough.fromJSON(tmpJSON));
  //     exCookies.setCookie(tough.fromJSON(tmpJSON), 'https://exhentai.org');
  //     this.cookie = exCookies;
  //   }
  // }
  getExInfo(form) {
    return {
      url: 'https://exhentai.org/api.php/',
      headers: {
        'User-Agent': ua[0],
      },
      jar: this.cookie,
      form: JSON.stringify(form),
    };
  }
  @computed get ExInitWeb() {
    //  要多判断一个cookie
    return { url: 'https://exhentai.org/?f_doujinshi=on&f_manga=on&f_artistcg=on&f_gamecg=on&f_western=on&f_non-h=on&f_imageset=on&f_cosplay=on&f_asianporn=on&f_misc=on&f_search=chinese&f_apply=Apply+Filter&inline_set=dm_t',
      headers: { 'User-Agent': ua[0] },
      jar: this.cookie };
  }
}

export default Auth;
