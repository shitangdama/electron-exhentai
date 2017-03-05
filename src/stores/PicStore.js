import { observable, computed, action } from 'mobx';
import singleton from 'singleton';
// 这里出了一个问题
// 不应该是打开一页面就读取一张
// 维护本子的所有信息
class PicStore extends singleton {
  // 需要一个状态机,
  @observable state = 0;
  constructor() {
    super();
    // 所有基础信息
// 本子列表
    this.Galleries = [];
    // 一个本子的图片列表
    // this.Pictures = [];
    // 一个本子的信息
    this.GalleryInfo = {};
    // 需要有一个维护所有图片地址的
    this.picList = [];
    // 当前图片的地址
    this.Picture = {};
  }

  setGalleries(galleries) {
    if (galleries) {
      if (galleries instanceof Array) {
        this.Galleries = galleries;
      } else {
        this.Galleries.push(galleries);
      }
    }
  }

  setPictures(pictures) {
    if (this.GalleryInfo.Pictures) {
      this.GalleryInfo.Pictures = [];
    }
    if (pictures) {
      if (pictures instanceof Array) {
        this.GalleryInfo.Pictures = pictures;
      } else {
        this.GalleryInfo.Pictures.push(pictures);
      }
    }
  }
  @computed get getGalleries() {
    return this.Galleries;
  }
  @action setState(n) {
    if (this.state !== 0 || n !== 0) {
      this.state = n;
    }
  }
}
export default PicStore;
