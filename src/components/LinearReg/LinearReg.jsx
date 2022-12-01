import axios from "axios";
import { useState } from "react";
import Lottie from "react-lottie";
import { useRef } from "react";
import Run from '../AnimationData/Run.json'
export default function LinearReg(){
    const [testscore, settestscore] = useState(0)
    const [trainscore, settrainscore] = useState(0)
    const[mae,setmae]=useState(0)
    const [mse,setmse]=useState(0)
   const [displayMetrics , setdisplayMetrics]=useState(0)
    const ref = useRef(null);
    const[trainmae,settrainmae]=useState(0)
    const [trainmse,settrainmse]=useState(0)
    const [coef,setcoef]=useState([])
    const [intercept,setintercept]=useState(0)

    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };
async function run(){
    setdisplayMetrics(1)
    await axios.post("http://127.0.0.1:5000/Hyperpara",{
 

algo:"LinearReg",
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
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Run,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
function func(ele){

 return ["  [  ",ele,"  ]  "]

}
    return <div className="MainPage">
    <h1>Linear Regression</h1>
   <button className="Run" style={{height:"200px",width:"200px",marginTop:"20vh",marginBottom:"10vh"}} onClick={run}>
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
{/* <h3 style={{color:"red"}}>Coefs:  { 
 coef.map(func)
}</h3> */}
<div className="metricCard"><div className="metricHead">Coeficients: </div><div className="metric">{ coef.map(func) }</div></div>
    </div>
}