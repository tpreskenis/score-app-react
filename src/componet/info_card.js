import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as Actions from "../actions/Actions"
import FluxStore from "../stores/Store"

const styles = ({
  root: {
    marginTop: 15,
    minWidth: 275,
    display: 'none'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
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



class InfoCard extends React.Component {
    constructor() {
        super();
        this.state = {
            makeDisplay: false,
            makeVisible: false,
        }
    }
    componentDidMount() {
        FluxStore.on("change", () => {      
            if((FluxStore.getTab() === 'INFO')) {
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
              if ((FluxStore.getTab() === 'BASEBALL' || FluxStore.getTab() === 'BASKETBALL') && this.state.makeDisplay) {
                  this.setState({
                    makeVisible: false
                  });
                  setTimeout(() => {
                    this.setState({
                        makeDisplay: false
                    })
                  }, 300);
              }
        })
    }

    createTodo() {
      Actions.flux("CREATE_TODO")
    }


  render() {

  const { classes } = this.props;

  return (
    <Card className={`${classes.root} ${this.state.makeDisplay ? classes.display: null} ${this.state.makeVisible ? classes.visible: null}`}>
      <CardContent>
          <Button variant="contained" color="primary" disableElevation onClick={this.createTodo.bind(this)}>Testing</Button>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {FluxStore.getAll()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
}
export default withStyles(styles)(InfoCard);