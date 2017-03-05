import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import request from 'request';

import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { getEhWeb } from '../service/UrlService';
import { getGalleriesList } from '../service/PicService';

@withRouter
@inject('picStore')
@autobind
@observer
export default class Page extends Component {
  componentDidMount() {
    if (!(this.props.picStore.Galleries.length > 0)) {
      this.props.picStore.setState(0);
      const webUrl = getEhWeb();
      request.get(webUrl, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const galleries = getGalleriesList(body);
          this.props.picStore.setGalleries(galleries);
          this.props.picStore.setState(1);
        }
      });
    } else {
      this.props.picStore.setState(1);
    }
  }

  goGallery(galleryUrl) {
    this.props.picStore.GalleryInfo.GalleryUrl = galleryUrl;
    this.props.push('/gallery');
  }
//           <button onClick={() => this.goGallery(picObject.url)} key={picObject.name}>
  render() {
    const showvGalleriesPic = picArray => (
      <div>
        <button>{'刷新'}</button>
        {picArray.map(picObject => (
          <div key={picObject.name}>
            <Card onTouchTap={() => this.goGallery(picObject.url)}>
              <img
                alt={picObject.name}
                src={picObject.picture}
              />
            </Card>
          </div>
        ))}
      </div>
    );

    const pageState = (state) => {
      switch (state) {
        case 0:
          return <CircularProgress size={60} thickness={7} />;
        case 1:
          return showvGalleriesPic(this.props.picStore.Galleries);
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
