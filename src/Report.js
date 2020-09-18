import React,{Component} from 'react'; 
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText'; 
import Highlighter from "react-highlight-words";
import './App.css'; 


class Report extends Component{
  constructor(props){
    super(props);
    
  }
    render(){
      
      if(this.props.report)
      {
        
        return( 
          
          <div className = "Space-re">
            <div className = "Left-report">
              <h3 style={{borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: '#cccc', 
                // fontFamily:"roboto", 
                fontSize:'18px'}}>
                  Report
                  <div style={{float:'right', }}> Overall Profanity:  
                    <span style={{color:'red'}}> 
                      {this.props.data.overall_text_classification.classification} 
                      ({Number((this.props.data.overall_text_classification.probability*100).toFixed(2))}%) 
                    </span> 
                  </div>
              </h3>

              <div style={{textAlign:'justify'}}>
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={this.props.data.possible_profanity}
                  autoEscape={true}
                  textToHighlight={this.props.data.text_original}/>
              {/* {this.state.words}
                <span>{this.props.data.text_tagged}</span> */}
              {/* <span style={{color:'red'}}>hy <b>student </b>how are you </span> <span>hellooo</span> */}
              </div>
            </div>

            <div className = "Right-report">
              <h3 style={{color:'white', backgroundColor:'#979795',
              // fontFamily:"roboto", 
              fontSize:'16px' }} align='center'>
                Pofane Words ({this.props.data.possible_profane_word_count})</h3>
              <List>
              {this.props.data.possible_profanity.map((listData) => (
                <ListItemText primary={listData} style={{paddingLeft:'15%'}}/>))}
              </List>
            </div>
          </div>
        );
      }
      else
        return null;
    }
}
export default Report;