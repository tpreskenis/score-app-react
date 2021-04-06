import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TodoStore from "../stores/TodoStore"

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
});



class Scorecard extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: TodoStore.getAll()
        }
    }
    componentWillMount() {
        TodoStore.on("change", () => {
            this.setState({
                todos:TodoStore.getAll
            })
        })
  }

  render() {

  const { classes } = this.props;
  const bull = <span className={classes.bullet}>•</span>;


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {TodoStore.getAll()}
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
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
export default withStyles(styles)(Scorecard);