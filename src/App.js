import { withRouter, Switch, Route } from 'react-router-dom'
import Assignment1 from './pages/Assignment1';
// import Assignment2 from './pages/Assignment2';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Assignment1}/>
      {/* <Route exact path="/" component={Assignment2}/> */}
    </Switch>
  );
}

export default withRouter(App);
