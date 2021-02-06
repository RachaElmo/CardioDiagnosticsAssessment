import React from 'react';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import Home from './components/Home/Home';
function App  ()  {
  
 
  return (
    
    <Router>
      <>
        <Switch>

        <Route exact path='/' render={props => (
            <Home />
          )} />

        </Switch>
      </>
    </Router>
  );
};

export default App;
