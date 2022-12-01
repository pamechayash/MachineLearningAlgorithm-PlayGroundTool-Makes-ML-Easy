import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './index.css';
import Knn from './components/Knn/Knn';
import MainScreen from './components/MainScreen/mainscreen';
import SVM from './components/SVM/svm';
import App from './App';
import Regularisation from './components/RidgeReg/RidgeReg';
import LinearReg from './components/LinearReg/LinearReg';
import Decision from './components/DecisionTree/decision';
import DecisionTreeReg from './components/DecisionTree/DtreeReg';
import LogReg from './components/LogisticReg/LogisticRegression';
import RanForest from './components/RanForest/RanForest';
import RanForestReg from './components/RanForest/RanForestReg';
import Lasso from './components/RidgeReg/Lasso';
import RidgeReg from './components/RidgeReg/RidgeReg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainScreen />} /> 
      <Route path="/App" element={<App />} /> 
    
    <Route path="/Decision" element={<Decision />}/>
    <Route path="/DecisionTreeReg" element={<DecisionTreeReg />}/>
    <Route path="/LogReg" element={<LogReg />}/>
    <Route path="/LinearReg" element={<LinearReg />}/>
    <Route path="/Ridge" element={<RidgeReg />}/>
    <Route path="/SVM" element={<SVM />}/>
    <Route path="/LassoReg" element={<Lasso/>}/>
  <Route  path='/RanForest' element={<RanForest/>}/>
  <Route  path='/RanForestReg' element={<RanForestReg/>}/>
  <Route  path='/Knn' element={<Knn/>}/>
    </Routes>
    </BrowserRouter>
);

