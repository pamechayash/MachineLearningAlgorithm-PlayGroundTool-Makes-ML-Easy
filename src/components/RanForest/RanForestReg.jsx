import axios from "axios";
import Lottie from "react-lottie";
import Run from '../AnimationData/Run.json'
import { useState,useRef } from "react";
import ScatterPlot from "../DecisionTree/ScatterPlot";
import "../DecisionTree/decision.css"
export default function RanForestReg(){
    let headerss= {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      
      };


     
      const ref = useRef(null);
      const [displayMetrics, setdisplayMetrics] = useState(0)
         
      const [testscore, settestscore] = useState(0)
      const [trainscore, settrainscore] = useState(0)


      const[mae,setmae]=useState(0)
      const [mse,setmse]=useState(0)
     

      const[trainmae,settrainmae]=useState(0)
      const [trainmse,settrainmse]=useState(0)
     const [criterion,setcriteria]=useState("squared_error")
     const [max_depth,setmax_depth]=useState(0)
     const [min_samples_leaf,setmin_samples_leaf]=useState(1)
     const [ min_samples_split,setmin_samples_split]=useState(2);
     const [ max_features,setmax_features]=useState(1)
    const [ min_impurity_decrease,setmin_impurity_decrease]=useState(0.0)
    const [ n_estimators,setn_estimators]=useState(100)
          const [ bootstrap,setbootstrap]=useState("True")
            const [ oob_score,setoob_score]=useState("False")
              const [ n_jobs,setn_jobs]=useState(0)
                const [  max_samples,setmax_samples]=useState(0)
// const [data,setData]=useState({
  
//     criterion:"squared_error",
   

//     max_depth: 0,
//     min_samples_leaf: 1,
//     min_samples_split: 2,
//     max_features: 1.0,
//     min_impurity_decrease: 0.0,
//     n_estimators: 100,
//     bootstrap: "True",
//     oob_score: "False",
//     n_jobs: 0,

//      max_samples: 0,

// })
function handleChange(e){

    

        const { name, value } = e.target;
        if(name=='criterion'){
          setcriteria(value)
        }
        else if(name=='max_depth'){
          setmax_depth(value);
        }
        else if(name=='min_samples_leaf'){
          setmin_samples_leaf(value);
        }
        else if(name=='min_samples_split'){
          setmin_samples_split(value);
        }
        else if(name=='max_features'){
          setmax_features(value);
        }
        else if(name=='min_impurity_decrease'){
          setmin_impurity_decrease(value);
        }
        else if(name=='n_estimators'){
          setn_estimators(value);
        }
        else if(name=='bootstrap'){
          setbootstrap(value);
        }
        else if(name=='oob_score'){
          setoob_score(value);
        }
        else if(name=='n_jobs'){
          setn_jobs(value);
        }
        else if(name=='max_samples'){
          setmax_samples(value);
        }

        



       
    };
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
async function handleSubmit(e){
e.preventDefault();
handleClick();
setdisplayMetrics(1)
await axios.post("http://127.0.0.1:5000/Hyperpara",{ 

criterion: criterion,
max_depth: max_depth,

min_samples_leaf:min_samples_leaf,
min_samples_split:min_samples_split,
max_features: max_features,
min_impurity_decrease : min_impurity_decrease,
algo:"RanForestReg",
headers:headerss,
n_estimators: n_estimators,
bootstrap:bootstrap,
oob_score:oob_score,
 n_jobs:n_jobs,

 max_samples:max_samples,

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




    return<div  className="MainPage" >
   <form className="ParameterForm">
   <h1>Random Forest Reggressor</h1>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Criterion:</p><input type="text" onChange={handleChange} placeholder="criterion" className="parainput"  name="criterion" value={criterion}/></div>

  
   <div><p> Max_depth:</p><input type="number" onChange={handleChange} placeholder="Max Depth" name="max_depth" className="parainput"  value={max_depth}/></div></div>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Min Sample Split:</p> <input type="number" className="parainput"  onChange={handleChange} placeholder="Min Sample Split" name="min_samples_split" value={min_samples_split}/></div>
   <div><p> Min Sample Leaf:</p><input type="number" onChange={handleChange} className="parainput"  placeholder="Min Sample Leaf" name="min_samples_leaf" value={min_samples_leaf}/></div></div>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>Max Features:</p>  <input className="parainput"  type="number" onChange={handleChange} placeholder="Max Features" name="max_features" value={max_features}/></div>
   <div><p> Min Impurity Decrease:</p> <input className="parainput"  type="decimal" onChange={handleChange} placeholder="Min Impurity Decrease" name="min_impurity_decrease" value={min_impurity_decrease}/></div></div>
  
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>n_jobs:</p> <input className="parainput" type="number" onChange={handleChange} placeholder="n_jobs" name="n_jobs" value={n_jobs}/></div>
   <div><p> oob_score:</p> <input type="text" onChange={handleChange} className="parainput"  placeholder="oob_score" name="oob_score" value={oob_score}/></div></div>
   <div   className="cont01" style={{display:"flex" ,gap:"3px"}}><div><p>n_estimators:</p> <input className="parainput"  type="number" onChange={handleChange} placeholder="n_estimators" name="n_estimators" value={n_estimators}/></div>
   <div><p> max_samples:</p> <input type="number" onChange={handleChange} className="parainput"  placeholder="max_samples" name="max_samples" value={max_samples}/></div></div>
   <div><p> bootstrap:</p><input type="text" onChange={handleChange} className="parainput"  placeholder="bootstrap" name="bootstrap" value={bootstrap}/></div>
  
  
  
  <button type="submit" className="Run" onClick={handleSubmit}>Run Algorithm
  
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





 
    </div>
}