import axios from "axios";
import Lottie from "react-lottie";
import ReportCont from "../report/report";
import { useState ,useRef} from "react";
import "../DecisionTree/decision.css"
import ScatterPlot from "../DecisionTree/ScatterPlot";
import Run from '../AnimationData/Run.json'
import { json } from "react-router-dom";
export default function RanForest(){
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
  
    criterion:"gini",
   

    max_depth: 0,
    min_samples_leaf:1,
    min_samples_split:2,
    max_features: 0,
    min_impurity_decrease : 0.0,
    n_estimators: 100,
    bootstrap:"True",
    oob_score:"False",
     n_jobs:0,
     class_weight:0,
     max_samples:0,

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
    setdisplayMetrics(1)
    handleClick();
e.preventDefault();
await axios.post("http://127.0.0.1:5000/Hyperpara",{ 

criterion: data.criterion,
max_depth: data.max_depth,

min_samples_leaf:data.min_samples_leaf,
min_samples_split:data.min_samples_split,
max_features: data.max_features,
min_impurity_decrease : data.min_impurity_decrease,
algo:"RanForest",
headers:headerss,
n_estimators: data.n_estimators,
bootstrap:data.bootstrap,
oob_score:data.oob_score,
 n_jobs:data.n_jobs,
 class_weight: (data.class_weight),
 max_samples:data.max_samples,

}).then((response)=>{
    axios.get("http://127.0.0.1:5000/Hyperpara").then((res)=>{
    settestscore(res.data.testscores);
    settrainscore(res.data.trainscores)
    setconfusionMat(res.data.ConfusionMatric)
    setycol(res.data.ycol)
   setreport(res.data.report)
}) 
})


}
// function getGraphDepth(){
//     axios.get("http://127.0.0.1:5000/hyperVisualDepth").then((response)=>{
//     settestState(response.data.acctest)
//     settrainState(response.data.acctrain)
//     setdisplayGraph(1)
//     setXlbl("Max_Depth")

//     })
// }


function randomColorGen(){
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
function getConf(){
    setconfmat(1)
}
const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
    return<div  className="MainPage">
   <form className="ParameterForm">
   <h1>Random Forest Classifier</h1>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>"gini" , "entropy", "log_loss", default="gini"</p><p>Criterion:</p><input className="parainput" type="text" onChange={handleChange} placeholder="criterion" name="criterion" value={data.criterion}/></div>

  
   <div><p> Max_depth:</p><input className="parainput" type="number" onChange={handleChange} placeholder="Max Depth" name="max_depth" value={data.max_depth}/></div></div>
  <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Min Sample Split</p><input className="parainput" type="number" onChange={handleChange} placeholder="Min Sample Split" name="min_samples_split" value={data.min_samples_split}/></div>
  <div><p> Min Sample Leaf:</p><input className="parainput" type="number" onChange={handleChange} placeholder="Min Sample Leaf" name="min_samples_leaf" value={data.min_samples_leaf}/></div></div>
  <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Takes Int value</p><p>Max Features</p><input className="parainput" type="number" onChange={handleChange} placeholder="Max Features" name="max_features" value={data.max_features}/></div>
  <div><p> Min Impurity Decrease:</p> <input className="parainput" type="decimal" onChange={handleChange} placeholder="Min Impurity Decrease" name="min_impurity_decrease" value={data.min_impurity_decrease}/></div></div>
  <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>"balanced" , "balanced_subsample"</p><p>class_weight</p><input className="parainput" type="text" onChange={handleChange} placeholder="class_weight" name="class_weight" value={data.class_weight}/></div>
  <div><p>set it -1 for speed execution(use all cores)</p><p> n_jobs</p><input className="parainput" type="number" onChange={handleChange} placeholder="n_jobs" name="n_jobs" value={data.n_jobs}/></div></div>
  <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>oob_score</p><input className="parainput" type="text" onChange={handleChange} placeholder="oob_score" name="oob_score" value={data.oob_score}/></div>
 <div><p>n_estimators</p><input className="parainput" type="number" onChange={handleChange} placeholder="n_estimators" name="n_estimators" value={data.n_estimators}/></div></div>
  <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>max_samples</p><input className="parainput" type="number" onChange={handleChange} placeholder="max_samples" name="max_samples" value={data.max_samples}/></div>
  <div><p>bootstrap</p><input className="parainput" type="text" onChange={handleChange} placeholder="bootstrap" name="bootstrap" value={data.bootstrap}/></div></div>
  
  
  
  <button type="submit" className="Run" onClick={handleSubmit}>
  <Lottie 
         id='GiveDataBtn'
         onClick={handleSubmit}
       options={defaultOptions}
         height={80}
         width={80}
         
 
       /> 

  </button>
   </form>
   <div className='instructionBox'> <h1 className='insHead'>Have a Look</h1>
      <p className='instruc'>NOTE- First Run The Algorithm Then Click on "get Confusion Metrix"</p>



      </div>
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
<button className="btn-two" style={{height:"80px",width:"250px",margin:"50px"}} onClick={getConf}>get Confusion Matrix</button>









 
    </div>
}