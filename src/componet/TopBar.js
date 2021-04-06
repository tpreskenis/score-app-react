import React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
      backgroundColor: 'white',
      placeContent: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

function testingButton() {
    return console.log("test");
}

export default function ButtonAppBar() {
  const classes = useStyles();


  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar className={classes.appBar}>
            <Typography variant="h6" className={classes.title}>
                Scores
            </Typography>
            <div className={classes.spacer}/>
          <IconButton onClick={() => { testingButton() }} edge="start" className={classes.menuButton} aria-label="menu">
            <Icon className="fas fa-sync-alt" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}