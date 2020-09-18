import React,{Component} from 'react'; 
import Report from './Report.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'; 
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      text:'',
      report:false,
      data:'',
    }
  }
  
  handleChange = event => {
    this.setState({ text: event.target.value });
    console.log(this.state.text);
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.text);
    this.setState({report:true});

    this.setState({data:
        { "overall_text_classification": {
            "classification": "Hate Speech",
            "probability": 0.5595089694727651
          },
          "possible_profane_word_count": 1,
          "possible_profanity": ["mofo"],
          "text_original": "I was all up for Apple demanding 30%, it’s their store, their ecosystem, their customers..and to be on of the world’s biggest stores and get access to that audience, you gotto pay something. So it’s justified to have access to all of those tools, audience and get 30%But to make an app developer add features that will lead to income? Now that is f*** up. That’s abuse of power in my opinion. It’s like building a hotel, renting a room and pak occupied kashmir then telling the tenant you’re gonna do some ho* action for me…bring me money! Mofo…",
          "text_tagged": "I was all up for Apple demanding 30%, it’s their store, their ecosystem, their customers..and to be on of the world’s biggest stores and get access to that audience, you gotto pay something. So it’s justified to have access to all of those tools, audience and get 30%But to make an app developer add features that will lead to income? Now that is f*** up. That’s abuse of power in my opinion. It’s like building a hotel, renting a room and pak occupied kashmir then telling the tenant you’re gonna do some ho* action for me…bring me money! [Mofo](possible profanity - mofo)…"
        }
    });
  }

  render(){
    return(
      <div>
        <Box height = "50%" width="100%">
          <Box height = "50%" width={1} mx={0.5} bgcolor="#64C043" p={1} my={0.5}>
            <h1 style={{color:"#FFFFFF", marginLeft:'4%'}}>Profanity Detector</h1>
          </Box>
        </Box>

      <div className = "Space" className = "Align-box">
        <form onSubmit={this.handleSubmit}>
          <TextField style = {{minHeight: '40px', background:'#F2F2F2',}}
            id="outlined-multiline-static"
            label="Enter your Text here"
            name="Text"
            required
            align='justify'
            InputLabelProps={{required: false}}
            value={this.state.text}
            onChange={this.handleChange}
            multiline = "true"
            variant="outlined"
            fullWidth = "true"/>

          <div className="Space">
            <Button variant="contained" 
              style={{backgroundColor: "#64C043",color:"#FFFFFF", width:'15%', height: 40, textTransform: 'none', float:"right",}}
              type="submit">
                Submit
            </Button>
          </div>
        </form>
        <Report data={this.state.data} report={this.state.report}/>

      </div>
    </div>
    );
  }
}
export default App;