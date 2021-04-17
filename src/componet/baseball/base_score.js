import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as Actions from "../../actions/Actions";
import FluxStore from "../../stores/Store";

const styles = ({
  root: {
    marginTop: 15,
    minWidth: 275,
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



class Scorecard extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: FluxStore.getAll(),
            makeDisplay: false,
            makeVisible: false,
        }
    }
    componentDidMount() {
        FluxStore.on("change", () => {
            this.setState({
                todos:FluxStore.getAll,
                refreshed: FluxStore.getLocalSelected
            })          
            if(FluxStore.getLocalSelected()) {
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

    createTodo() {
      Actions.flux("CREATE_TODO")
    }


  render() {

  const { classes } = this.props;

  return (
    <Card className={`${classes.root}`}>
      <CardContent>
          <Button variant="contained" color="primary" disableElevation onClick={this.createTodo.bind(this)}>Testing</Button>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {FluxStore.getAll()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          BASEBALL
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
}
export default withStyles(styles)(Scorecard);