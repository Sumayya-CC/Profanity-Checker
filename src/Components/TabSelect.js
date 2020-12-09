import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Style.css';
import Upload from './Upload'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#303055',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#303055',
      opacity: 1,
    },
    '&$selected': {
      color: '#303055',
      fontWeight: theme.typography.fontWeightMedium,
      
    },
    '&:focus': {
      color: '#303055',
    },
  },
  
  
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding:0
    // padding: theme.spacing(3),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    marginLeft:'5%',
    marginTop:'2.5%'
  },
  textField: {
    width: '95%',
    marginTop: "1%",
    marginLeft:'0%',
    color: "black",
    // minHeight: '40%', 
    background:'#F2F2F2',
    borderBlockColor:'#000000',
    borderBlockWidth:1,
    borderWidth:1,
    borderColor:'black',
    borderStyle:'solid',
    
    '& label.Mui-focused': {
    color: 'black',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: '#F2F2F2',
    },
    '& .MuiInput-underline:before': {
    borderBottomColor: '#F2F2F2',
    },
    
    '&.Mui-focused fieldset': {
    borderColor: '#F2F2F2',
    },
    '&& .MuiInput-root:hover::before': {
    borderColor: '#F2F2F2',
    } 
    },
}));

export default function TabSelect(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Text" {...a11yProps(0)}/>
          <AntTab label="File" {...a11yProps(1)}/>
          
        </AntTabs>
        <Typography className={classes.padding}/>
        <SwipeableViews  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>

        <TabPanel  value={value} index={0} dir={theme.direction} >
        
        <div className = 'align-box'>
          <div>
           Add the text and submit for AI profanity analysis
           </div>
        <form onSubmit={props.handleSubmit}>
          
            <TextField value = {props.inputText} onChange = {props.onHandleChange}     //Input field
              id="outlined-multiline-static"
              // label = "Text"
              multiline = {true}
              // variant="outlined"
              fullWidth = {true} 
              required
              InputLabelProps={{required: false}}
              className={classes.textField}
              style={{ minHeight:200}}/>
            
            <div className = "space">
            <Button variant="contained" style={{backgroundColor: "#303055",color:"#FFFFFF",     //Submit button
            width:'25%', height: 40, textTransform: 'none',float:'right',right:'5%'}}
             type='submit'> Submit </Button>
           </div>       
         </form>   
          </div>  
        </TabPanel>

        <TabPanel  value={value} index={1} dir={theme.direction} >
        
        <div className = 'align-box'>
          <div>
           Upload the file for AI profanity analysis
           </div>
           <Upload onSubmit={props.handleSubmit} onFileChange= {props.onFileChange}/>

           </div>
           </TabPanel>
        
      </SwipeableViews>
      </div>

    </div>
  );
}