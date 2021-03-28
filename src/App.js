import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import ManageInventory from './components/ManageInventory/ManageInventory';
import Nomatch from './components/NoMatch/Nomatch';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
            <Route exact path="/">
                <Shop></Shop>
            </Route>
            <Route path="/shop">
                <Shop></Shop>
            </Route>
            <Route path="/review">
                <Review></Review>
            </Route>
            <PrivateRoute path="/shipment">
                <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/login">
                <Login></Login>
            </Route>
            <PrivateRoute path="/manage">
                <ManageInventory></ManageInventory>
            </PrivateRoute>
            <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
            </Route>
            <Route path="*">
                <Nomatch></Nomatch>
            </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
