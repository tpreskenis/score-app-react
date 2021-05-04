import React from 'react';
import { withStyles  } from '@material-ui/core/styles';

import ScoreCard from './basket_score'
import Stadium from './basket_stadium'

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



class BasketTemplate extends React.Component {
    constructor() {
        super();
        this.state = {
            makeDisplay: false,
            makeVisible: false,
        }
    }
    componentDidMount() {
        FluxStore.on("change", () => {      
            if((FluxStore.getTab() === 'BASKETBALL') && FluxStore.getSelected()) {
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
              if ((FluxStore.getTab() === 'BASEBALL' || FluxStore.getTab() === 'INFO') && this.state.makeDisplay) {
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
      <Stadium/>
    </div>
  );
}
}
export default withStyles(styles)(BasketTemplate);