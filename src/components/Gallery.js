import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import request from 'request';

import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { getEhWebPage } from '../service/UrlService';
import { getPageList } from '../service/PicService';


@withRouter
@inject('picStore')
@autobind
@observer
export default class Gallery extends Component {
  componentDidMount() {
    this.props.picStore.setState(0);
    const url = this.props.picStore.GalleryInfo.GalleryUrl;
    const web = getEhWebPage(url);
    request.get(web, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const picList = getPageList(body);
        this.props.picStore.setPictures(picList);
        this.props.picStore.setState(2);
      }
    });
  }

  goPicture(PictureUrl) {
    this.props.picStore.Picture.PictureUrl = PictureUrl;
    this.props.push('/picture');
  }

  galleryBack() {
    this.props.push('/page');
  }

  render() {
    const showvPictures = picArray => (
      <div>
        <button>{'刷新'}</button>
        <button onClick={() => this.galleryBack()}>{'返回上一级'}</button>
        {picArray.map(picObject => (
          <div key={picObject.name}>
            <Card onTouchTap={() => this.goPicture(picObject.url)}>
              <div style={picObject.style}>
                <img alt={picObject.name} src="https://ehgt.org/g/blank.gif" style={{ width: '100px', height: '140px', margin: '-1px 0 0 -1px' }} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
    const pageState = (state) => {
      switch (state) {
        case 0:
          return <CircularProgress size={60} thickness={7} />;
        case 2:
          return showvPictures(this.props.picStore.GalleryInfo.Pictures);
        default:
          return 0;
      }
    };
    return (
      <div>
        {pageState(this.props.picStore.state)}
      </div>
    );
  }
}
