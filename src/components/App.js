import React, { useState, useEffect } from 'react';
import '../css/App.css';
import ListAppointments from './ListAppointments';
import AddApointments from './AddApointments';
import SearchAppointments from './SearchAppointments';
import { without , findIndex} from "lodash"

function App() {
  let [myAppointments, setMyAppointments] = useState([])
  let [lastIndex, setLastIndex] = useState(0)

  const fetchData = () => {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = lastIndex
          setLastIndex(lastIndex = lastIndex + 1)
          return item
        })
        setMyAppointments(apts)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const deleteAppointment = (apt) => {
    let tempApts = myAppointments
    tempApts = without(tempApts, apt)
    setMyAppointments(tempApts)
  }
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddApointments />
              <SearchAppointments />
              <ListAppointments
                myAppointments={myAppointments}
                deleteAppointment={deleteAppointment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
