import React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  root: {
    bottom: '0',
    position: 'fixed',
    width: '100%'
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


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
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Recents" icon={<Icon className="fas fa-basketball-ball" />} />
      <BottomNavigationAction label="Favorites" icon={<Icon className="fas fa-baseball-ball" />} />
      <BottomNavigationAction label="Nearby" icon={<Icon className="fas fa-info-circle" />} />
    </BottomNavigation>
  );
}