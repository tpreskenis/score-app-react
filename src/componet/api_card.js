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
  selectDocument: {
    backgroundColor: 'rgb(0, 165, 14)',
    color: 'white !important',
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
            turnInvisible: false,
            removeDisplay: false,
        }
    }
    componentDidMount() {
      FluxStore.on("change", () => {
            this.setState({
                tab:FluxStore.getTab(),
            })
          if(FluxStore.getLocalSelected()) {
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
      if (currentState) {
        Actions.flux("TOGGLE_LOCAL_OFF")
      }
      else {
        Actions.flux("TOGGLE_LOCAL_ON")
      }
    }

    createTodo() {
        this.toggleClass();
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
        <IconButton className={`${classes.iconButtons} ${this.state.active ? classes.selectDocument: null}`} color="primary" size='medium' aria-label="run localy" onClick={this.createTodo.bind(this)}>
          <Icon fontSize="large" className="fas fa-file-code" />
        </IconButton>   
        <Typography className={classes.infoGit} gutterBottom>
          Read from local json files.  Once clicked, press the refresh button above. (Built-in)
        </Typography>
        <div>
          <Divider variant="middle" />
        </div>
        <IconButton className={classes.iconButtons} color="primary" aria-label="go to github" onClick={this.githubLink}>
          <Icon fontSize="large" className="fab fa-github" />
        </IconButton>          
        <Typography className={classes.infoGit} gutterBottom>
          Run API - Download from Github/Run and refresh.  (Please note you will have to request access).
        </Typography>
      </CardContent>
    </Card>
  );
}
}
export default withStyles(styles)(Scorecard);
