import React from 'react';
import '../css/App.css';
import ListAppointments from './ListAppointments';
import AddApointments from './AddApointments';
import SearchAppointments from './SearchAppointments';

function App() {
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddApointments />
              <SearchAppointments />
              <ListAppointments />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
