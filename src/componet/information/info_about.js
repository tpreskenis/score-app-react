import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = ({
    root: {
    minWidth: 275,    
    borderRadius: '15px',
    marginTop: 15,
    marginBottom: 65,
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
  },
  tools: {
    textAlign: '-webkit-center',
    fontSize: 'small',
    color: 'gray',
  },
  paragraph: {

  },
  content: {
    paddingTop: 0
  },
  expandButton: {
    placeContent: 'center'
  },
  repoText: {
    marginLeft: 5,
    fontWeight: 500,
    fontSize: 'x-large'
  },
  react: {
    color: 'deepskyblue'
  },
  sport: {
      color: 'crimson'
  },
  material: {
    color: 'blue'
  },
  button_row: {
    placeContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});


class InfoAbout extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            react: false,
            sport: false,
            material: false,
        }
    }

  handleExpandClick = () => {
    this.setState({
        expanded: !this.state.expanded
    })
  };
  toggleReact(){
    const currentState = this.state.react
    this.setState({ react: !currentState})
  }
  toggleSport(){
    const currentState = this.state.sport
    this.setState({ sport: !currentState})
  }
  toggleMaterial(){
    const currentState = this.state.material
    this.setState({ material: !currentState})
  }
  reactLink(){
    const url = 'https://reactjs.org/';
    window.open(url, '_blank');
    }
  sportLink(){
      const url = 'https://github.com/tpreskenis/score-api';
      window.open(url, '_blank');
  }
  materialLink(){
    const url = 'https://material-ui.com/';
    window.open(url, '_blank');
} 

  render() {

    const { classes } = this.props;

    return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.title}
        title="About"
      />
      <CardContent className={classes.content}>
        <Typography className={classes.paragraph}>This is an app that is developed using React and Material UI. 
        This app requires the API that will gather data from a provided feed and store it in a database. 
        This app will then take that data and put it into a visual format.</Typography>
      </CardContent>
      <Typography className={classes.tools}>Tools Used To Build This</Typography>
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
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardActions disableSpacing className={`${classes.button_row}`}>
            <IconButton className={`${this.state.react ? classes.react: null}`} onMouseEnter={this.toggleReact.bind(this)} onMouseLeave={this.toggleReact.bind(this)} aria-label="go to react" onClick={this.reactLink}>
              <Icon fontSize="large" className="fab fa-react" />
            </IconButton>  
            <Typography className={`${classes.react} ${classes.repoText}`}>
                React
            </Typography>
        </CardActions>
        <CardActions disableSpacing className={`${classes.button_row}`}>
        <IconButton className={`${this.state.material ? classes.material: null}`} onMouseEnter={this.toggleMaterial.bind(this)} onMouseLeave={this.toggleMaterial.bind(this)} aria-label="go to material ui" onClick={this.materialLink}>
            <SvgIcon fontSize="large">
                <path d="M8,16.61V15.37L14,11.91V7.23L9,10.12L4,7.23V13L3,13.58L2,13V5L3.07,4.38L9,7.81L12.93,5.54L14.93,4.38L16,5V13.06L10.92,16L14.97,18.33L20,15.43V11L21,10.42L22,11V16.58L14.97,20.64L8,16.61M22,9.75L21,10.33L20,9.75V8.58L21,8L22,8.58V9.75Z" />
            </SvgIcon>
            </IconButton>  
            <Typography className={`${classes.material} ${classes.repoText}`}>
                Material UI
            </Typography>
        </CardActions>
        <CardActions disableSpacing className={`${classes.button_row}`}>
            <IconButton className={`${this.state.sport ? classes.sport: null}`} onMouseEnter={this.toggleSport.bind(this)} onMouseLeave={this.toggleSport.bind(this)} aria-label="go to sport" onClick={this.sportLink}>
              <Icon fontSize="large" className="fas fa-football-ball" />
            </IconButton>  
            <Typography className={`${classes.sport} ${classes.repoText}`}>
                Sports Data
            </Typography>
        </CardActions>
      </Collapse>
    </Card>
  );
}
}
export default withStyles(styles)(InfoAbout);