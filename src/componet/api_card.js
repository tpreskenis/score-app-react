import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


import * as Actions from "../actions/Actions"
import FluxStore from "../stores/Store"

const styles = ({
  root: {
    transition: 'all 0.3s ease',
    marginTop: 15,
    minWidth: 275,
    borderRadius: '15px',
    display: 'block'
  },
  infoGit: {
    fontSize: 18,
  },
  smallinfoGit: {
    fontSize: 12,
    marginBottom: '15px',
  },
  selectDocument: {
    backgroundColor: 'rgb(0, 165, 14)',
    color: 'white !important',
  },
  hover: {
    color: 'rgb(0, 165, 14) !important',
  },
  pos: {
    marginBottom: 12,
  },
  cardContent: {
    textAlign: 'center'
  },
  iconButtons: {
    marginTop: '15px',
    marginBottom: '15px',
    color: 'black',
    boxShadow: '1px 2px 22px 0px rgb(89 87 87 / 85%)'    
  },
  invisible: {
    opacity: 0
  },
  noDisplay: {
    display: 'none'
  }
});



class Scorecard extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: FluxStore.getTab(),
            active: false,
            hoverLocal: true,
            hoverBackground: false,
            turnInvisible: false,
            removeDisplay: false,
            activeApi: false,
            hoverApi: true,
            hoverBackgroundApi: false,
        }
    }
    componentDidMount() {
      FluxStore.on("change", () => {
            this.setState({
                tab:FluxStore.getTab(),
            })
          if(FluxStore.getSelected()) {
            this.setState({
              turnInvisible: true
            })
            setTimeout(function(){
              document.getElementById("api_card").innerHTML = "";
            }, 300);
          }
          if (FluxStore.getTab() === 'INFO') {
            this.setState({
              turnInvisible: true
            })
            setTimeout(() => {
              this.setState({
                removeDisplay: true
              })
            }, 300);
          }
          if ((FluxStore.getTab() === 'BASEBALL' || FluxStore.getTab() === 'BASKETBALL') && this.state.turnInvisible) {
            setTimeout(() => {
              this.setState({
                removeDisplay: false,
              });
              setTimeout(() => {
                this.setState({
                  turnInvisible: false
                });
                
              }, 100);
            }, 300);
          }
        })
    }

    toggleClass() {
      const currentState = this.state.active
      this.setState({ active: !currentState})
      if (this.state.activeApi === true) {
        this.setState({ activeApi: currentState})
      }
      if (currentState) {
        Actions.flux("TOGGLE_LOCAL_OFF")
      }
      else {
        Actions.flux("TOGGLE_LOCAL_ON")
        Actions.flux("TOGGLE_API_OFF")
      }
    }
    toggleHoverLocal() {
      const currentState = this.state.hoverLocal
      this.setState({hoverLocal: !currentState})
      if (this.state.hoverLocal && this.state.active) {
        this.setState({ hoverBackground: true})
      }
      else {
        this.setState({ hoverBackground: false})
      }
    }

    toggleHoverApi() {
      const currentState = this.state.hoverApi
      this.setState({hoverApi: !currentState})
      if (this.state.hoverApi && this.state.activeApi) {
        this.setState({ hoverBackgroundApi: true})
      }
      else {
        this.setState({ hoverBackgroundApi: false})
      }
    }

    toggleApiClass() {
      const currentState = this.state.activeApi
      this.setState({ activeApi: !currentState})
      if (this.state.active === true) {
        this.setState({ active: currentState})
      }
      if (currentState) {
        Actions.flux("TOGGLE_API_OFF")
      }
      else {
        Actions.flux("TOGGLE_LOCAL_OFF")
        Actions.flux("TOGGLE_API_ON")
        Actions.flux("CREATE_API")
      }
    }

    githubLink(){
      const url = 'https://github.com/tpreskenis/score-api';
      window.open(url, '_blank');
    }


  render() {
  const { classes } = this.props;


  return (
    <Card id='api_card' className={`${classes.root} ${this.state.turnInvisible ? classes.invisible: null} ${this.state.removeDisplay ? classes.noDisplay: null}`}>
      <CardContent className={classes.cardContent}>
        <IconButton className={`${classes.iconButtons} ${this.state.active ? classes.selectDocument: null} ${this.state.hoverBackground ? classes.hover: null}`} onMouseEnter={this.toggleHoverLocal.bind(this)} onMouseLeave={this.toggleHoverLocal.bind(this)} color="primary" size='medium' aria-label="run localy" onClick={this.toggleClass.bind(this)}>
          <Icon fontSize="large" className="fas fa-file-code" />
        </IconButton>   
        <Typography className={classes.infoGit} gutterBottom>
          Read from local json files
        </Typography>
        <Typography className={classes.smallinfoGit} gutterBottom>
          Once clicked, press the refresh button above. (Built-in)
        </Typography>
        <div>
          <Divider variant="middle" />
        </div>

        <IconButton className={`${classes.iconButtons} ${this.state.activeApi ? classes.selectDocument: null} ${this.state.hoverBackgroundApi ? classes.hover: null}`} onMouseEnter={this.toggleHoverApi.bind(this)} onMouseLeave={this.toggleHoverApi.bind(this)} color="primary" onClick={this.toggleApiClass.bind(this)}>
          <Icon fontSize="large" className="fas fa-stream" />
        </IconButton>          
        <Typography className={classes.infoGit} gutterBottom>
          Use API
        </Typography>
        <Typography className={classes.smallinfoGit} gutterBottom>
          Once API is running, click press the refresh button above.
        </Typography>
        <div>
          <Divider variant="middle" />
        </div>
        <IconButton className={classes.iconButtons} color="primary" aria-label="go to github" onClick={this.githubLink}>
          <Icon fontSize="large" className="fab fa-github" />
        </IconButton>          
        <Typography className={classes.infoGit} gutterBottom>
          GitHub
        </Typography>
        <Typography className={classes.smallinfoGit} gutterBottom>
          API location in GitHub <br/>
          (Please note you will have to request access)
        </Typography>
      </CardContent>
    </Card>
  );
}
}
export default withStyles(styles)(Scorecard);
