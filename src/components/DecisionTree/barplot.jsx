import {  BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    CartesianGrid,
    Tooltip,
    Legend} from 'recharts';
// import { Chart as ChartJS  ,Title,Tooltip, Legend} from 'chart.js'
// import {Bar} from 'react-chartjs-2'
// ChartJS.register(
//     Title,Tooltip, Legend
// )
export default function BarPlot(props){
    function Parse(dta){
        let updatedData=[]
        for(let i=0; i<dta.x.length;i++)
        {
            updatedData.push({"x":dta.x[i],"y":Math.round(dta.y[i] * 10000) / 10000})

        }

     
      return updatedData
    }
    let xlbl= props.xlabel
    

   return <div>
       <h1>{props.name}</h1>
       <h1>Test Visuals</h1>
       {props.testState ? <BarChart width={730} height={250} data={Parse(props.testState)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Bar label={true} dataKey="y" fill="#8884d8" />
    </BarChart>:"load"}
   


        
        </div>
}