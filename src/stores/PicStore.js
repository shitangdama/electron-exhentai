import { observable, computed, action } from 'mobx';
import singleton from 'singleton';
// 从目前来看不需要使用数据观察对象，只需要对状态进行管理
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
    // 一张图片的地址
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
