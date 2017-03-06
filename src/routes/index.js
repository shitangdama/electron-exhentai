import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Gallery from '../components/Gallery';
import Home from '../components/Home';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Page from '../components/Page';
import Picture from '../components/Picture';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const supportsHistory = 'pushState' in window.history;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <Router forceRefresh={!supportsHistory}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <AppBar
              title="Title"
              iconElementLeft={<IconButton>
                <NavigationMenu onTouchTap={this.handleToggle} /></IconButton>}
            />
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={open => this.setState({ open })}
            >
              <Link to="/page"><MenuItem onTouchTap={this.handleClose}>Home</MenuItem></Link>
              <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
            </Drawer>
            <Route exact path="/" component={Home} />
            <Route path="/page" component={Page} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/picture" component={Picture} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}
