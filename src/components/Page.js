import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import CircularProgress from 'material-ui/CircularProgress';
import autobind from 'autobind-decorator';
import { getEhWeb } from '../service/UrlService';
import { getGalleriesList } from '../service/PicService';
import refresh from '../stylecomponents/refresh'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const remote = window.require('electron').remote;
const request = remote.require('request');

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
        <refresh>{'刷新'}</refresh>
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
