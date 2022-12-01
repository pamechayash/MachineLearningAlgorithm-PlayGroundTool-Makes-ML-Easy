import axios from "axios";
import BarPlot from "./barplot";
import { useState ,useRef} from "react";
import Run from '../AnimationData/Run.json'
import Lottie from "react-lottie";
import Loading from '../AnimationData/Loading.json'
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import { BarChart, Bar} from 'recharts';
import ScatterPlot from "./ScatterPlot";
import { json } from "react-router-dom";
import './decision.css'
import ReportCont from "../report/report";
    
export default function Decision(){
    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };
      const handleClick1 = () => {
        ref1.current?.scrollIntoView({behavior: 'smooth'});
      };
         

      const ref1 = useRef(null);
      const [alerti,setalert]=useState(0);
      const [alerti1,setalert1]=useState(0);
      const [confmat, setconfmat]=useState(0)
      const ref = useRef(null);
      const [displayMetrics, setdisplayMetrics] = useState(0)
      const [ycol,setycol]=useState();
      const [report,setreport]=useState();
      const [logloss,setlogloss]=useState();
      const [namePara,setname]=useState('');
      const [nameParasc,setnamesc]=useState('');
      const [testscore, settestscore] = useState(0)
      const [trainscore, settrainscore] = useState(0)
      const [confusionMat,setconfusionMat]=useState()
      const [displayGraph, setdisplayGraph] = useState(0)
      const [displayGraphBr, setdisplayGraphBr] = useState(0)
      const [testState, settestState] = useState()
      const [trainState, settrainState] = useState()
      const [Xlbl,setXlbl]=useState("")
const [data,setData]=useState({
  
    Criterion:"gini",
    Splitter:"best",
    Criterionr:'squared_error',
    Depth: 0,
    minSampleLeaf:1,
    minSampleSplit:2,
    maxFeatures: 0,
    minImpurityDecrease : 0.0,

})

function handleChange(e){

    e.preventDefault()

        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

async function handleSubmit(e){
    setdisplayMetrics(1)
    handleClick();
e.preventDefault();
await axios.post("http://127.0.0.1:5000/Hyperpara",{ Criterion:data.Criterion,
Splitter:data.Splitter,

Criterionr: data.Criterionr,
Depth: data.Depth,
minSampleLeaf:data.minSampleLeaf,
minSampleSplit:data.minSampleSplit,
maxFeatures: data.maxFeatures,
minImpurityDecrease : data.minImpurityDecrease,
algo:"DecisionTree",
headers:headerss

}).then((response)=>{
    axios.get("http://127.0.0.1:5000/Hyperpara").then((res)=>{
    settestscore(res.data.testscores);
    settrainscore(res.data.trainscores)
    setconfusionMat(res.data.ConfusionMatric)
    setlogloss(res.data.logloss)
    setycol(res.data.ycol)
    setreport(res.data.report)
    
  
   
 
}) 
})


}

function getGraphDepth(){
    setalert(1)
    setalert1(0)
    handleClick1();
    axios.get("http://127.0.0.1:5000/hyperVisualDepth").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
    setdisplayGraphBr(0)
    setnamesc("Depth Parameter Analysis")
    setXlbl("Max_Depth")

    })
}
function getGraphFeature(){
    setalert(1)
    setalert1(0)
    handleClick1();
    axios.get("http://127.0.0.1:5000/hyperVisualFeature").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
    setdisplayGraphBr(0)
    setnamesc('Feature Parameter Analysis')
    setXlbl("Max_Features")

    })
}
const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
function getGraphSplitter(){
    setalert1(1)
    setalert(0)
    handleClick1();
    axios.get("http://127.0.0.1:5000/hyperVisualSplitter").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraphBr(1)
    setdisplayGraph(0)
    setname("Splitter Parameter Analysis")
    setXlbl("Methods")
    
    })
}


let max;
let min;
if(testState){

   max=Math.max(testState.y)
   min=Math.min(testState.y)
   max=max
   min=min
}
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Run,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

