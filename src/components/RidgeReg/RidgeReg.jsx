import axios from "axios";
import { useState } from "react";
import ScatterPlot from "../DecisionTree/ScatterPlot";
import Lottie from "react-lottie";
import { useRef } from "react";
import Loading from "../AnimationData/Loading.json"
import Run from '../AnimationData/Run.json'
export default function RidgeReg(){
  const [alpha,setalpha]=useState(0)
  const [displayGraph, setdisplayGraph] = useState(0)
  const [testState, settestState] = useState()
  const [trainState, settrainState] = useState()
  const [Xlbl,setXlbl]=useState("")
  const[alerti,setalert]=useState(0)
    const [testscore, settestscore] = useState(0)
    const [trainscore, settrainscore] = useState(0)
    const[mae,setmae]=useState(0)
    const [mse,setmse]=useState(0)
   const [displayMetrics , setdisplayMetrics]=useState(0)
    const ref = useRef(null);
    const ref1 = useRef(null);
    const[trainmae,settrainmae]=useState(0)
    const [trainmse,settrainmse]=useState(0)
    const [coef,setcoef]=useState([])
    const [intercept,setintercept]=useState(0)

    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };
      function getGraphLem(){
        handleClick1();
        setalert(1);
        axios.get("http://127.0.0.1:5000/hyperVisualLem").then((response)=>{
        settestState(response.data.acctest)
        settrainState(response.data.acctrain)
        setdisplayGraph(1)
        setXlbl("alpha")
    
        })
    }
    const handleClick1 = () => {
      ref1.current?.scrollIntoView({behavior: 'smooth'});
    };
async function run(){
    setdisplayMetrics(1)
    handleClick();
    await axios.post("http://127.0.0.1:5000/Hyperpara",{
 alpha:alpha,

algo:"RidgeReg",
headers:headerss

}).then((response)=>{
    axios.get("http://127.0.0.1:5000/Hyperpara").then((res)=>{
        settrainscore(res.data.trainscoresR2)
        settestscore(res.data.testscoresR2)
        setmae(res.data.testmae)
        setmse(res.data.testmse)
       
        settrainmae(res.data.trainmae)
        settrainmse(res.data.trainmse)
        setcoef(res.data.Coefs)
        setintercept(res.data.Intercept)
    

    
}) 
})


}
const handleClick = () => {
  ref.current?.scrollIntoView({behavior: 'smooth'});
};
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Run,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  function handleChange(event){
    setalpha(event.target.value);
    }
function func(ele){

 return ["  [  ",ele,"  ]  "]

}
const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: Loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}
    return <div className="MainPage">
    <h1>Ridge Regression</h1>
    <input type="decimal" style={{marginTop:"20vh"}} className="parainput" onChange={handleChange} name="alpha" id="alpha" placeholder="Enter value of alpha" />

   <button className="Run"  style={{height:"200px",width:"200px",marginTop:"20vh",marginBottom:"10vh"}} onClick={run}>
   <Lottie 
         id='GiveDataBtn'
         onClick={run}
       options={defaultOptions}
         height={200}
         width={200}
         
 
       />

   </button>

<div ref={ref} className="MetricContainer"style={{display:displayMetrics?"flex":"none"}}>
<div className="metricCard"><div className="metricHead">Test r2_score:</div><div className="metric">{testscore}</div></div>
<div className="metricCard"><div className="metricHead">Train r2_score:</div><div className="metric">{trainscore}</div></div>
<div className="metricCard"><div className="metricHead">Test Mean Absolute Error:</div><div className="metric">{mae}</div></div>
<div className="metricCard"><div className="metricHead">Train Mean Absolute Error:</div><div className="metric">{trainmae}</div></div>
<div className="metricCard"><div className="metricHead">Test Mean Square Error:</div><div className="metric">{mse}</div></div>
<div className="metricCard"><div className="metricHead">Train Mean Square error:</div><div className="metric">{trainmse}</div></div>
</div>
<div className="metricCard"><div className="metricHead">Intercept:</div><div className="metric">{intercept}</div></div>

<div className="metricCard"><div className="metricHead">Coeficients: </div><div className="metric">{ coef.map(func) }</div></div>
<div className="visual">
<h1>Hyperparameter Visuals</h1>
<div className="hyperCont">
<button className="btn-two" onClick={getGraphLem}>Alpha parameter Tuning</button>

</div>
</div>

<div ref={ref1} style={{width:"90vw"}}>
{
displayGraph?<ScatterPlot 
xlabel={Xlbl}
testState={testState} trainState={trainState} />:alerti?<div
style={{margin:"auto",
display:"flex",
justifyContent:"center",
alignItems:"center",

}}

> <Lottie 
id='GiveDataBtn'

options={defaultOptions1}
height={400}
width={400}


/></div>:""}

</div>
    </div>
}