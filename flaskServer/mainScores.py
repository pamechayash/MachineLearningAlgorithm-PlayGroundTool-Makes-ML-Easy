from enum import unique
import json
import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import log_loss,classification_report
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import Ridge , Lasso
from sklearn.tree import DecisionTreeClassifier,DecisionTreeRegressor
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score ,r2_score,mean_absolute_error,mean_squared_error
class TREE:
    def DecisionTreeClass(data,xtrain,ytrain,xtest,ytest):
        
                
        json_object = json.loads(data)
            
            

    
        criterion=json_object["Criterion"]
        max_depth=int(json_object["Depth"])if int(json_object["Depth"]) else None
        splitter=json_object["Splitter"]
        min_samples_split=int(json_object["minSampleSplit"])
        min_samples_leaf=int(json_object["minSampleLeaf"])
        min_impurity_decrease=float(json_object["minImpurityDecrease"])
        max_features=int(json_object["maxFeatures"])if int(json_object["maxFeatures"]) else None
        
        testscores=0
        trainscores=0
        dt=DecisionTreeClassifier(criterion=criterion, splitter=splitter, max_depth=max_depth, min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf, min_weight_fraction_leaf=0.0, max_features=max_features, random_state=None, max_leaf_nodes=None, min_impurity_decrease=min_impurity_decrease,  ccp_alpha=0.0


    )
        
        print("trained")    
        dt.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=dt.predict(xtest)
        ypred1=dt.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(accuracy_score(ytest,ypred))
        print("ytrain")
        print(ytrain)
        trainscores=(accuracy_score(ytrain,ypred1))
        conf=(confusion_matrix(ytest,ypred)).tolist()
        lgls=log_loss(ytest,ypred)  
        report=classification_report(y_true = ytest, y_pred = ypred, output_dict=True)
        ycol=pd.Series(ytrain).unique()
        print(report)
          
            
        return {"testscores":testscores,"trainscores":trainscores,
            "ConfusionMatric":conf,
            "logloss":lgls,
            "report":report,
            "ycol":list(ycol),
        
            }
    def LogReg(data,xtrain,ytrain,xtest,ytest):
        json_object = json.loads(data)
        penalty=json_object["penalty"]
        C=float(json_object["C"])
        fit_intercept=True if json_object["fit_intercept"]=='True' else False
        max_iter=int(json_object["max_iter"])
        solver=json_object["solver"]
        multi_class=json_object["multi_class"]
        l1_ratio=float(json_object['l1_ratio'])
        if(l1_ratio > 0 and l1_ratio < 1):
            penalty="elasticnet"
        elif(l1_ratio == 0):
            penalty="l2"
        elif(l1_ratio == 1):
            penalty="l1"
        else:
            penalty="l2"





        Log=LogisticRegression(penalty=penalty,C=C,fit_intercept=fit_intercept,max_iter=max_iter,solver=solver,
        multi_class=multi_class,
        l1_ratio=l1_ratio
        
        )
        Log.fit(xtrain,ytrain)
        ypred= Log.predict(xtest)
        ypred1= Log.predict(xtrain)
        
        
        testscores=(accuracy_score(ytest,ypred))
       
        trainscores=(accuracy_score(ytrain,ypred1))
        conf=(confusion_matrix(ytest,ypred)).tolist()
        report=classification_report(y_true = ytest, y_pred = ypred, output_dict=True)
        ycol=pd.Series(ytrain).unique()
        return {"testscores":testscores,"trainscores":trainscores,
            "ConfusionMatric":conf,
 "report":report,
            "ycol":list(ycol),
        
            }





   
        
    def SVM(data,xtrain,ytrain,xtest,ytest):
        json_object=json.loads(data)
        C=float(json_object['C'])
        kernel=json_object['kernel']
       
        
        svc=SVC(C=C,
        kernel=kernel
        )

        svc.fit(xtrain,ytrain)
        ypred= svc.predict(xtest)
        ypred1= svc.predict(xtrain)
        
        
        testscores=(accuracy_score(ytest,ypred))
       
        trainscores=(accuracy_score(ytrain,ypred1))
        conf=(confusion_matrix(ytest,ypred)).tolist()
        report=classification_report(y_true = ytest, y_pred = ypred, output_dict=True)
        ycol=pd.Series(ytrain).unique()
        return {"testscores":testscores,"trainscores":trainscores,
            "ConfusionMatric":conf,
             "report":report,
            "ycol":list(ycol),
            }




    def Knn(data,xtrain,ytrain,xtest,ytest):
        json_object=json.loads(data)
        
        n_neighbors=int(json_object['n_neighbors']) if int(json_object['n_neighbors']) else 5
        weights=json_object['weights']
        algorithm=json_object['algorithm']
        leaf_size=int(json_object['leaf_size'])
        metric=json_object['metric']
 
        knn=KNeighborsClassifier(n_neighbors=n_neighbors, weights=weights, algorithm=algorithm, leaf_size=leaf_size, p=2, metric=metric, n_jobs=-1)





        knn.fit(xtrain,ytrain)
        ypred= knn.predict(xtest)
        ypred1= knn.predict(xtrain)
        
        
        testscores=(accuracy_score(ytest,ypred))
       
        trainscores=(accuracy_score(ytrain,ypred1))
        conf=(confusion_matrix(ytest,ypred)).tolist()
        report=classification_report(y_true = ytest, y_pred = ypred, output_dict=True)
        ycol=pd.Series(ytrain).unique()
        return {
            "testscores":testscores,"trainscores":trainscores,
            "ConfusionMatric":conf,
             "report":report,
            "ycol":list(ycol),
            }












    def DecisionTreeRegression(data,xtrain,ytrain,xtest,ytest):
    
            
        json_object = json.loads(data)
        
        

 
        criterion=json_object["Criterionr"]
        max_depth=int(json_object["Depth"])if int(json_object["Depth"]) else None
        splitter=json_object["Splitter"]
        min_samples_split=int(json_object["minSampleSplit"])
        min_samples_leaf=int(json_object["minSampleLeaf"])
        min_impurity_decrease=float(json_object["minImpurityDecrease"])
        max_features=int(json_object["maxFeatures"])if int(json_object["maxFeatures"]) else None
        
        testscores=0
        trainscores=0
        dt=DecisionTreeRegressor(criterion=criterion, splitter=splitter, max_depth=max_depth, min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf, min_weight_fraction_leaf=0.0, max_features=max_features, random_state=None, max_leaf_nodes=None, min_impurity_decrease=min_impurity_decrease,  ccp_alpha=0.0


    )
        
        print("trained")    
        dt.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=dt.predict(xtest)
        ypred1=dt.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(r2_score(ytest,ypred))
        testmae=(mean_absolute_error(ytest,ypred))
        testmse=(mean_squared_error(ytest,ypred))
        trainmae=(mean_absolute_error(ytrain,ypred1))
        trainmse=(mean_squared_error(ytrain,ypred1))
        

        

        print("ytrain")
        print(ytrain)
        trainscores=(r2_score(ytrain,ypred1))
        
            
        
        
     
        return {"testscoresR2":testscores,"trainscoresR2":trainscores,
        "testmae":testmae,'testmse':testmse,
        'trainmae':trainmae,
        'trainmse':trainmse,


          
    
        }
    def RidgeRegressionAlgo(data,xtrain,ytrain,xtest,ytest):
        json_object = json.loads(data)
        alph =float(json_object['alpha']) if float(json_object['alpha']) else 0
        rid=Ridge(alpha=float(alph))
        print("trained")    
        rid.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=rid.predict(xtest)
        ypred1=rid.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(r2_score(ytest,ypred))
        testmae=(mean_absolute_error(ytest,ypred))
        testmse=(mean_squared_error(ytest,ypred))
        trainmae=(mean_absolute_error(ytrain,ypred1))
        trainmse=(mean_squared_error(ytrain,ypred1))
        

        

        print("ytrain")
        print(ytrain)
        trainscores=(r2_score(ytrain,ypred1))
        
            
        print("------------")
        print(testscores)
        
        return {"testscoresR2":testscores,"trainscoresR2":trainscores,
        "testmae":testmae,'testmse':testmse,
        'trainmae':trainmae,
        'trainmse':trainmse,
        'Coefs' : rid.coef_.tolist(),
        'Intercept': rid.intercept_,
        


          
    
        }
    def LassoRegressionAlgo(data,xtrain,ytrain,xtest,ytest):
        json_object = json.loads(data)
        alph =float(json_object['alpha']) if float(json_object['alpha']) else 0
        ls=Lasso(alpha=float(alph))
        print("trained")    
        ls.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=ls.predict(xtest)
        ypred1=ls.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(r2_score(ytest,ypred))
        testmae=(mean_absolute_error(ytest,ypred))
        testmse=(mean_squared_error(ytest,ypred))
        trainmae=(mean_absolute_error(ytrain,ypred1))
        trainmse=(mean_squared_error(ytrain,ypred1))
        

        

        print("ytrain")
        print(ytrain)
        trainscores=(r2_score(ytrain,ypred1))
        print("-------***-------")
        print(trainscores) 
        
        
        return {"testscoresR2":testscores,"trainscoresR2":trainscores,
        "testmae":testmae,'testmse':testmse,
        'trainmae':trainmae,
        'trainmse':trainmse,
        'Coefs' : ls.coef_.tolist(),
        'Intercept': ls.intercept_,
        


          
    
        }







    def LinearRegressionAlgo(data,xtrain,ytrain,xtest,ytest):
    
            
        json_object = json.loads(data)
        
        

 
        
        
        testscores=0
        trainscores=0
        Lr=LinearRegression()
        
        print("trained")    
        Lr.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=Lr.predict(xtest)
        ypred1=Lr.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(r2_score(ytest,ypred))
        testmae=(mean_absolute_error(ytest,ypred))
        testmse=(mean_squared_error(ytest,ypred))
        trainmae=(mean_absolute_error(ytrain,ypred1))
        trainmse=(mean_squared_error(ytrain,ypred1))
        

        

        print("ytrain")
        print(ytrain)
        trainscores=(r2_score(ytrain,ypred1))
        
            
        
        
        return {"testscoresR2":testscores,"trainscoresR2":trainscores,
        "testmae":testmae,'testmse':testmse,
        'trainmae':trainmae,
        'trainmse':trainmse,
        'Coefs' : Lr.coef_.tolist(),
        'Intercept': Lr.intercept_,
        


          
    
        }
    def RanForestClassifier(data,xtrain,ytrain,xtest,ytest):
        
                
        json_object = json.loads(data)
            
            

    
        criterion=json_object["criterion"]
        max_depth=int(json_object["max_depth"])if int(json_object["max_depth"]) else None
        
        min_samples_split=int(json_object["min_samples_split"])
        min_samples_leaf=int(json_object["min_samples_leaf"])
        min_impurity_decrease=float(json_object["min_impurity_decrease"])
        max_features=int(json_object["max_features"])if int(json_object["max_features"]) else 'sqrt'
        n_estimators=int(json_object["n_estimators"])
        bootstrap= False if (json_object["bootstrap"]=="False" or json_object["bootstrap"]=="false") else True,
        oob_score=True if (json_object["oob_score"]=="True" or json_object["oob_score"]=="true" ) else False,
        n_jobs= int(json_object['n_jobs']) if (int(json_object['n_jobs'])== -1) else None
       
        class_weight= json_object['class_weight'] if (json_object['class_weight']) else None
        max_samples=float(json_object["max_samples"]) if (json_object['max_samples']) else None
        testscores=0
        trainscores=0
   
        rf=RandomForestClassifier(criterion=criterion,  max_depth=max_depth, min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf, min_weight_fraction_leaf=0.0, max_features=max_features, random_state=None, max_leaf_nodes=None, min_impurity_decrease=min_impurity_decrease,  ccp_alpha=0.0,
    class_weight=class_weight,
    bootstrap=bootstrap,
   n_jobs=n_jobs,
   max_samples=max_samples,

    )
        
        print("trained")    
        rf.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=rf.predict(xtest)
        ypred1=rf.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(accuracy_score(ytest,ypred))
        print("ytrain")
        print(ytrain)
        trainscores=(accuracy_score(ytrain,ypred1))
        conf=(confusion_matrix(ytest,ypred)).tolist()
            
        report=classification_report(y_true = ytest, y_pred = ypred, output_dict=True)
        ycol=pd.Series(ytrain).unique()
        
        return {"testscores":testscores,"trainscores":trainscores,
            "ConfusionMatric":conf,

         "report":report,
            "ycol":list(ycol),
            }
    def RanForestReg(data,xtrain,ytrain,xtest,ytest):
        
                
        json_object = json.loads(data)
            
            

        
        criterio=json_object["criterion"]
        max_depth=int(json_object["max_depth"])if int(json_object["max_depth"]) else None
        
        min_samples_split=int(json_object["min_samples_split"])
        min_samples_leaf=int(json_object["min_samples_leaf"])
        min_impurity_decrease=float(json_object["min_impurity_decrease"])
        max_features=int(json_object["max_features"])if int(json_object["max_features"]) else 1.0
        n_estimators=int(json_object["n_estimators"])
        bootstrap= False if (json_object["bootstrap"]=="False" or json_object["bootstrap"]=="false") else True,
        oob_score=True if (json_object["oob_score"]=="True" or json_object["oob_score"]=="true" ) else False,
        n_jobs= int(json_object['n_jobs']) if (int(json_object['n_jobs'])== -1) else None
       
        max_samples=float(json_object["max_samples"]) if (json_object['max_samples']) else None
        testscores=0
        trainscores=0
        rf=RandomForestRegressor(criterion=criterio,  max_depth=max_depth, min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf, min_weight_fraction_leaf=0.0, max_features=max_features, random_state=None, max_leaf_nodes=None, min_impurity_decrease=min_impurity_decrease,  ccp_alpha=0.0,

    bootstrap=bootstrap,
   n_jobs=n_jobs,
   max_samples=max_samples,

    )
        
        print("trained")    
        rf.fit(xtrain,ytrain)
        print("xtest----->")
        print(xtest)
        ypred=rf.predict(xtest)
        ypred1=rf.predict(xtrain)
        print("ytest")
        print(ytest)
        print("ypred")
        print(ypred)
        testscores=(r2_score(ytest,ypred))
        print("ytrain")
        print(ytrain)
        trainscores=(r2_score(ytrain,ypred1))
        testmae=(mean_absolute_error(ytest,ypred))
        testmse=(mean_squared_error(ytest,ypred))
        trainmae=(mean_absolute_error(ytrain,ypred1))
        trainmse=(mean_squared_error(ytrain,ypred1))
        
        print("{{{{{{}}}}}}}")
        print(json_object["max_depth"])

        
     
        return {"testscoresR2":testscores,"trainscoresR2":trainscores,
        "testmae":testmae,'testmse':testmse,
        'trainmae':trainmae,
        'trainmse':trainmse,
         
            }

    




    



