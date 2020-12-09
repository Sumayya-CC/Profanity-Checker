import React,{Component} from 'react'; 
import Button from '@material-ui/core/Button';
import './Style.css';

  
class Upload extends Component { 
    constructor(props){
        super(props);
    }
     
    render() { 
     
      return ( 
        <div> 
            <div style={{marginTop:'1%'}}>
            <Button variant="contained"
                component="label" style={{width:'65%', height:40, textTransform: 'none'}}>
            Upload File
            <input
                type="file"
                style={{ display: "none" }} onChange={this.props.onFileChange}/>
            </Button>
           <Button variant="contained" style={{backgroundColor: "#303055",color:"#FFFFFF",     //Submit button
            width:'25%', height: 40, textTransform: 'none',float:'right',right:'5%'}}
            onClick={this.props.onSubmit}> Submit </Button>
           </div>
        </div> 
      ); 
    } 
  } 
  
  export default Upload; 



        