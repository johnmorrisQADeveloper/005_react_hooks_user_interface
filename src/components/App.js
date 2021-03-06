import '../css/App.css';
import ListAppointments from './ListAppointments';
import AddAppointments from './AddApointments';
import SearchAppointments from './SearchAppointments';
import React, { Component } from 'react'
import { without, findIndex } from "lodash"

export default class App extends Component {
  state = {
    myAppointments: [],
    formDisplay: false,
    orderBy: 'petName',
    orderDir: 'asc',
    queryText: '',
    lastIndex: 0
  }
  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex
          this.setState({ lastIndex: this.state.lastIndex + 1 })
          return item
        })
        this.setState({
          myAppointments: apts
        })
      })
  }

  updateInfo = (name, value, id) => {
    let tempApts = this.state.myAppointments
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    })
    tempApts[aptIndex][name] = value
    this.setState({
      myAppointments: tempApts
    })
  }

  searchApts = (query) => {
    this.setState({
      queryText: query
    })
  }

  changeOrder = (order, dir) => {
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }

  deleteAppointment = (apt) => {
    let tempApts = this.state.myAppointments
    tempApts = without(tempApts, apt)
    this.setState({
      myAppointments: tempApts
    })
  }

  toggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  AddAppointments = (apt) => {
    let tempApts = this.state.myAppointments
    apt.aptId = this.state.lastIndex

    this.setState({
      'lastIndex': this.state.lastIndex + 1
    })
    tempApts.unshift(apt)
    this.setState({
      myAppointments: tempApts
    })
  }

  render() {
    let order
    let filteredApts = this.state.myAppointments
    if (this.state.orderDir === 'asc') {
      order = 1
    } else {
      order = -1
    }
    filteredApts = filteredApts.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order
      } else {
        return 1 * order
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      )
    })
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  AddAppointments={this.AddAppointments}
                />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments
                  myAppointments={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}