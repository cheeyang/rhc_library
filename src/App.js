import React, { Component } from "react";
import Register from "./containers/Register";
import Navbar from "containers/Navbar";
import Browse from "./containers/Browse/";
import Login from "./containers/Login/";
import UsersPage from "./containers/UsersPage";
import AddBook from "containers/AddBook";
import Confirmation from "containers/Confirmation";
import ThankYouPage from "containers/ThankYouPage";
import PreLoginHeader from "./components/PreLoginHeader";
import PageNotFound from "containers/PageNotFound";
import AppFooter from "containers/AppFooter";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase";
import { updateUser } from "containers/Login/actions";
import { bindActionCreators } from "redux";
import Fade from "components/Fade";
import ProceedButton from "components/ProceedButton";
import Filter from "components/Filter";

class App extends Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      console.log("auth state changed", user);
      this.props.updateUser(user);
    });
    firebase.auth().setPersistence("session");
  }
  render() {
    const { user } = this.props.session;
    return (
      <Router>
        <div className="AppWrapper">
          {!!user ? <Navbar /> : <PreLoginHeader />}
          <Filter />
          <div className="AppBody">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/browse" component={Browse} />
              <Route exact path="/users" component={UsersPage} />
              <Route exact path="/add" component={AddBook} />
              <Route exact path="/confirmation" component={Confirmation} />
              <Route exact path="/thankyou" component={ThankYouPage} />
              <Route exact path="/page-not-found" component={PageNotFound} />
            </Switch>
          </div>
          <Fade />
          <ProceedButton />
          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default connect(
  ({ session }) => ({ session }),
  dispatch => bindActionCreators({ updateUser }, dispatch)
)(App);
