import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
    import './scatter.css'

export default function ScatterPlot(props){
    function Parse(dta){
        let updatedData=[]
      for(let i=0;i<dta.x.length;i++)
      {
         updatedData.push({"x":dta.x[i],"y":Math.round(dta.y[i] * 10000) / 10000})
    
      }
      return updatedData
    }
    let xlbl= props.xlabel
    

   return <div className='ScatterCont'
   style={{display:"flex",
   alignItems:'center',
   justifyContent:'center',
   flexDirection:"column",
  
  margin:"auto"

   
  
   
   }}>
     <div style={{margin:"auto"}}>



        {props.testState?<ScatterChart 
      
         margin={{
          top: 100,
          right: 10,
          bottom: 10,
          left: 10,
        }}

        
        style={{transform:"scale(0.8)",
         backgroundColor:"white",
         border:"1px solid greenyellow",
         boxShadow:"1px 1px 30px 6px greenyellow",
         margin:"0",

         


        
         
         
      
      }}width={1000} height={1000}>
         <text x={1000 / 2} y={50} fill="black" textAnchor="middle" dominantBaseline="central">
       <tspan fontSize="60">Test Visuals</tspan>
       </text>
        
            <CartesianGrid />
            <XAxis type="number" 
              label={{ value:props.xlabel,angle: 359, position:'insidebottom' }}
            dataKey="x" tickCount={(props.testState.x).length}domain={[Math.min(props.testState.x),Math.max(props.trainState.x)]}/>
            <YAxis type="number"  tickCount={(props.testState.y).length}  domain={[Math.min(props.testState.y),Math.max(props.testState.y)]} dataKey="y" label={{ value: 'Test Accuracy', angle: -90, position: 'insideLeft' }} />
            <Scatter data={Parse(props.testState)} fill="black" />

        </ScatterChart>:"Loading"}
        </div>
       <div  style={{margin:"auto"}}>
        {props.trainState?<ScatterChart 
         margin={{ 
          top: 100,
         right: 10,
         bottom: 10,
         left: 10,
        }}
         style={{transform:"scale(0.8)",
         backgroundColor:"white",
         border:"1px solid greenyellow",
         boxShadow:"1px 1px 30px 6px greenyellow",
       
        
         
         
      
      }}
        width={1000} height={1000}>
           <text x={1000 / 2} y={50} fill="black" textAnchor="middle" dominantBaseline="central">
       <tspan fontSize="60">Train Visuals</tspan>
       </text>
            <CartesianGrid />
            <XAxis type="number" 
            tickCount={(props.trainState.x).length}
            dataKey="x" 
            label={{ value:props.xlabel,angle: 359, position:'insidebottom' }}
            domain={[Math.min(props.trainState.x),Math.max(props.trainState.x)]}
            
            />
            <YAxis type="number" dataKey="y" tickCount={(props.trainState.y).length} 
          domain={[Math.min(props.trainState.y),Math.max(props.trainState.y)]}
            label={{ value: 'Train Accuracy', angle: -90, position: 'insideLeft' }} />
            <Scatter data={Parse(props.trainState)} fill="black" />

        </ScatterChart>:"Loading"}
        </div>
        </div>
}