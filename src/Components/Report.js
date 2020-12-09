import React,{Component} from 'react';
import './Style.css';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import TabSelect from './TabSelect';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
 

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
            <Typography>{children}</Typography>
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

const highlight = (text, values, c) => { //Highlighter
    console.log('higlight')
    if (!values.length)
        return text;
  
    var a= (<span style={{color:c}}> {/*text color wrt color code*/}
        {text.split(/\[(.*?)\]\(possible profanity\)/)    // Match text inside square brackets + (possible profanity)
            .reduce((prev, current, i) => { //removing reg (brackets,..)
                if (!i)
                    return [current];
                return prev.concat(
                    values.includes(current)  ?
                        <span key={i + current} style={{backgroundColor:'#FFFF00', color:c}}>{/*higligting profane words */}
                        {current}
                        </span>
                        : current
                );
            }, [])}
    </span>);
    return a;
  };
  
  var highlighted;
  
  class Report extends Component{
    constructor(props){
      super(props);
      this.state = {
        inputText:'',
        selectedFile: null,
        report:false,
        data:'',
        line_analysis:[],
        lines:[],
        classification:'',
        probability:0,
        possible_profanity:[],
        text_tagged:'',
        color:'',
        offensive:[
          {'color':'#B00C0C','value':'Above 80%'},  //color code
          {'color':'#E61717','value':'50% to 80%'},
          {'color':'#E66D17','value':'Below 50%'},],
        not_offensive:[{'color':'#19AE48','value':'Below 50%'},
          {'color':'#008944','value':'50% to 80%'},
          {'color':'#003B1D','value':'Above 80%'},], 
          value:0,
      }
    }


    handleChangeIndex = (index) => {
        this.setState({value:index});
    };
  
      colorCode = (classification, probability) =>{     //color code
        var color='';
        if(classification==='Offensive'){ 
          console.log('off')
          if(probability>80){
          color=this.state.offensive[0].color;
          }
          else if(probability>=50){
           color=this.state.offensive[1].color;
            }
          else{
            color=this.state.offensive[2].color;
          }
        }
        else{
          console.log('not-off')
          if(probability>80){
          color=this.state.not_offensive[2].color;
          }
          else if(probability>=50){
            color=this.state.not_offensive[1].color;
            }
          else{
            color=this.state.not_offensive[0].color;
          }
        }
        console.log(color)
        return color;
    };
   
        onSubmit = event =>{
          event.preventDefault();
          if(this.state.inputText===''){
            console.log('No text available for analysis')
            alert('Please upload the text file'); 

          }
          else{
          axios({                         //API Call
            method: 'post',
            url: `http://52.173.240.27:4001/checkProfanity`, 
            headers:{'Content-Type': 'application/json'},
            data: {
              text: this.state.inputText, // This is the body part
            }
          })
            .then(res => (res.data))
            .then((data)=>{
          this.setState({data:data});
          this.setState({line_analysis:data.line_analysis})
          this.setState({classification:data.overall_text_classification.classification})
          this.setState({ probability : (data.overall_text_classification.probability*100).toFixed(2)})   //Rounding the probability %
          this.setState({possible_profanity: data.possible_profanity, text_tagged:data.text_tagged})
          this.setState({lines:this.state.text_tagged.split('.')})  //extracting lines
          this.setState({color:this.colorCode(this.state.classification, this.state.probability)}); //overall profanity color
          highlighted=this.lineColor(); //report color code and highlighter
          this.setState({report:true}); //report visible
          console.log(data)
      });
    }
        }   
  
        onHandleChange = event => {
          this.setState ({
            inputText:event.target.value //input value
          })
        };

        onFileChange = async (event) => {
            event.preventDefault();           
            var selectedFile= event.target.files[0];

            console.log(selectedFile)
            var filePath = selectedFile.name; 
          
            // Allowing file type 
            var allowedExtensions =  
                    /(\.txt)$/i; 
              
            if (!allowedExtensions.exec(filePath)) { 
                console.log('Invalid type')
                alert('Invalid file type'); 
                return false; 
            }  
            else  {
                const reader = new FileReader()
            reader.onload = async (e) => { 
              const text = (e.target.result)
              console.log(text)
              this.setState({inputText:text});
              console.log('text')
              
            };
            reader.readAsText(event.target.files[0])
        }
          }
  
        lineColor = () => {
          var a;
          var c= 'black'; 
          if(this.state.lines.length-1){
            for(let i=0; i<this.state.lines.length-1; i++){
              c= this.colorCode(this.state.line_analysis[i].classification, this.state.line_analysis[i].probability*100) //color for lines
              a=<span>{a}{highlight(this.state.lines[i], this.state.possible_profanity, c)}.</span>; //highlighted report
            }
            c= this.colorCode(this.state.line_analysis[this.state.lines.length-1].classification, this.state.line_analysis[this.state.lines.length-1].probability*100) //color for last line
            a=<span>{a}{highlight(this.state.lines[this.state.lines.length-1], this.state.possible_profanity, c)}</span>; //highlighted report last line without '.'
          }
          else { //one line report
            c= this.colorCode(this.state.classification, this.state.probability) //color for line
            a=<span>{a}{highlight(this.state.lines[this.state.lines.length-1], this.state.possible_profanity, c)}</span>; //highlighted report
          }
          return a;
        };
   
      render(){
        let report1 = null;
        
        if(this.state.report){      //Display the report only after clicking the submit button
          report1 = (
            <div className = "space-report" style={{fontFamily:"roboto",}}>
              <div className="color-palette">
                <List>
                  <div style={{textAlign:'center', color:'#E61717', fontFamily:"roboto",fontSize:'18px'}}>
                     Offensive
                    </div> 
                  {this.state.offensive.map((data, i)=>(
                    <ListItem key = {i} style={{background:data.color,color:"#FFFFFF"}}>
                      <ListItemText style={{textAlign:'center'}} primary = {data.value}/>
                    </ListItem>
                  ))}
                  {this.state.not_offensive.map((data, i)=>(
                    <ListItem key = {i} style = {{background:data.color, color:"#FFFFFF"}}>
                      <ListItemText style={{textAlign:'center'}} primary = {data.value}/>
                    </ListItem>    
                  ))}
                  <ListItemText style = {{textAlign:'center', color:'#008944', font:'bold 18 roboto'}} primary="Not Offensive"/>
                </List>
              </div>
              <div>
                  <div className = "left-report">   
                  <h3 style={{borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: '#CCCC', fontFamily:"roboto", fontSize:'18px',}}>
                    Report
                    <div style={{float:'right',fontFamily:"roboto",fontWeight:300,fontSize:20 }}> 
                    Overall Profanity : 
                    <span  style={{color:this.state.color}}>  {/*classsification with color code*/}
                       {this.state.classification} ({this.state.probability}%)        
                    </span>
                    </div>
                    </h3>
                  <div align='justify' style = {{whiteSpace:'pre-wrap'}}>
                  {highlighted}
                    </div>                                      {/* highlighted report*/}
                  </div>
                  <div className = "right-report">
                    <h3 style={{color:'white', backgroundColor:'#303055',
                    fontFamily:"roboto", fontSize:'16px',marginRight:'5%', paddingTop:'2%', paddingBottom:'2%' }} align='center'>    
                      Profane Words  ({this.state.data.possible_profane_word_count}) </h3>
                    <List style={{marginLeft:'20px'}}>        
                    {this.state.possible_profanity.map((listData, i) => (    //Listing all the profane words
                      <ListItemText key={i} primary={listData} />))}
                    </List> 
                  </div>
                </div>
              </div>
          )}
        return(
            <div>
          <div className="spli left">
          <div style={{width:'100%', backgroundColor:"#303055", paddingBottom:'5%'}}/>

          <TabSelect inputText={this.state.inputText} handleSubmit={this.onSubmit} 
          onHandleChange={this.onHandleChange} onFileChange={this.onFileChange}/>
           <div className='split right'>   
           <div style={{width:'100%', backgroundColor:"#303055", paddingBottom:'5%'}}/>
              {report1}                  {/*Calling the report when condition is true*/} 
        </div> 
        </div>           
      </div>
        )
    }
}


export default Report;
 