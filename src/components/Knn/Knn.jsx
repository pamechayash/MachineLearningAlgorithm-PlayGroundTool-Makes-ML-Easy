import axios from "axios";
import ReportCont from "../report/report";
import { useState ,useRef} from "react";
import Lottie from "react-lottie";
import Loading from "../AnimationData/Loading.json"
import BarPlot from "../DecisionTree/barplot";
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import ScatterPlot from "../DecisionTree/ScatterPlot";
import Run from "../AnimationData/Run.json"
import "./Knn.css"
export default function Knn(){

    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };
      const ref = useRef(null);
      const [displayMetrics, setdisplayMetrics] = useState(0)
      const [displayGraphBr, setdisplayGraphBr] = useState(0)
      const [confmat ,setconfmat]=useState(0)
      const [namePara,setname]=useState('');
      const [nameParasc,setnamesc]=useState('');
      const[alerti,setalert]=useState(0)
      const ref1 = useRef(null);
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
    
    n_neighbors:5,
    weights:'uniform',
    algorithm:'auto',
    leaf_size:30,
    metric:'minkowski',



})
const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Run,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
function getGraphK(){
    setalert(1)
    handleClick1();
    axios.get("http://127.0.0.1:5000/hyperVisualK").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraph(1)
    setnamesc("no. of neighbors Analysis")
    setXlbl("K")
    setdisplayGraphBr(0)

    })
}
function getGraphBar(){
    setalert(1)
    handleClick1();
    axios.get("http://127.0.0.1:5000/hyperVisualAlgorithm").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraphBr(1)
    setdisplayGraph(0)
    setname("Algorithm type  Analysis")
    setXlbl("Methods")

    })
}
function getGraphWeight(){
    setalert(1)
    handleClick1();
    axios.get("http://127.0.0.1:5000/hyperVisualWeight").then((response)=>{
    settestState(response.data.acctest)
    settrainState(response.data.acctrain)
    setdisplayGraphBr(1)
    setdisplayGraph(0)
    setname("Weight type  Analysis")
    setXlbl("Methods")

    })
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
e.preventDefault();
handleClick();
await axios.post("http://127.0.0.1:5000/Hyperpara",{
    n_neighbors:data.n_neighbors,
    weights:data.weights,
    algorithm:data.algorithm,
    leaf_size:data.leaf_size,
    metric: data.metric,
 

algo:"Knn",
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
function randomColorGen(){
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}
function getConf(){
    setconfmat(1)
}
const handleClick1 = () => {
    ref1.current?.scrollIntoView({behavior: 'smooth'});
  };

    return<div className="MainPage">
   <form className="ParameterForm">
   <h1>K Nearest Neighbors Classifier</h1>
   <div className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>"uniform" "distance"</p><p>Weights:</p> <input type="text" className="parainput" onChange={handleChange} placeholder="weights" name="weights" value={data.weights}/></div>
 
  <div><p>  "auto"   "ball_tree"   "kd_tree"    "brute"</p><p> Algorithm:</p><input type="text" className="parainput" onChange={handleChange} placeholder="algorithm" name="algorithm" value={data.algorithm}/></div></div>
  <div className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>leaf_size(Leaf size passed to BallTree or KDTree):</p>  <input type="number" className="parainput" onChange={handleChange} placeholder="leaf_size" name="leaf_size" value={data.leaf_size}/></div>

  <div><p> n_neighbors(odd number):</p><input type="number" className="parainput" onChange={handleChange} placeholder="n_neighbors" name="n_neighbors" value={data.n_neighbors}/></div></div>


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





<button className="btn-two" style={{height:"80px",width:"250px",margin:"50px"}} onClick={getConf}>Get Confusion Matrix</button>
<div className="visual">
<h1>Hyperparameter Visuals</h1>
<div className="hyperCont">
<button className="btn-two" onClick={getGraphK}>Get Effect Of K</button>
<button className="btn-two" onClick={getGraphBar}>Get Effect Algo</button>
<button className="btn-two" onClick={getGraphWeight}>Get Effect Weight</button>
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
    </div>
}