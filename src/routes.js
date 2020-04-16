import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Details from './pages/Details';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props=>
            isAuthenticated()
                ?   <Component {...props}/>
                :   <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }} />
        }
    />
)

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <PrivateRoute path="/details" component={Details} />
                <Route path='*'  component={() => <h1> Erro 404: Página não encontrada </h1>}/>
            </Switch>
        </BrowserRouter>
    );
}