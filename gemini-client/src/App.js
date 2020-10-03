import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import FormPreview from './pages/FormPreview'
import EditForm from './pages/EditForm';
import FormSubmission from './pages/FormSubmission';
import Home from './pages/Home';


function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path="/forms-preview/:id">
          <FormPreview />
        </Route>
        <Route path="/edit-form/:id">
          <EditForm />
        </Route>
        <Route path="/submit-form/:id">
          <FormSubmission />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
