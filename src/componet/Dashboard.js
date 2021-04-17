import React from 'react';
import TopBar from './TopBar.js'
import BottomBar from './BottomBar.js'
import ApiCard from './api_card.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { loadCSS } from 'fg-loadcss';

// Templates
import InfoTemplate from './information/info_template.js'
import BasketTemplate from './basketball/basket_template.js'
import BaseTemplate from './baseball/base_template.js'

function Dashboard() {
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
    <div>
      <TopBar/>
      <React.Fragment>
        <CssBaseline />
            <Container maxWidth="sm">
                <ApiCard/>
                <InfoTemplate/>
                <BasketTemplate/>
                <BaseTemplate/>
            </Container>
      </React.Fragment>
      <BottomBar/>
    </div>
  );
}

export default Dashboard;