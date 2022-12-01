import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import cors from "cors"
import backPhoto from "./components/assets/backPhoto.jpeg"
import axios from "axios";


import Lottie from 'react-lottie'
import GiveData from './components/AnimationData/Give';
import DataForm from './components/AnimationData/DataForm';
import { useNavigate } from 'react-router-dom';

import arrow from './components/AnimationData/arrow1';

function App() {

  let headerss = {
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  
  };
  const navigate=useNavigate();
  const [displayins, setdisplayins] = useState(0);
   const [url, seturl] = useState("");
  const [urlCSV,seturlCSV]=useState("");
   const [Y, setY]=useState("");
const [displayShape,setdisplayShape]=useState(0)
   const [shape,setShape]=useState(
{
completeShape: [],
xtrainShape: [],
ytrainShape: [],
xtestShape: [],
ytestShape: [],
}

   );


 async function handleSubmit(){


await axios.post("http://127.0.0.1:5000/dataurl",{set:url,Y:Y,

headers:{
  'Access-Control-Allow-Origin': 'http://localhost:3000'

}


})




   }
  
  function handlechange(event){
   
 setdisplayins(1);
    if(event.target.name=='urll')
 seturl(event.target.value);

  if(event.target.name=='Y')
  setY(event.target.value)
  }
 function getDataDetail(){
  setdisplayShape(1);
  
 axios.get("http://127.0.0.1:5000/getDataDetail",{
  
 headers:headerss
 }
 ).then((response)=>{
    console.log(response.data)
   
    setShape({
      completeShape: response.data.completeShape,
xtrainShape:  response.data.xtrainShape,
ytrainShape:  response.data.ytrainShape,
xtestShape:  response.data.xtestShape,
ytestShape: response.data.ytestShape,
    });
    
   })
}
function navToDtreeClass(){
  navigate('/Decision')
}
function navToDtreeReg(){
  navigate('/DecisionTreeReg')
}
function navToLogReg(){
  navigate('/LogReg')
}

function navToLinReg(){
  navigate('/LinearReg')
}


function navToRidReg(){
  navigate('/Ridge')
}
function navLassoReg(){
  navigate('/LassoReg')
}
function navToRanForest(){
  navigate('/RanForest')
}
function navToRanForestReg(){
  navigate('/RanForestReg')
}
function navToKnn(){
  navigate('/Knn')
}
function navToSVM(){
  navigate('/SVM')
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: GiveData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}
const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: DataForm,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: arrow,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}


    return (

      <div className='mainScreen' >

      <h1 className="mainHead">Provide Data</h1>
      <div className='head'>
        <div className='animationGr'>
      <Lottie 
        id='GiveDataBtn'
        onClick={handleSubmit}
	    options={defaultOptions1}
        height={400}
        width={400}
        

      />
      </div>
    
      <div className='instructionBox'> <h1 className='insHead'>Have a Look</h1>
      <p className='instruc'>Upload the csv file on any server(Prefer Github)</p>
      <p className='instruc'>open the row csv file(uploaded) from Github </p>
      <p className='instruc'>copy url and paste in first input</p>
      <p className='instruc'>write name of Output Feature in second input(Case sensitive)</p>
      <p className='instruc'>Data must be Encoded</p>
      <p className='instruc'>Choose Algorithms Wisely(Classifiers or Regressors According to nature of Data)</p>

      </div>
      
      </div>
      <div className='subCont1'>
      <div className='DataContainer' >
      <div className='instructionBox' style={{display:displayins?"flex":"none"}}> <h1 className='insHead'>Have a Look</h1>
      <p className='instruc'>First - Click on Round Icon To Fetch Data From Url</p>
      <p className='instruc'>Then -  Click On Take Details To Get Information About Data and Apply Algorithms</p>
      

      </div>
      <form id='DataForm' >
         
      
 
    
     
         <input className='dataInput' type="text" placeholder='Please Enter url for data' name="urll" onChange={handlechange}/>
  <input type="text" placeholder='Give name of Output feature' id="Y" name="Y" className='dataInput' onChange={handlechange}/>
 
      
 <button onClick={handleSubmit} id='GiveDataBtn' >
 
 <Lottie 
         id='GiveDataBtn'
         onClick={handleSubmit}
       options={defaultOptions}
         height={150}
         width={150}
         
 
       />
        {console.log(url)}
 </button>
 <Lottie 
        
         onClick={handleSubmit}
       options={defaultOptions2}
         height={150}
         width={300}
         style={{transform:"translate(-100px) translateY(-30px)", display:"none"}}
         
 
       />
        
   
       
       </form>

       </div>
    <button  className='TakeData'  onClick={getDataDetail}>Take Details</button>
<div className='ShapeCont' style={{display:displayShape?"flex":"none"}}>
<div className='ShapeCard'><h3 className='CardHead'>completeShape:</h3>
<h4 className='ShapeData'>ROWS: {shape.completeShape[0]}</h4>
<h4 className='ShapeData'>COLUMNS: {shape.completeShape[1]}</h4>
</div>
<div className='ShapeCard'> <h3 className='CardHead'> XtestShape:</h3>

<h4 className='ShapeData'>ROWS: {shape.xtestShape[0]}</h4>
<h4 className='ShapeData'>COLUMNS: {shape.xtestShape[1]}</h4>
</div>
<div className='ShapeCard'><h3 className='CardHead'> YtestShape:</h3><h4  className='ShapeData'>ROWS: {shape.ytestShape}</h4>
<h4 className='ShapeData'>COLUMNS: 1</h4></div>
<div className='ShapeCard'>   <h3 className='CardHead'>XtrainShape</h3>
<h4  className='ShapeData'>ROWS: {shape.xtrainShape[0]}
</h4> <h4  className='ShapeData'> COLUMNS: {shape.xtrainShape[1]}</h4></div>
<div className='ShapeCard'> <h3 className='CardHead'>YtrainShape</h3>
<h4  className='ShapeData'>ROWS: {shape.ytrainShape}</h4>
<h4  className='ShapeData'>COLUMNS: 1</h4>
</div>
</div>

<div className='instructionBox1' style={{width:"fit-content"}}>
      <h1 className='insHead1'>Data Links To Test System</h1>
      <p className='instruc1' >Classification1:-- https://raw.githubusercontent.com/pamechayash/Bank-marketing-response-predict/main/EncodedPlay.csv <br/> <br/>Categories: 0 and 1<br/> <br/> Output Feature name: output</p>
      <p className='instruc1' >Classification2:-- https://raw.githubusercontent.com/pamechayash/Bank-marketing-response-predict/main/encoded.csv<br/> <br/>Categories: 0 and 1<br/> <br/> Output Feature name: output</p>
      <p className='instruc1' >Regression:-- https://raw.githubusercontent.com/pamechayash/Bank-marketing-response-predict/main/EncodedADV.csv<br/>  <br/> Output Feature name: Sales</p>
      </div>
    <div className='AlgoSpace'>
    <div className='instructionBox' style={{margin:"0" ,boxShadow:"1px 1px 20px 6px rgb(53, 52, 52)"}} > 
    <h1 className='insHead'>Regression Algorithms</h1>


 <div className='algo' onClick={navToDtreeReg}>Decision Tree Regressor</div>

 <div className='algo' onClick={navToLinReg}>Linear Regression</div>
 <div className='algo' onClick={navToRidReg}>Ridge Regression</div>
 <div className='algo' onClick={navLassoReg}>Lasso Regression</div>

 <div className='algo' onClick={navToRanForestReg}>Random Forest Regressor</div>

 </div>
 <div className='instructionBox' style={{margin:"0" ,boxShadow:"1px 1px 20px 6px rgb(53, 52, 52)"}}> 
 <h1 className='insHead'>Classification Algorithms</h1>
 <div className='algo' onClick={navToKnn}>Knn</div>
 <div className='algo' onClick={navToSVM}>SVM Classifier</div>
 <div className='algo' onClick={navToRanForest}>Random Forest</div>
 <div className='algo' onClick={navToDtreeClass}>Decision Tree</div>
 <div className='algo' onClick={navToLogReg}>Logistic Regression</div>
 </div>
 </div>
 </div>






 </div>
  

      
    )
    


}
export default App;



