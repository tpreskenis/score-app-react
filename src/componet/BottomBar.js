import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import * as Actions from "../actions/Actions"

const styles = ({
  root: {
    bottom: '0',
    position: 'fixed',
    width: '100%'
  },
  basketball: {
    color: 'orange !important'
  },
  baseball: {
    color: 'crimson !important'
  },
  info: {
    color: 'dodgerblue !important'
  }
});
class BottomBar extends React.Component {
  constructor() {
      super();
      this.state = {
        selected: false,
        value: 'BASKETBALL'
      }
  }

  updateSelection(value) {
    this.setState({
      value: value
    })
    Actions.flux(value)
  }

  render() {
    
  const { classes } = this.props;

  return (
    <BottomNavigation
      value={this.state.value}
      onChange={(event, newValue) => {
        this.updateSelection(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction className={`${this.state.value === 'BASKETBALL' ? classes.basketball: null}`} label="Basketball" value="BASKETBALL" icon={<Icon className="fas fa-basketball-ball" />} />
      <BottomNavigationAction className={`${this.state.value === 'BASEBALL' ? classes.baseball: null}`} label="Baseball" value="BASEBALL" icon={<Icon className="fas fa-baseball-ball" />} />
      <BottomNavigationAction className={`${this.state.value === 'INFO' ? classes.info: null}`} label="Info" value="INFO" icon={<Icon className="fas fa-info-circle" />} />
    </BottomNavigation>
  );
}
}
export default withStyles(styles)(BottomBar);