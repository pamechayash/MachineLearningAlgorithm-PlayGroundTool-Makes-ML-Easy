
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.metrics import accuracy_score,r2_score
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import Ridge,Lasso
import json
def HyperScore(xtrain,ytrain,xtest,ytest,para,dta):
    
    json_object = json.loads(dta)
        
        

    algo=json_object["algo"]
    if(algo=='DecisionTree'):
        criterion=json_object["Criterion"]
    
        max_depth=int(json_object["Depth"])if int(json_object["Depth"]) else None
        splitter=json_object["Splitter"]
        min_samples_split=int(json_object["minSampleSplit"])
        min_samples_leaf=int(json_object["minSampleLeaf"])
        min_impurity_decrease=float(json_object["minImpurityDecrease"])
        max_features=int(json_object["maxFeatures"])if int(json_object["maxFeatures"]) else None
        if(para=='splitter'):
            accuracytest=[]
            accuracytrain=[]
            paragrid=['best','random']
            for i in paragrid:
                dt=DecisionTreeClassifier(max_depth=max_depth,criterion=criterion,
                splitter=i,
                min_samples_split= min_samples_split,
                min_samples_leaf=min_samples_leaf,
                min_impurity_decrease=min_impurity_decrease,
                max_features=max_features,
                
            
                )
                dt.fit(xtrain,ytrain)

                ypred1=dt.predict(xtest)
            
                accuracytest.append(accuracy_score(ytest,ypred1))
                ypred2=dt.predict(xtrain)
                accuracytrain.append(accuracy_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]
            


        if(para=='Depth'):
            x=np.arange(1,100)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                d=i
                dt=DecisionTreeClassifier(max_depth=d,criterion=criterion,
                splitter=splitter,
                min_samples_split= min_samples_split,
                min_samples_leaf=min_samples_leaf,
                min_impurity_decrease=min_impurity_decrease,
                max_features=max_features,

            
                )
 
            
                
                

                dt.fit(xtrain,ytrain)

                ypred1=dt.predict(xtest)
            
                accuracytest.append(accuracy_score(ytest,ypred1))
                ypred2=dt.predict(xtrain)
                accuracytrain.append(accuracy_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]

     
        if(para=='Features'):
            x=np.arange(1,xtrain.shape[1])
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                dt=DecisionTreeClassifier(max_features=i,
                max_depth=max_depth,
                criterion=criterion,
                splitter=splitter,
                min_samples_split= min_samples_split,
                min_samples_leaf=min_samples_leaf,
                min_impurity_decrease=min_impurity_decrease,
                

                
                
                )
            

                dt.fit(xtrain,ytrain)
                ypred1=dt.predict(xtest)

                
                accuracytest.append(accuracy_score(ytest,ypred1))
                ypred2=dt.predict(xtrain)
                accuracytrain.append(accuracy_score(ytrain,ypred2))
        
            return [accuracytest,accuracytrain]
    elif(algo=="RidgeReg"):
        if(para=='alpha'):
            alpha=float(json_object["alpha"])
            x=np.linspace(0,20,50)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                alp=i
                rid=Ridge(alpha=alp)
                rid.fit(xtrain,ytrain)
                ypred1=rid.predict(xtest)
            
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=rid.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            print("train")
            print(accuracytrain)    
            return [accuracytest,accuracytrain]
    elif(algo=="LassoReg"):
        if(para=='alpha'):
            alpha=float(json_object["alpha"])
            x=np.linspace(0,20,50)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                alp=i
                ls=Lasso(alpha=alp)
                ls.fit(xtrain,ytrain)
                ypred1=ls.predict(xtest)
            
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=ls.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]





    elif(algo=='Knn'):
        
        
        n_neighbors=int(json_object['n_neighbors']) if int(json_object['n_neighbors']) else 5
        weights=json_object['weights']
        algorithm=json_object['algorithm']
        leaf_size=int(json_object['leaf_size'])
        metric=json_object['metric']



        if(para=='k'):
            x=np.arange(1,60,2)
            accuracytest=[]
            accuracytrain=[]
            for i in x:

                knn=KNeighborsClassifier(n_neighbors=i, weights=weights, algorithm=algorithm, leaf_size=leaf_size, p=2, metric=metric, n_jobs=-1)
                knn.fit(xtrain,ytrain)
                ypred2= knn.predict(xtrain)
                ypred1= knn.predict(xtest)
                accuracytest.append(accuracy_score(ytest,ypred1))
                
                accuracytrain.append(accuracy_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]

        if(para=='Algorithm'):
            x=['auto','ball_tree','kd_tree','brute']
            accuracytest=[]
            accuracytrain=[]
            for i in x:

                knn=KNeighborsClassifier(n_neighbors=n_neighbors, weights=weights, algorithm=i, leaf_size=leaf_size, p=2, metric=metric, n_jobs=-1)
                knn.fit(xtrain,ytrain)
                ypred2= knn.predict(xtrain)
                ypred1= knn.predict(xtest)
                accuracytest.append(accuracy_score(ytest,ypred1))
                
                accuracytrain.append(accuracy_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]
        if(para=='Weight'):
            x=['uniform', 'distance']
            accuracytest=[]
            accuracytrain=[]
            for i in x:

                knn=KNeighborsClassifier(n_neighbors=n_neighbors, weights=i, algorithm=algorithm, leaf_size=leaf_size, p=2, metric=metric, n_jobs=-1)
                knn.fit(xtrain,ytrain)
                ypred2= knn.predict(xtrain)
                ypred1= knn.predict(xtest)
                accuracytest.append(accuracy_score(ytest,ypred1))
                
                accuracytrain.append(accuracy_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]




        
        




    elif(algo=='DecisionTreeReg'):
        criterion=json_object["Criterionr"]
    
        max_depth=int(json_object["Depth"])if int(json_object["Depth"]) else None
        splitter=json_object["Splitter"]
        min_samples_split=int(json_object["minSampleSplit"])
        min_samples_leaf=int(json_object["minSampleLeaf"])
        min_impurity_decrease=float(json_object["minImpurityDecrease"])
        max_features=int(json_object["maxFeatures"])if int(json_object["maxFeatures"]) else None
        if(para=='Depth'):
            x=np.arange(1,100)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                d=i
                dt=DecisionTreeRegressor(max_depth=d,criterion=criterion,
                splitter=splitter,
                min_samples_split= min_samples_split,
                min_samples_leaf=min_samples_leaf,
                min_impurity_decrease=min_impurity_decrease,
                max_features=max_features,

            
                )
                
                

                dt.fit(xtrain,ytrain)

                ypred1=dt.predict(xtest)
            
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=dt.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]
        if(para=='splitter'):
            accuracytest=[]
            accuracytrain=[]
            paragrid=['best','random']
            for i in paragrid:
                dt=DecisionTreeRegressor(max_depth=max_depth,criterion=criterion,
                splitter=i,
                min_samples_split= min_samples_split,
                min_samples_leaf=min_samples_leaf,
                min_impurity_decrease=min_impurity_decrease,
                max_features=max_features,
                
            
                )
                dt.fit(xtrain,ytrain)

                ypred1=dt.predict(xtest)
            
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=dt.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]   
        if(para=='Features'):
            x=np.arange(1,xtrain.shape[1]+1)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                dt=DecisionTreeRegressor(max_features=i,
                max_depth=max_depth,
                criterion=criterion,
                splitter=splitter,
                min_samples_split= min_samples_split,
                min_samples_leaf=min_samples_leaf,
                min_impurity_decrease=min_impurity_decrease,
                

                
                
                )
            

                dt.fit(xtrain,ytrain)
                ypred1=dt.predict(xtest)

                
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=dt.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            print("triggered")
            print(accuracytest)
            return [accuracytest,accuracytrain]
    elif(algo=='LogisticReg'):

        

        json_object = json.loads(dta)
        penalty=json_object["penalty"]
        C=float(json_object["C"])
        fit_intercept=True if json_object["fit_intercept"]=='True' else False
        max_iter=int(json_object["max_iter"])
        solver=json_object["solver"]
        multi_class=json_object["multi_class"]
        l1_ratio=float(json_object['l1_ratio'])
        if(para=='C'):
            x=np.linspace(0, 1, num=50)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                Log=LogisticRegression(
                    penalty=penalty,C=i,fit_intercept=fit_intercept,max_iter=max_iter,solver=solver,
            multi_class=multi_class,
            
        
                

                
                
                )
            

                Log.fit(xtrain,ytrain)
                ypred1=Log.predict(xtest)

                
                accuracytest.append(accuracy_score(ytest,ypred1))
                ypred2=Log.predict(xtrain)
                accuracytrain.append(accuracy_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]
        if(para=='l1_ratio'):
            x=np.linspace(0, 1, num=50)

            
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                Log=LogisticRegression(
                    penalty='elasticnet',C=C,fit_intercept=fit_intercept,max_iter=max_iter,solver=solver,
            multi_class=multi_class,
            l1_ratio=i
        
                

                
                
                )
            

                Log.fit(xtrain,ytrain)
                ypred1=Log.predict(xtest)

                
                accuracytest.append(accuracy_score(ytest,ypred1))
                ypred2=Log.predict(xtrain)
                accuracytrain.append(accuracy_score(ytrain,ypred2))
        





        return [accuracytest,accuracytrain]

    elif(algo=='RanForest'):
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
        class_weight= json.loads(json_object['class_weight']) if (json_object['class_weight']) else None
        max_samples=float(json_object["max_samples"]) if (json_object['max_samples']) else None
        if(para=='Depth'):
            x=np.arange(1,100)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                d=i
                rfc=RandomForestClassifier(criterion=criterion,  max_depth=d, min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf, min_weight_fraction_leaf=0.0, max_features=max_features, random_state=None, max_leaf_nodes=None, min_impurity_decrease=min_impurity_decrease,  ccp_alpha=0.0,
    class_weight=class_weight,
    bootstrap=bootstrap,
   n_jobs=n_jobs,

   n_estimators=n_estimators,
   max_samples=max_samples,

            
                )
                
                

                rfc.fit(xtrain,ytrain)

                ypred1=rfc.predict(xtest)
            
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=rfc.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]
            

    elif(algo=='RanForestR'):
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
        class_weight= json.loads(json_object['class_weight']) if (json_object['class_weight']) else None
        max_samples=float(json_object["max_samples"]) if (json_object['max_samples']) else None
        if(para=='Depth'):
            x=np.arange(1,100)
            accuracytest=[]
            accuracytrain=[]
            for i in x:
                d=i
                rfc=RandomForestRegressor(criterion=criterion,  max_depth=d, min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf, min_weight_fraction_leaf=0.0, max_features=max_features, random_state=None, max_leaf_nodes=None, min_impurity_decrease=min_impurity_decrease,  ccp_alpha=0.0,
    class_weight=class_weight,
    bootstrap=bootstrap,
   n_jobs=n_jobs,

   n_estimators=n_estimators,
   max_samples=max_samples,

            
                )
                
                

                rfc.fit(xtrain,ytrain)

                ypred1=rfc.predict(xtest)
            
                accuracytest.append(r2_score(ytest,ypred1))
                ypred2=rfc.predict(xtrain)
                accuracytrain.append(r2_score(ytrain,ypred2))
            return [accuracytest,accuracytrain]
            







        
        


    