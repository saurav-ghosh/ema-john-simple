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

function App() {
  return (
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
          <Route path="/manage">
              <ManageInventory></ManageInventory>
          </Route>
          <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
              <Nomatch></Nomatch>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
