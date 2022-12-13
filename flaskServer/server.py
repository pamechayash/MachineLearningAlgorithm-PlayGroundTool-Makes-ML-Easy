from mainScores import TREE
import  Scores

from flask import Flask, jsonify
from flask import request
import os
import json
import numpy as np
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import OneHotEncoder,LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
app=Flask(__name__)
CORS(app)
import json
import requests
from io import StringIO

testscores=[]
trainscores=[]

class Data:
    xtrain=np.array([])
    xtest=np.array([])
    ytrain=np.array([])
    ytest=np.array([])
    df=pd.DataFrame([])
    scores={}
    Reqdata={}
  
datasets=Data()

@app.route("/dataurl",methods=["GET","POST"])
def getDataUrl():
    urll=request.data
    
    json_object = json.loads(urll)
    link=json_object['set']
    print(json_object)
    
    
    
 
    Ycols=json_object['Y']
    url = str(link)

    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0"}
    req = requests.get(url, headers=headers)
    data = StringIO(req.text)
    datasets.df=pd.read_csv(data)
    y=datasets.df[Ycols]
    datasets.xtrain,datasets.xtest,datasets.ytrain,datasets.ytest=train_test_split(datasets.df.drop([Ycols], axis=1),y,test_size=0.2,random_state=10)
    
    print(datasets.ytrain)

    return ""
    
   

@app.route("/getDataDetail",methods=["GET","POST"])
def giveDetail():
    print(datasets.xtrain.shape)
    return {"xtrainShape":datasets.xtrain.shape,
    "ytrainShape":datasets.ytrain.shape,
    "xtestShape":datasets.xtest.shape,
    "ytestShape":datasets.ytest.shape,
    "completeShape":datasets.df.shape,
    
  }


@app.route("/Hyperpara",methods=["POST","GET"])
def RunDecisionTree():

    if(request.method=='POST'):
        datasets.Reqdata['data']=request.data
        json_object = json.loads(datasets.Reqdata['data'])
        algorithm=json_object['algo']
        
        datasets.scores.clear()
        if(algorithm=='DecisionTree'):
            datasets.scores['measure']=(TREE.DecisionTreeClass(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        
        )
        if(algorithm=='DecisionTreeReg'):
            datasets.scores['measure']=TREE.DecisionTreeRegression(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)

        if(algorithm=='LogisticReg'):
            datasets.scores['measure']=TREE.LogReg(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        if(algorithm=='LinearReg'):
            datasets.scores['measure']=TREE.LinearRegressionAlgo(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        if(algorithm=='RidgeReg'):
            datasets.scores['measure']=TREE.RidgeRegressionAlgo(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
            print("-----------****-----")
            print(datasets.scores['measure'])
        if(algorithm=='LassoReg'):
            datasets.scores['measure']=TREE.LassoRegressionAlgo(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        if(algorithm=='RanForest'):
            datasets.scores['measure']=TREE.RanForestClassifier(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        if(algorithm=='SVM'):
            datasets.scores['measure']=TREE.SVM(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        if(algorithm=='RanForestReg'):
            datasets.scores['measure']=TREE.RanForestReg(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)
        if(algorithm=='Knn'):
            datasets.scores['measure']=TREE.Knn(data=datasets.Reqdata['data'],xtrain=datasets.xtrain,
            ytrain=datasets.ytrain,xtest=datasets.xtest,
            ytest=datasets.ytest)

        



            



        return "done"
    
    
    if(request.method=="GET"):
        print("++++++++++++++++++")
        print(datasets.scores['measure'])
        
        return datasets.scores['measure']


@app.route("/hyperVisualDepth",methods=["POST","GET"])
def GiveScore():
    x=np.arange(1,100)
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
     dta=datasets.Reqdata['data'],
    para="Depth"
    )
    print(y)
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
       "x":x.tolist(),
      "y":tuple(y[1])
    }
    }
    

@app.route("/hyperVisualC",methods=["POST","GET"])
def GveScore():
    x=np.linspace(0, 1, num=50)
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
     dta=datasets.Reqdata['data'],
    para="C"
    )
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
       "x":x.tolist(),
      "y":tuple(y[1])
    }
    }
@app.route("/hyperVisualFeature",methods=["POST","GET"])
def Gscore():
    col=datasets.xtrain.shape[1]+1
    x=np.arange(1,col)
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
    para="Features",
    dta=datasets.Reqdata['data']
    )
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
     "x":x.tolist(),
      "y":tuple(y[1])

    }

    }

    
@app.route("/hyperVisuall1",methods=["POST","GET"])
def GiScore():
    x=np.linspace(0, 1, 50)
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
    para="l1_ratio",
    dta=datasets.Reqdata['data']
    )
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
     "x":x.tolist(),
      "y":tuple(y[1])

    }

    }

@app.route("/hyperVisualLem",methods=["POST","GET"])
def GiveScore1():
    x=np.linspace(0,20,50)
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
     dta=datasets.Reqdata['data'],
    para="alpha"
    )

    print(x)
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
       "x":x.tolist(),
      "y":tuple(y[1])
    }
    }
@app.route("/hyperVisualK",methods=["POST","GET"])
def GiveKnnScore():
    x=np.arange(1,60,2)
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
     dta=datasets.Reqdata['data'],
    para="k"
    )

    
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
       "x":x.tolist(),
      "y":tuple(y[1])
    }
    }


@app.route("/hyperVisualSplitter",methods=["POST","GET"])
def splitterscore():
    
    x=np.array(['best','random'])
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
    para="splitter",
    dta=datasets.Reqdata['data']
    )
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
     "x":x.tolist(),
      "y":tuple(y[1])

    }

    }

    
@app.route("/hyperVisualAlgorithm",methods=["POST","GET"])
def Algoscore():
    
    x=np.array(['auto','ball_tree','kd_tree','brute'])
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
    para="Algorithm",
    dta=datasets.Reqdata['data']
    )
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
     "x":x.tolist(),
      "y":tuple(y[1])

    }

    }

    
@app.route("/hyperVisualWeight",methods=["POST","GET"])
def Weightscore():
    
    x=np.array(['uniform', 'distance'])
    y=Scores.HyperScore(xtrain=datasets.xtrain,
    ytrain=datasets.ytrain,
    xtest=datasets.xtest,
    ytest=datasets.ytest,
    para="Weight",
    dta=datasets.Reqdata['data']
    )
    return {
       "acctest": {
      "x":x.tolist(),
      "y":tuple(y[0])

    },
    "acctrain":{
     "x":x.tolist(),
      "y":tuple(y[1])

    }

    }

    








   

   
  

if __name__=="__main__":
    app.run(debug=True)

















