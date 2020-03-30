import React, { useState, useEffect } from 'react';
import '../css/App.css';
import ListAppointments from './ListAppointments';
import AddApointments from './AddApointments';
import SearchAppointments from './SearchAppointments';
import { without } from "lodash"

function App() {
  const [app, setApp] = useState({
    myAppointments: [],
    lastIndex: 0,
    formDisplay: false,
    queryText: '',
    orderBy: 'ownerName',
    orderDir: 'asc'
  })

  // let [myAppointments, setMyAppointments] = useState([])
  // let [lastIndex, setLastIndex] = useState(0)
  // let [formDisplay, setFormDisplay] = useState(true)

  const fetchData = () => {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = app.lastIndex
          setApp({
            ...app,
            'lastIndex': app.lastIndex = app.lastIndex + 1
          })
          return item
        })
        setApp({
          ...app,
          'myAppointments': apts
        })
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let order
    let fiteredApts = app.myAppointments
    if (app.orderDir === 'asc') {
      order = 1
    } else {
      order = -1
    }
    fiteredApts = fiteredApts.sort((a, b) => {
      if (a[app.orderBy].toLowerCase() < b[app.orderBy].toLowerCase()) {
        return -1 * order
      } else {
        return 1 * order
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(app.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(app.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(app.queryText.toLowerCase())
      )
    })
    setApp({
      ...app,
      'myAppointments': fiteredApts
    })
  }, [app.orderBy, app.orderDir, app.queryText])


  const searchApts = (search) => {
    setApp({
      ...app,
      'queryText': search
    })
  }
  const changeOrder = (orderBy, orderDir) => {
    console.log(orderBy, orderDir)
    setApp({
      ...app,
      'orderBy': orderBy,
      'orderDir': orderDir
    })
  }
  const deleteAppointment = (apt) => {
    let tempApts = app.myAppointments
    tempApts = without(tempApts, apt)
    setApp({
      ...app,
      'myAppointments': tempApts
    })
    // setMyAppointments(tempApts)
  }
  const toggleForm = () => {
    setApp({
      ...app,
      'formDisplay': !app.formDisplay
    })
    // setFormDisplay(!formDisplay)
  }
  const AddApointment = (apt) => {
    console.log(apt)
    let tempApts = app.myAppointments
    apt.aptId = app.lastIndex
    // Updating state based on previous state (useState with a number)
    // https://daveceddia.com/usestate-hook-examples/
    // setLastIndex(prevState => prevState + 1) // increment 
    setApp({
      ...app,
      'lastIndex': prevState => prevState + 1
    })
    tempApts.unshift(apt)
    setApp({
      ...app,
      'myAppointments': tempApts
    })
    // setMyAppointments(tempApts)
  }
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddApointments
                formDisplay={app.formDisplay}
                toggleForm={toggleForm}
                AddApointment={AddApointment}
              />
              <SearchAppointments
                orderBy={app.orderBy}
                orderDir={app.orderDir}
                changeOrder={changeOrder}
                searchApts={searchApts}
              />
              <ListAppointments
                myAppointments={app.myAppointments}
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