function randomColorGen(){
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
function getConf(){
    setconfmat(1)
}
const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
    return<div className="MainPage">
   <form className="ParameterForm">
   <h1>Decision Tree Classifier</h1>
   <div  className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Criterion:</p><input type="text"  className="parainput" onChange={handleChange} placeholder="Criterion" name="Criterion" value={data.Criterion}/></div>

   <div  className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Splitter:</p><input type="text"  className="parainput" onChange={handleChange} placeholder="Splitter" name="Splitter" value={data.Splitter}/></div></div></div>
   <div  className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Max-Depth:</p><input type="number"  className="parainput" onChange={handleChange} placeholder="Max Depth" name="Depth" value={data.Depth}/></div>
   <div    className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Min Sample Split</p> <input type="number"  className="parainput" onChange={handleChange} placeholder="Min Sample Split" name="minSampleSplit" value={data.minSampleSplit}/></div></div></div>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Min Sample Leaf</p><input type="number"  className="parainput" onChange={handleChange} placeholder="Min Sample Leaf" name="minSampleLeaf" value={data.minSampleLeaf}/></div>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Max Features</p><input type="number"  className="parainput" onChange={handleChange} placeholder="Max Features" name="maxFeatures" value={data.maxFeatures}/></div></div></div>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Min Impurity Decrease</p> <input type="decimal"  className="parainput" onChange={handleChange} placeholder="Min Impurity Decrease" name="minImpurityDecrease" value={data.minImpurityDecrease}/></div></div>
  <button type="submit"  className="Run" onClick={handleSubmit}>   <Lottie 
         id='GiveDataBtn'
         onClick={handleSubmit}
       options={defaultOptions}
         height={80}
         width={80}
         
 
       /></button>
   </form>
   <div className='instructionBox'> <h1 className='insHead'>Have a Look</h1>
      <p className='instruc'>NOTE- First Run The Algorithm Then Click on "get Confusion Metrix"</p>



      </div>
   <div ref={ref} className="MetricContainer"style={{display:displayMetrics?"flex":"none"}}>
<div className="metricCard"><div className="metricHead">Test accuracy_score:</div><div className="metric">{testscore}</div></div>
<div className="metricCard"><div className="metricHead">Train accuracy_score:</div><div className="metric">{trainscore}</div></div>
<div className="metricCard"><div className="metricHead">LogLoss:</div><div className="metric">{logloss}</div></div>
</div>




<div className="confusion">
{

confmat?confusionMat.map((ele)=>
{
    return <div className="cls">{ele.map(ele1=>{
        return <div className="internal" style={{
            backgroundColor: randomColorGen(),
            

        }}>
            {ele1}
        </div>

    })}
    </div>
}
):""
}
</div>
<div className="reportSpace" style={{width:"100vw"}} >
{confmat?
 
    ycol.map(ele=>{
       return  <ReportCont
       categoryName={ele}
        precision={report[String(ele)+".0"].precision}
        recall={report[String(ele)+".0"].recall}
        f1score={report[String(ele)+".0"]['f1-score']}
        />


    }):""
}
</div>
<button className="btn-two" style={{height:"80px",width:"250px",margin:"50px"}} onClick={getConf}>Get Confusion Matrix</button>
<div className="visual">
<h1>Hyperparameter Visuals</h1>
<div className="hyperCont">
<button className="btn-two" onClick={getGraphDepth}>Max Depth parameters Tuning</button>
<button className="btn-two" onClick={getGraphFeature}>Max Features parameters Tuning</button>
<button className="btn-two" onClick={getGraphSplitter}>Splitter</button>
</div>
</div>
<div ref={ref1} style={{width:"90vw"}}>
{
displayGraph?<ScatterPlot 
xlabel={Xlbl}
testState={testState} trainState={trainState} />:alerti? <div
style={{margin:"auto",
display:"flex",
justifyContent:"center",
alignItems:"center",

}}

><Lottie 


options={defaultOptions1}
height={400}
width={400}


/></div>:""}

</div>
<div ref={ref1} style={{width:"90vw"}}>
{ displayGraphBr?<BarPlot 
xlabel={Xlbl}
name={namePara}
testState={testState}  />:alerti1?<div
style={{margin:"auto",
display:"flex",
justifyContent:"center",
alignItems:"center",

}}

> <Lottie 


options={defaultOptions1}
height={400}
width={400}


/></div>:""
}
</div>
    
    </div>
}

