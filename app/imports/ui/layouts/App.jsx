import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Profiles from '../pages/Profiles';
import AddProject from '../pages/AddProject';
import Projects from '../pages/Projects';
import Filter from '../pages/Filter';
import Interests from '../pages/Interests';
import NotFound from '../pages/NotFound';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import LandingPage from '../pages/Landing-page';
import LogIn from '../pages/LogIn';
import DataPage from '../pages/DataPage';
import EditDataPage from '../pages/EditDataPage';
import CampusNavBar from '../components/CampusNavBar';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <CampusNavBar/>
          <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <ProtectedRoute path="/home" component={Home}/>
              <Route path="/profiles" component={Profiles}/>
              <Route path="/projects" component={Projects}/>
              <Route path="/interests" component={Interests}/>
              <Route path="/data" component={DataPage}/>
              <Route path="/edit" component={EditDataPage}/>
              <ProtectedRoute path="/addproject" component={AddProject}/>
              <ProtectedRoute path="/filter" component={Filter}/>
              <Route path="/signin" component={LogIn}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
