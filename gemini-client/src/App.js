import React from 'react';
import InputForm from './components/InputForm'
import ListForms from './components/ListForms';

function App() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <InputForm />
      <ListForms />
    </div>
  );
}

export default App;
