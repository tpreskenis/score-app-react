import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import FluxStore from "../../stores/Store";

// Team Images
import logo1 from "../../assets/team_logo/basketball/miami-heat-logo.png"
import logo2 from "../../assets/team_logo/basketball/oklahoma-city-thunder-logo.png"


const styles = ({
  root: {
    minWidth: 275,    
    borderRadius: '15px',
    marginTop: 15,
    marginBottom: 65,
  },
  scoreboardLarge: {
    paddingBottom: '0px'
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  centerButton: {
    display: 'flex',
    justifyContent: 'center'
  },

  container: {
    display: 'flex',
    placeContent: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    maxWidth: '100px',
  },
  divider: {
    height: '40px',
    width: '2px',
    alignSelf: 'center'
  },
  dividers: {

  },
  score: {
    color: 'black',
    fontSize: '62px'
  },
  lose: {
    color: 'grey !important',
  },
  scoreboardAll: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    flexFlow: 'column',
    padding: '20px',
  },
  scoreboardEach: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  bottomScoreRow: {
    marginTop: '0.35em'
  },


  title: {
    fontSize: 18,
  },

  normalFlex: {
    flexGrow: 1,
    flexBasis: 0,
  },
  largeFlex: {
    flexGrow: 2,
    flexBasis: 0,
  },

  header: {
    fontWeight: 600,
    color: 'gray',
  },
  display: {
    transition: 'all 0.3s ease',
    display: 'block',
    opacity: 0
  },
  visible: {
    transition: 'all 0.3s ease',
    opacity: 1
  }
});



class Scorecard extends React.Component {
    constructor() {
        super();
        this.state = {
            makeDisplay: false,
            makeVisible: false,
            expanded: false,

            // Data
            mlbData: FluxStore.getMLBData(),
            scoreHome: 0,
            scoreAway: 0,
            winHome: false,
            winAway: false,
            tie: false,
            home: "",
            away: "",

            // Scoreboard
            scoreHome1: 0,
            scoreHome2: 0,
            scoreHome3: 0,
            scoreHome4: 0,
            scoreAway1: 0,
            scoreAway2: 0,
            scoreAway3: 0,
            scoreAway4: 0,
        }
    }
    componentDidMount() {
        FluxStore.on("change", () => {
            this.setState({
                // In case we need call backs
                refreshed: FluxStore.getSelected(),
                mlbData: FluxStore.getMLBData()
            })
            
            const nbaDataOverall = FluxStore.getNBAData()

            if (nbaDataOverall !== 'Null') {
              const datahome = nbaDataOverall.home_period_scores.reduce((a, b) => {
                return a + b;
              });   
              const dataaway = nbaDataOverall.away_period_scores.reduce((a, b) => {
                return a + b;
              });     
              // Sets Winner
              if (nbaDataOverall.event_information.status === 'completed') {
                if (datahome > dataaway) {
                  this.setState({ winHome: true })  
                  }
                else if (datahome < dataaway) {
                  this.setState({ winAway: true })  
                }
                else {
                  this.setState({ tie: true })  
                }
              }
              // Set Teamname 
              this.setState({
                home: nbaDataOverall.home_team.abbreviation,
                away: nbaDataOverall.away_team.abbreviation,
              })    
              // Sets Score (Overall)
              this.setState({
                scoreHome: datahome,
                scoreAway: dataaway,
              })    
              // Sets Score (Inning)
              this.setState({
                scoreHome1: nbaDataOverall.home_period_scores[0],
                scoreHome2: nbaDataOverall.home_period_scores[1],
                scoreHome3: nbaDataOverall.home_period_scores[2],
                scoreHome4: nbaDataOverall.home_period_scores[3],
                scoreAway1: nbaDataOverall.away_period_scores[0],
                scoreAway2: nbaDataOverall.away_period_scores[1],
                scoreAway3: nbaDataOverall.away_period_scores[2],
                scoreAway4: nbaDataOverall.away_period_scores[3],
              })     
            }
            
            
            if(FluxStore.getSelected()) {
              setTimeout(() => {
                this.setState({
                  makeDisplay: true
                });
                setTimeout(() => {
                  this.setState({
                    makeVisible: true
                  });
                  
                }, 100);
              }, 300);
            }
        })
    }
  
    handleExpandClick = () => {
      this.setState({
          expanded: !this.state.expanded
      })
    }

  render() {

  const { classes } = this.props;

  return (
    <Card className={`${classes.root}`}>
      <CardContent className={`${classes.scoreboardLarge}`}>
        <div className={`${classes.container}`}>
          <img src={logo1} className={`${classes.logo}`} alt='logo 1'></img>
          <Divider orientation="vertical"/>
          <img src={logo2} className={`${classes.logo}`} alt='logo 2'></img>
        </div>
        <div className={`${classes.container}`}>
          <Typography className={`${classes.score} ${this.state.winAway ? classes.lose: null}`} color="textSecondary">
            {this.state.scoreHome}
          </Typography>
          <Divider orientation="vertical" className={`${classes.divider}`}/>
          <Typography className={`${classes.score} ${this.state.winHome ? classes.lose: null}`} color="textSecondary">
            {this.state.scoreAway}
          </Typography>
        </div>
      </CardContent>
      <div className={`${classes.centerButton}`}>
      <CardActions disableSpacing className={classes.expandButton}>
        <IconButton
          className={`${classes.expand} ${this.state.expanded ? classes.expandOpen: null}`}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      </div>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardActions>
          <div className={`${classes.scoreboardAll}`}>
          <div className={`${classes.scoreboardEach}`}>
              <Typography className={`${classes.header} ${classes.largeFlex}`} color="textSecondary" gutterBottom>
                Team
              </Typography>
              <Typography className={`${classes.header} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                1
              </Typography>
              <Typography className={`${classes.header} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                2
              </Typography>
              <Typography className={`${classes.header} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                3
              </Typography>
              <Typography className={`${classes.header} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                4
              </Typography>
              <Divider orientation="vertical" className={`${classes.dividers} ${classes.normalFlex}`}/>
              <Typography className={`${classes.header} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                Total
              </Typography>
            </div>
            <Divider />
            <div className={`${classes.scoreboardEach}`}>
              <Typography className={`${classes.title} ${classes.largeFlex}`} color="textSecondary" gutterBottom>
                {this.state.away}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreAway1}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreAway2}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreAway3}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreAway4}
              </Typography>
              <Divider orientation="vertical" className={`${classes.dividers} ${classes.normalFlex}`}/>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreHome}
              </Typography>
            </div>
            <Divider />
            <div className={`${classes.scoreboardEach} ${classes.bottomScoreRow}`}>
              <Typography className={`${classes.title} ${classes.largeFlex}`} color="textSecondary" gutterBottom>
                {this.state.home}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreHome1}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreHome2}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreHome3}
              </Typography>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreHome4}
              </Typography>
              <Divider orientation="vertical" className={`${classes.dividers} ${classes.normalFlex}`}/>
              <Typography className={`${classes.title} ${classes.normalFlex}`} color="textSecondary" gutterBottom>
                {this.state.scoreAway}
              </Typography>
            </div>
          </div>
        </CardActions>
      </Collapse>
    </Card>
  );
}
}
export default withStyles(styles)(Scorecard);