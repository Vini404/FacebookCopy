import React from "react"
import{BrowserRouter,Route,Switch} from "react-router-dom"
import register from "./pages/register/index"
import login from "./pages/login/index"
import dashboard from "./pages/dashboard/index.js"

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            
       <Route path="/" exact component={register}/>
       <Route path="/login" component={login}/>
       <Route path="/dashboard" component={dashboard}/>
       
     
        </Switch>
        </BrowserRouter>
    )
}

