import "./report.css";

export default function ReportCont(props){

return<div className= "reportcard">

   <div style={{display:"flex"}}>
   <div className="catname">
     <h4 className="metricCardHeading">Category:</h4> 
  <div className="j01">{props.categoryName}</div> </div>
      
      </div> 
    <br/>

    <div className="js-1"> <h4 className="metricCardHeading">precision:</h4> {props.precision}</div> 
 <br/>
 <div className="js-1"> <h4 className="metricCardHeading">recall:</h4> {props.recall}</div> 
<br/>
<div className="js-1"><h4 className="metricCardHeading">f1-score:</h4>{props.f1score}</div> 
</div>


}