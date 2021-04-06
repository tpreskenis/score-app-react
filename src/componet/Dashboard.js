import React from 'react';
import TopBar from './TopBar.js'
import BottomBar from './BottomBar.js'
import PlayerCard from './playerCard.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

function Dashboard() {
  return (
    <div>
      <TopBar/>
      <React.Fragment>
        <CssBaseline />
            <Container maxWidth="sm">
                <PlayerCard/>
            </Container>
      </React.Fragment>
      <BottomBar/>
    </div>
  );
}

export default Dashboard;