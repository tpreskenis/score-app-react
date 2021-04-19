import React from 'react';
import { withStyles  } from '@material-ui/core/styles';

import ScoreCard from './base_score'

import FluxStore from "../../stores/Store"

const styles = ({
  root: {
    display: 'none',
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



class BaseTemplate extends React.Component {
    constructor() {
        super();
        this.state = {
            makeDisplay: false,
            makeVisible: false,
        }
    }
    componentDidMount() {
        FluxStore.on("change", () => {      
            if((FluxStore.getTab() === 'BASEBALL') && FluxStore.getSelected()) {
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
              if ((FluxStore.getTab() === 'BASKETBALL' || FluxStore.getTab() === 'INFO') && this.state.makeDisplay) {
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

  render() {

  const { classes } = this.props;

  return (
    <div className={`${classes.root} ${this.state.makeDisplay ? classes.display: null} ${this.state.makeVisible ? classes.visible: null}`}>
      <ScoreCard/>
    </div>
  );
}
}
export default withStyles(styles)(BaseTemplate);