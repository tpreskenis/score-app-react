import Dashboard from './componet/Dashboard.js'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Dashboard/>
    </div>
  );
}

export default App;
