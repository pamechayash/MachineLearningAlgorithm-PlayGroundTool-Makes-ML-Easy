import axios from "axios";

import { useState , useRef} from "react";
import Run from '../AnimationData/Run.json'
import Lottie from "react-lottie";
import ScatterPlot from "../DecisionTree/ScatterPlot";
import ReportCont from "../report/report";
export default function SVM(){
    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };
      const ref = useRef(null);
      const [displayMetrics, setdisplayMetrics] = useState(0)
 
      const [confmat,setconfmat]=useState(0)
      const [obj,setobj]=useState({});
      const [ycol,setycol]=useState();
      const [report,setreport]=useState();
      const [testscore, settestscore] = useState(0)
      const [trainscore, settrainscore] = useState(0)
      const [confusionMat,setconfusionMat]=useState()
      const [displayGraph, setdisplayGraph] = useState(0)
      const [testState, settestState] = useState()
      const [trainState, settrainState] = useState()
      const [Xlbl,setXlbl]=useState("")
const [data,setData]=useState({
  
  C:1.0,
  kernel:'rbf',
  degree:3,
  gamma:'scale',

     class_weight:0,
     algo:'SVM',
   

})
function getConf(){
    setconfmat(1)
}
function randomColorGen(){
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
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
setdisplayMetrics(1)
handleClick();
await axios.post("http://127.0.0.1:5000/Hyperpara",{ 

C: data.C,
kernel: data.kernel,

degree:data.degree,
gamma:data.gamma,
class_weight: data.class_weight,
algo:data.algo,

}).then((response)=>{
    axios.get("http://127.0.0.1:5000/Hyperpara").then((res)=>{
    settestscore(res.data.testscores);
    settrainscore(res.data.trainscores)
    setconfusionMat(res.data.ConfusionMatric)
    setycol(res.data.ycol)
  setreport(res.data.report);
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

    return<div className="MainPage">

   <form className="ParameterForm">
<h1>Support Vector Machine</h1>

  
   <div  className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>C value:</p> <input type="decimal" className="parainput" onChange={handleChange} placeholder="C" name="C" value={data.C}/></div>



  


   <div><p> Kernal type:</p> <input type="text" className="parainput"  onChange={handleChange} placeholder="kernel" name="kernel" value={data.kernel}/></div></div>
  
  
  
  <button type="submit" className ="Run"onClick={handleSubmit}>  <Lottie 
         id='GiveDataBtn'
         onClick={handleSubmit}
       options={defaultOptions}
         height={80}
         width={80}
         
 
       /></button>
   </form>

<div ref={ref} className="MetricContainer"style={{display:displayMetrics?"flex":"none"}}>
<div className="metricCard"><div className="metricHead">Test accuracy_score:</div><div className="metric">{testscore}</div></div>
<div className="metricCard"><div className="metricHead">Train accuracy_score:</div><div className="metric">{trainscore}</div></div>

</div>


<div className="confusion">

{confmat?confusionMat.map((ele)=>
{
    return <div className="cls">{ele.map(ele1=>{
        return <div className="internal" style={{
            backgroundColor: randomColorGen(),
         

        }}>
            {ele1}
        </div>

    })}</div>
}
):""}
</div>
<div className="reportSpace" style={{width:"100vw"}}>
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

<button className="btn-two" onClick={getConf}>get Confusion Matrix</button>

    </div>
}
