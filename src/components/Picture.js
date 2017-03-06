import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CircularProgress from 'material-ui/CircularProgress';
import autobind from 'autobind-decorator';
import { getEhWebPage } from '../service/UrlService';
import { getPic } from '../service/PicService';
import { withRouter } from 'react-router-dom';

const remote = window.require('electron').remote;
const request = remote.require('request');

@withRouter
@inject('picStore')
@autobind
@observer
export default class Picture extends Component {
  componentDidMount() {
    this.props.picStore.setState(0);
    const url = this.props.picStore.Picture.PictureUrl;
    this.getPic(url);
  }

  getPic(url) {
    this.props.picStore.setState(0);
    const web = getEhWebPage(url);
    request.get(web, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const picture = getPic(body);
        this.props.picStore.Picture = picture;
        this.props.picStore.setState(3);
      }
    });
  }
// 获取上一张图片
  getPrevPic() {
    this.getPic(this.props.picStore.Picture.prevPicUrl);
  }
// 获取下一张图片
  getNextPic() {
    this.getPic(this.props.picStore.Picture.nextPicUrl);
  }
// 返回上一级
  picBack() {
    this.props.push('/gallery');
  }

  render() {
    const showPicture = () => (
      <div>
        <button onClick={() => this.getPrevPic()}>{'上一页'}</button>
        <button onClick={() => this.getNextPic()}>{'下一页'}</button>
        <button onClick={() => this.picBack()}>{'返回上一级'}</button>
        <Card>
          <img
            alt={this.props.picStore.Picture.pictureUrl}
            src={this.props.picStore.Picture.pictureUrl}
          />
        </Card>
      </div>
    );

    const pageState = (state) => {
      switch (state) {
        case 0:
          return <CircularProgress size={60} thickness={7} />;
        case 3:
          return showPicture();
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
