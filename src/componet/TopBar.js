import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import * as Actions from "../actions/Actions"
import FluxStore from "../stores/Store"

const styles = ({
  root: {
    flexGrow: 1,
  },
  appBar: {
      backgroundColor: 'white',
      placeContent: 'center'
  },
  menuButton: {
    color: 'black'
  },
  title: {
    color: 'black',
    fontFamily: 'Nunito, sans-serif',
    position: 'relative'
  },
  spacer: {
    width: '180px'
  }
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class Topbar extends React.Component {
  constructor() {
      super();
      this.state = {
        reload: {
          open: false,
          transition: 'SlideTransition'
        },
        local: FluxStore.getLocal(),
        tab: FluxStore.getTab(),
        message: 'null'
    }

    this.reload = this.reload.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    FluxStore.on("change", () => {
        this.setState({
            local:FluxStore.getLocal(),
            tab: FluxStore.getTab(),
        })
    })
  }

  refreshButton() {
    console.log(this.state.tab)
    if(this.state.local) {
      Actions.flux("LOCAL_SELECTED")
      Actions.flux("CREATE_LOCAL")
      this.setState({
        message: 'Refreshing Games'
      })    }
    else {
      this.setState({
        message: 'Please select local file or download the Score API'
      })
    }
    return
  }


  reload() {
    this.setState(prevState => {
      let reload = Object.assign({}, prevState.reload);  
      reload.open = true;                           
      return { reload };                                 
    })
  }
  close() {
    this.setState(prevState => {
      let reload = Object.assign({}, prevState.reload);  
      reload.open = false;                           
      return { reload };                                 
    })  
  }

  render() {

    const { classes } = this.props;

    return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar className={classes.appBar}>
            <Typography variant="h6" className={classes.title}>
                Scores
            </Typography>
            <div className={classes.spacer}/>
          <IconButton onClick={() => { this.refreshButton(); this.reload();}} edge="start" className={classes.menuButton} aria-label="menu">
            <Icon className="fas fa-sync-alt" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={this.state.reload.open}
        onClose={this.close}
        TransitionComponent={SlideTransition}
        message={this.state.message} />
    </div>
  );
}
}
export default withStyles(styles)(Topbar);