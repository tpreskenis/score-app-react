import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import FluxStore from "../../stores/Store";
import dateFormat from 'dateformat'; 
// Pictures 
import StadiumPic from "../../assets/stadium_pics/la_angles.jpg"

const styles = ({
    root: {
    minWidth: 275,    
    borderRadius: '15px',
    marginBottom: 65,
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '120%',
    marginLeft: '-20px'
  },
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  stadiumName: {
    paddingTop: '3%',
    fontSize: 'x-large',
    fontWeight: '500'
  },
  minorInformation: {
    fontSize: 'revert',
    color: 'grey'
  },
  overlay: {
    top: '20px',
    left: '20px',
    color: 'white',
    position: 'absolute',
    fontSize: 'xx-large'
},
  content: {
    paddingTop: 0
  },
  expandButton: {
    paddingLeft: '16px',
    paddingBottom: '25px'
  },
  row_name: {
    flex: '1 1 100%',
    fontWeight: '500',
  },
  icon: {
    display: 'inline-flex',
    minWidth: '24px',
    alignSelf: 'flex-start',
    margin: '16px 0'
  },
  row_end: {
    flex: '1 1 100%',
    textAlign: 'right!important',
    fontWeight: '100',
    color: 'gray'
  },
  misc_row: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 100%',
    letterSpacing: 'normal',
    minHeight: '48px',
    outline: 'none',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
    paddingBottom: '0px',
    position: 'relative',
    textDecoration: 'none',
  },
});


class StadiumInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            react: false,
            sport: false,
            material: false,
            refreshed: FluxStore.getSelected(),
            mlbData: FluxStore.getMLBData(),

            // Passed Data
            stadiumName: 'Null',
            stadiumLocation: 'Null',

            startTime: 'Null',
            startDate: 'Null',

            gameDuration: 'Null',
            attendance: 'Null',
            temperature: 'Null',
            surface: 'Null',

            //Would change later if we were to add Hockey!
            hardwoodTrigger: false,
            grassTrigger: true,
        }
    }

    componentDidMount() {
        FluxStore.on("change", () => {
            this.setState({
                // In case we need call backs
                refreshed: FluxStore.getSelected(),
                mlbData: FluxStore.getMLBData()
            })
            
            const mlbDataOverall = FluxStore.getMLBData()
            if (mlbDataOverall !== 'Null') {
                this.setState({
                stadiumName: mlbDataOverall.event_information.site.name,
                stadiumLocation: mlbDataOverall.event_information.site.city + ' , ' + mlbDataOverall.event_information.site.state,

                startDate: dateFormat(mlbDataOverall.event_information.start_date_time, 'fullDate'),
                startTime: dateFormat(mlbDataOverall.event_information.start_date_time, 'longTime'),

                gameDuration: mlbDataOverall.event_information.duration,
                attendance: mlbDataOverall.event_information.attendance,
                temperature: mlbDataOverall.event_information.temperature,
                surface: mlbDataOverall.event_information.site.surface,
            })
            if (this.state.surface === 'Grass') {
                this.setState({
                    hardwoodTrigger: false,
                    grassTrigger: true
                })
            if (this.state.surface === 'Hardwood') {
                this.setState({
                    hardwoodTrigger: true,
                    grassTrigger: false
                })
            }
            }

            }
        })
    }

  handleExpandClick = () => {
    this.setState({
        expanded: !this.state.expanded
    })
  };


  render() {

    const { classes } = this.props;

    return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
      <div style={styles.overlay}>
        Game Info.
      </div>
      <CardMedia
        className={classes.media}
        image={StadiumPic}
        title="LAA Stadium"
      />
        <Typography className={classes.stadiumName}>{this.state.stadiumName}</Typography>
        <Typography className={classes.minorInformation}>{this.state.stadiumLocation}</Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.expandButton}>
        <div>
        <Typography className={classes.minorInformation}>{this.state.startDate}</Typography>
        <Typography className={classes.minorInformation}>{this.state.startTime}</Typography>
        </div>
        <IconButton
          className={`${classes.expand} ${this.state.expanded ? classes.expandOpen: null}`}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardActions disableSpacing className={`${classes.misc_row}`}>
            <Typography className={classes.row_name}>
                Game Duration
            </Typography>
            <Icon className={`${'fas fa-clock'} ${classes.icon}`} />
            <Typography className={classes.row_end}>
                {this.state.gameDuration}
            </Typography>
        </CardActions>
        <CardActions disableSpacing className={`${classes.misc_row}`}>
            <Typography className={classes.row_name}>
                Attendance
            </Typography>
            <Icon className={`${'fas fa-user'}`} />
            <Typography className={classes.row_end}>
                {this.state.attendance}
            </Typography>
        </CardActions>
        <CardActions disableSpacing className={`${classes.misc_row}`}>
            <Typography className={classes.row_name}>
                Temperature
            </Typography>
            <Icon className={`${'fas fa-sun'}`} />
            <Typography className={classes.row_end}>
                {this.state.temperature}
            </Typography>
        </CardActions>
        <CardActions disableSpacing className={`${classes.misc_row}`}>
            <Typography className={classes.row_name}>
                Surface
            </Typography>
            <Icon className={` ${this.state.hardwoodTrigger ? 'fas fa-tree': null} ${this.state.grassTrigger ? 'fas fa-seedling': null}`} />
            <Typography className={classes.row_end}>
                {this.state.surface}
            </Typography>
        </CardActions>
      </Collapse>
    </Card>
  );
}
}
export default withStyles(styles)(StadiumInfo);