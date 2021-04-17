import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import imageUrl from '../../images/Preskenis_Tim.jpg';
import Icon from '@material-ui/core/Icon';

import * as Actions from "../../actions/Actions"
import FluxStore from "../../stores/Store"

const styles = ({
  card: {
    borderRadius: '15px',
    marginTop: 15,
    minWidth: 275,
  },
  avatar: {
    width: '100px',
    height: '100px',
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
  },
  pos: {
    marginBottom: 12,
  },
  role: {
    fontWeight: 500,
    color: 'dodgerblue'
  },
  location: {
    marginLeft: 5,
    fontWeight: 500,
  },
  infoText: {
    textAlign: 'center'
  },
  button_row: {
    placeContent: 'center'
  },
  linkedin_logo: {
    color: '#0072b1'  
  },
  git_logo: {
    color: '#e2432a'  
  },
  header: {
    textAlign: '-webkit-center',
    paddingTop: '16px',
  }
})




class InfoCard extends React.Component {
    constructor() {
        super();
        this.state = {
            linked: false,
            git: false
        }
    }
    componentDidMount() {
        FluxStore.on("change", () => {      

        })
    }

    createTodo() {
      Actions.flux("CREATE_TODO")
    }

    githubLink(){
        const url = 'https://github.com/tpreskenis';
        window.open(url, '_blank');
    }

    linkedinLink(){
        const url = 'https://www.linkedin.com/in/timothypreskenis/';
        window.open(url, '_blank');
    }

    toggleLinked(){
        const currentState = this.state.linked
        this.setState({ linked: !currentState})
    }

    toggleGit(){
        const currentState = this.state.git
        this.setState({ git: !currentState})
    }

  render() {

  const { classes } = this.props;

  return (
      <Card className={`${classes.card}`}>
          <div className={`${classes.header}`}>
            <Avatar alt="Remy Sharp" src={imageUrl} className={`${classes.avatar}`} />   
            <Typography className={`${classes.title}`}>
              Tim Preskenis
            </Typography>     
            <Typography className={`${classes.role}`}>
                Full Stack Engineer
            </Typography>
          </div>
        <CardContent>
          <Typography className={`${classes.infoText}`}>
            A former RIT Tiger and current Software Engineer.
            <br />
            Oh, and I am obsessed with sports and videogames!
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={`${classes.button_row}`}>
            <Icon className="fas fa-map-marker-alt" />
            <Typography className={`${classes.location}`}>
                Charlestown MA
            </Typography>
        </CardActions>
        <CardActions disableSpacing className={`${classes.button_row}`}>
        <IconButton className={`${this.state.linked ? classes.linkedin_logo: null}`} onMouseEnter={this.toggleLinked.bind(this)} onMouseLeave={this.toggleLinked.bind(this)} aria-label="go to github" onClick={this.linkedinLink}>
          <Icon fontSize="large" className="fab fa-linkedin" />
        </IconButton>  
        <IconButton className={`${this.state.git ? classes.git_logo: null}`} onMouseEnter={this.toggleGit.bind(this)} onMouseLeave={this.toggleGit.bind(this)} aria-label="go to github" onClick={this.githubLink}>
          <Icon fontSize="large" className="fab fa-github" />
        </IconButton>  
        </CardActions>
      </Card>
  );
}
}
export default withStyles(styles)(InfoCard);