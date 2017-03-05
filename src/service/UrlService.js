
const ua = ['Mozilla/5.0 (Windows NT 5.2) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.122 Safari/534.30',
  'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0',
  'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; ',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2; ',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)'];

export { ua };

export function getEhWeb() {
  return {
    url: 'https://e-hentai.org/?inline_set=dm_t',
    headers: { 'User-Agent': ua[0] },
  };
}

export function getEhWebPage(urlString) {
  return {
    url: urlString,
    headers: { 'User-Agent': ua[0] },
  };
}

export function getLoginInfo(username, password) {
  return {
    url: 'https://forums.e-hentai.org/index.php?act=Login&CODE=01',
    headers: {
      'User-Agent': ua[0],
    },
    form: {
      UserName: username,
      returntype: '8',
      CookieDate: '1',
      b: 'd',
      bt: 'pone',
      PassWord: password,
    },
  };
}
