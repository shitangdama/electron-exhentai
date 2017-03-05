import cheerio from 'cheerio';

export function getGalleriesList(body) {
  const galleriesArray = [];
  const $ = cheerio.load(body);
  const galleries = $('.id1');
  for (let i = 0; i < galleries.length; i += 1) {
    const gallery = {};
    gallery.name = $('.id2 a', galleries[i]).text();
    gallery.picture = $('.id3 a img', galleries[i]).attr('src');
    gallery.url = $('.id3 a', galleries[i]).attr('href');
    galleriesArray.push(gallery);
  }
  return galleriesArray;
}

export function getPageList(body) {
  const picList = [];
  const $ = cheerio.load(body);
  const pictures = $('.gdtm');
  for (let i = 0; i < pictures.length; i += 1) {
    const picture = {};
    picture.name = $('a img', pictures[i]).attr('alt');
    picture.picture = $('div', pictures[i]).attr('style');
    const styleArray = picture.picture.split(';');
    picture.style = {};
    for (let j = 0; j < styleArray.length; j += 1) {
      const index = styleArray[j].indexOf(':');
      const key = styleArray[j].slice(0, index).replace(/(^\s*)|(\s*$)/g, '');
      const value = styleArray[j].slice(index + 1, styleArray[j].length);
      picture.style[key] = value;
    }
    picture.url = $('a', pictures[i]).attr('href');
    picList.push(picture);
  }
  return picList;
}

export function getPic(body) {
  const $ = cheerio.load(body);
  const picture = {};
  picture.pictureUrl = $('#img').attr('src');
  picture.prevPicUrl = $('#prev').attr('href');
  picture.nextPicUrl = $('#next').attr('href');
  return picture;
}
