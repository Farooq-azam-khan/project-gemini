import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import InputForm from './components/InputForm'
import ListForms from './components/ListForms'

import FormPreview from './pages/FormPreview'
import EditForm from './pages/EditForm';
import FormSubmission from './pages/FormSubmission';


function App() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <Switch>
        <Route exact path='/'><>
          <InputForm />
          <ListForms /></>
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
