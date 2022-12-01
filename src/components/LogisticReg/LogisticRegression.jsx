import axios from "axios";
import ReportCont from "../report/report";
import { useState , useRef} from "react";
import Lottie from "react-lottie";
import Loading from '../AnimationData/Loading.json'
import Run from '../AnimationData/Run.json'
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import ScatterPlot from "../DecisionTree/ScatterPlot";
import "./LogisticRegression.css"
export default function LogReg(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Run,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }
    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };

      const [confmat ,setconfmat]=useState(0)
     const ref=useRef(null)
     const ref1=useRef(null)
  const [displayMetrics,setdisplayMetrics]=useState(0)
      const [ycol,setycol]=useState();
      const [alerti,setalert]=useState();
      const [report,setreport]=useState();
      const [testscore, settestscore] = useState(0)
      const [trainscore, settrainscore] = useState(0)
      const [confusionMat,setconfusionMat]=useState()
      const [displayGraph, setdisplayGraph] = useState(0)
      const [testState, settestState] = useState()
      const [trainState, settrainState] = useState()
      const [Xlbl,setXlbl]=useState("")
const [data,setData]=useState({
  
    // penalty='l2', *, dual=False, tol=0.0001, C=1.0, fit_intercept=True, intercept_scaling=1, class_weight=None, random_state=None, solver='lbfgs', max_iter=100, multi_class='auto', verbose=0, warm_start=False, n_jobs=None, l1_ratio=None)[source]¶
    penalty:'l2',
    C:1.0,
    fit_intercept:"True",
    max_iter:100,
    solver:'lbfgs',
    multi_class:'auto',
    l1_ratio:0,

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
e.preventDefault();
await axios.post("http://127.0.0.1:5000/Hyperpara",{
    penalty:data.penalty,
    C:data.C,
    fit_intercept:data.fit_intercept,
    max_iter:data.max_iter,
    solver:data.solver,
    multi_class:data.multi_class,
    l1_ratio:data.l1_ratio,

algo:"LogisticReg",
headers:headerss

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
const handleClick1 = () => {
    ref1.current?.scrollIntoView({behavior: 'smooth'});
  };
function getGraphC(){
    handleClick1();
    setalert(1)
    axios.get("http://127.0.0.1:5000/hyperVisualC").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
    setXlbl("C")

    })
}
function getGraphl1(){
    axios.get("http://127.0.0.1:5000/hyperVisuall1").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
    setXlbl("l1_ratio")

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
function randomColorGen(){
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
function getConf(){
    setconfmat(1)
}
const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

    return<div className="MainPage">
   <form className="ParameterForm">
   <h1>Logistic Regression</h1>
   <div className="cont01" style={{display:"flex" ,gap:"3px"}}><div>"l1" , "l2" , "elasticnet" , "none"<p>Type Of Penalty</p>  <input className="parainput"  type="text" onChange={handleChange} placeholder="Penalty" name="penalty" value={data.penalty}/></div>

   <div><p> Fit Intercept:</p><input className="parainput"  type="text" onChange={handleChange} placeholder="Fit_intercept" name="fit_intercept" value={data.fit_intercept}/></div></div>
   <div className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>C</p> <input className="parainput"  type="decimal" onChange={handleChange} placeholder="C" name="C" value={data.C}/></div>
   <div><p> Max_iterations:</p> <input type="number"  className="parainput" onChange={handleChange} placeholder="Max Iteration" name="max_iter" value={data.max_iter}/></div></div>
  <div className="cont"><h3> Warning</h3>
    <p>   The choice of the algorithm depends on the penalty chosen: Supported penalties by solver: </p>
    <p>newton-cg - [l2, none] </p>

    <p>lbfgs - [l2, none] </p>

    <p>liblinear - [l1, l2] </p>

    <p>sag - [l2, none] </p>

    <p>saga - [elasticnet, l1, l2, none] </p>

    </div>
    <div className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Solver</p> <input className="parainput"  type="text" onChange={handleChange} placeholder="Solver" name="solver" value={data.solver}/></div>
    <div><p>"newton-cg" , "lbfgs" , "liblinear" , "sag", "saga" , default= "lbfgs" </p><p> Multi_class: </p><input className="parainput"  type="text" onChange={handleChange} placeholder="Multi_Class" name="multi_class" value={data.multi_class}/></div></div>
    <div><p>used with elasticnet penalty (0 to 1)</p><p> L1 Ratio: </p> <input className="parainput"  type="decimal" onChange={handleChange} placeholder="L1 Ratio" name="l1_ratio" value={data.l1_ratio}/></div>
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





<button className="btn-two" style={{height:"80px",width:"250px",margin:"50px"}}  onClick={getConf}>get Confusion Matrix</button>
<div className="visual">
<h1>Hyperparameter Visuals</h1>
<div className="hyperCont">
<button className="btn-two" onClick={getGraphC}>C parameters Tuning</button>
<button className="btn-two" onClick={getGraphl1}>l1 _ratio parameters Tuning</button>
</div>
</div>
<div ref={ref1} style={{width:"90vw"}}>
{displayGraph?<ScatterPlot 
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
height={500}
width={500}


/></div>:""}

</div>
    </div>
}