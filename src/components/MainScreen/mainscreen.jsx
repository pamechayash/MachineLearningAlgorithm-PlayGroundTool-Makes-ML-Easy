import { useNavigate } from 'react-router-dom'
import './mainscreen.css'
import Back from '../assets/backPhoto.jpeg'
import { useState,useEffect } from 'react';
import Lottie from 'react-lottie';
import Main from '../AnimationData/MainPage';
import Anime1 from '../AnimationData/Anime1.json';
export default function MainScreen(){

const [size,setsize]=useState(0);

const navigate=useNavigate();


function navTOApp(){
    navigate('/App')
}


window.addEventListener("scroll",changeSize)
function changeSize(){
  setsize(window.scrollY);
}
const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: Main,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: Anime1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

    return    <div id="MainScreenCont" > 
    <div className='Contact'
    //  onMouseOver={showBox}  onMouseOut={unshowBox} 
     >
  Developed By 
@YashPamecha

    </div>
   

             <div className='Heading'>
          Machine Learning Playground
       </div>
       <div className="subCont">
     <div className='ContentBlock'>

  
        
         <div
         className='anime'
         style={{

        overflow:"hidden",
        width:"600"+"px",
        height:"500px",
        border:"0.5px solid grey",
        boxShadow:"1px 1px 40px 6px white",
        borderRadius:"30%",
        margin:"80px",
        transform:" rotate3d(1, 1, 1, "+size+"deg)",
    transition:"0.01s",

  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  

        
        
        }} >
    
               <Lottie 
                
           
                options={defaultOptions1}
                height={700}
                width={700}
                
        
              />
                       
              </div>
              <div className='btnComp'>
              <h2 style={{display:"flex" ,gap:"20px"}}><p className='RA'>Run</p> <div style={{
                  borderLeft: "6px solid grey",
                  height: "100px"

              }}></div> <p className='RA'>Analyse</p></h2>
              <button className='start' onClick={navTOApp}>Get Started</button>
              </div>
             

           
              </div>
    
    <h1>Things To Keep In Mind</h1>
<p>
In Every Classification algorithm , first Run the algo then go for confustion matrix
</p>
<p>
In case Of SVM algorithm, you have to wait for a moment to see updated accuracies because SVM includes complex calculations behind.
</p>
<p>
If you are not getting correct shape of data on clicking Take Details button then try again or click Take Details button again
</p>
<p>
Although related information about every parameter in every algorithm is included above the parameter but still in case of any confusion go for official doc or resources included here
</p>
<p>
Sample data Links are Provided above use them to test the system 
</p>
<h1>RESOURCES FOR HELP</h1>

<div className='doc'><a href="https://scikit-learn.org/stable/">Complete Official Documentation</a>
<a href="https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH">Complete playlist for ml</a>
<a href="https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF">Prefer for deepdown statiscal ML concepts</a>

</div>
              </div>
          
              </div>
           

}