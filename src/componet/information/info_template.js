import React from 'react';
import { withStyles  } from '@material-ui/core/styles';

import GitCard from './info_git'
import About from './info_about'

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



class InfoTemplate extends React.Component {
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

  render() {

  const { classes } = this.props;

  return (
    <div className={`${classes.root} ${this.state.makeDisplay ? classes.display: null} ${this.state.makeVisible ? classes.visible: null}`}>
      <GitCard/>
      <About/>
    </div>
  );
}
}
export default withStyles(styles)(InfoTemplate);