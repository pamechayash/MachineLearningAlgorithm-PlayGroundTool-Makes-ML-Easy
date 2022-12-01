import axios from "axios";
import Loading from '../AnimationData/Loading.json'
import { useState,useRef } from "react";
import Lottie from "react-lottie";
import './scatter.css'
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import ScatterPlot from "./ScatterPlot";
import BarPlot from "./barplot"; 
import './decision.css'
import Run from '../AnimationData/Run.json'
export default function DecisionTreeReg(){
    const handleClick1 = () => {
        ref1.current?.scrollIntoView({behavior: 'smooth'});
      };
    
    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };
    
      const ref = useRef(null);
      const ref1 = useRef(null);
      const [alerti,setalert]=useState(0);
      const [alerti1,setalert1]=useState(0);
      const [displayMetrics, setdisplayMetrics] = useState(0)
      const [displayGraphBr, setdisplayGraphBr] = useState(0)
      const [namePara,setname]=useState('');
      const [nameParasc,setnamesc]=useState('');
      const [testscore, settestscore] = useState(0)
      const [trainscore, settrainscore] = useState(0)
      const[mae,setmae]=useState(0)
      const [mse,setmse]=useState(0)
       const [adjr2,setadjr2]=useState(0)
      const [displayGraph, setdisplayGraph] = useState(0)
      const [testState, settestState] = useState()
      const [trainState, settrainState] = useState()
      const[trainmae,settrainmae]=useState(0)
      const [trainmse,settrainmse]=useState(0)
      const [Xlbl,setXlbl]=useState("")
const [data,setData]=useState({
  

    Splitter:"best",
    Criterionr:'squared_error',
    Depth: 0,
    minSampleLeaf:1,
    minSampleSplit:2,
    maxFeatures: 0,
    minImpurityDecrease : 0.0,

})
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Run,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
function handleChange(e){

    e.preventDefault()

        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

async function handleSubmit(e){
e.preventDefault();
setdisplayMetrics(1);
handleClick();
await axios.post("http://127.0.0.1:5000/Hyperpara",{
Splitter:data.Splitter,
Criterionr: data.Criterionr,
Depth: data.Depth,
minSampleLeaf:data.minSampleLeaf,
minSampleSplit:data.minSampleSplit,
maxFeatures: data.maxFeatures,
minImpurityDecrease : data.minImpurityDecrease,
algo:"DecisionTreeReg",
headers:headerss

}).then((response)=>{
    axios.get("http://127.0.0.1:5000/Hyperpara").then((res)=>{
    settestscore(res.data.testscoresR2);
    settrainscore(res.data.trainscoresR2)
   
    setmae(res.data.testmae)
    setmse(res.data.testmse)
    console.log(res.data.trainmae)
    console.log(res.data.trainmse)
    settrainmae(res.data.trainmae)
    settrainmse(res.data.trainmse)

    
}) 
})


}
function getGraphDepth(){
    setalert(1)
    setalert1(0)
    handleClick1();
    setdisplayGraphBr(0)
    axios.get("http://127.0.0.1:5000/hyperVisualDepth").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
    setXlbl("Max_Depth")
    setnamesc("Depth Parameter Analysis")

    })
}
function getGraphFeature(){
    setalert(1)
    setalert1(0)
    handleClick1();
    setdisplayGraphBr(0)
    axios.get("http://127.0.0.1:5000/hyperVisualFeature").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
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
    setdisplayGraph(0)
    axios.get("http://127.0.0.1:5000/hyperVisualSplitter").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    console.log(response.data.acctrain)
    setdisplayGraphBr(1)
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

const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };


    return<div className="MainPage">
   <form className="ParameterForm">
       <h1>Decision Tree Regressor</h1>
       <div className="cont01"><div><p>Criterion:</p> <input className="parainput"type="text" onChange={handleChange} placeholder="Criterion" name="Criterion" value={data.Criterionr}/></div>

       <div><p> Splitter:</p> <input className="parainput" type="text" onChange={handleChange} placeholder="Splitter" name="Splitter" value={data.Splitter}/></div>
     </div>
     <div className="cont01"> <div> <p> Max Depth:</p> <input className="parainput" type="number" onChange={handleChange} placeholder="Max Depth" name="Depth" value={data.Depth}/></div>
       <div><p> Min Sample Split:</p> <input className="parainput" type="number" onChange={handleChange} placeholder="Min Sample Split" name="minSampleSplit" value={data.minSampleSplit}/></div> </div>
       <div className="cont01" > <div><p> Min Sample Leaf:</p> <input className="parainput" type="number" onChange={handleChange} placeholder="Min Sample Leaf" name="minSampleLeaf" value={data.minSampleLeaf}/></div>
      <div> <p> Max Features:</p> <input className="parainput" type="number" onChange={handleChange} placeholder="Max Features" name="maxFeatures" value={data.maxFeatures}/></div></div>
      <div><p>Min Impurity Decrease:</p>  <input className="parainput" type="decimal" onChange={handleChange} placeholder="Min Impurity Decrease" name="minImpurityDecrease" value={data.minImpurityDecrease}/></div> 
  <button type="submit"  className="Run" onClick={handleSubmit}>
      <Lottie 
         id='GiveDataBtn'
         onClick={handleSubmit}
       options={defaultOptions}
         height={80}
         width={80}
         
 
       />
       </button>
   </form>
<div ref={ref} className="MetricContainer"style={{display:displayMetrics?"flex":"none"}}>
<div className="metricCard"><div className="metricHead">Test r2_score:</div><div className="metric">{testscore}</div></div>
<div className="metricCard"><div className="metricHead">Train r2_score:</div><div className="metric">{trainscore}</div></div>
<div className="metricCard"><div className="metricHead">Test Mean Absolute Error:</div><div className="metric">{mae}</div></div>
<div className="metricCard"><div className="metricHead">Train Mean Absolute Error:</div><div className="metric">{trainmae}</div></div>
<div className="metricCard"><div className="metricHead">Test Mean Square Error:</div><div className="metric">{mse}</div></div>
<div className="metricCard"><div className="metricHead">Train Mean Square error:</div><div className="metric">{trainmse}</div></div>
</div>
<div className="visual">
<h1>Hyperparameter Visuals</h1>
<div className="hyperCont">

<button className="btn-two" onClick={getGraphDepth}>Max Depth</button>
<button className="btn-two" onClick={getGraphFeature}>Max Features</button>
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
testState={testState}  />:alerti1? <div
style={{margin:"auto",
display:"flex",
justifyContent:"center",
alignItems:"center",

}}

><Lottie 


options={defaultOptions1}
height={400}
width={400}



/></div>:""
}
</div>
    </div>
}