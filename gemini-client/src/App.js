import React from 'react';
import InputForm from './components/InputForm'
import ListForms from './components/ListForms'
import FormPreview from './components/FormPreview'

import {
  Switch,
  Route
} from "react-router-dom";

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
      </Switch>
    </div>
  );
}

export default App;
