import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa"

const AddApointments = ({ formDisplay, toggleForm, AddAppointments }) => {
  // Example: useState with an object (multiple values, sorta)
  // https://daveceddia.com/usestate-hook-examples/
  const [form, setState] = useState({
    petName: '',
    ownerName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    let tempApt = {
      petName: form.petName,
      ownerName: form.ownerName,
      aptDate: form.aptDate + ' ' + form.aptTime,
      aptNotes: form.aptNotes
    }
    AddAppointments(tempApt)
    setState({
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: '',
    })
    toggleForm()
  }
  const handleChange = (e) => {
    const target = e.target
    const value = target.value

    const name = target.name
    setState({
      ...form,
      [name]: value
    })
  }

  return (
    <div className={
      'card textcenter mt-3 ' +
      (formDisplay ? '' : 'add-appointment')
    }
    >
      <div className="apt-addheading card-header bg-primary text-white"
        onClick={toggleForm}
      >
        <FaPlus />  Add Appointment
    </div>

      <div className="card-body">
        <form id="aptForm" noValidate onSubmit={handleSubmit}>
          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="petName"
              readOnly
            >
              Pet Name
          </label>
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                name="petName"
                placeholder="Pet's Name"
                value={form.petName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="ownerName"
            >
              Pet Owner
          </label>
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                name="ownerName"
                placeholder="Owner's Name"
                value={form.ownerName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="aptDate"
            >
              Date
          </label>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                name="aptDate"
                id="aptDate"
                value={form.aptDate}
                onChange={handleChange}
              />
            </div>
            <label
              className="col-md-2 col-form-label text-md-right"
              htmlFor="aptTime"
            >
              Time
          </label>
            <div className="col-md-4">
              <input
                type="time"
                className="form-control"
                name="aptTime"
                id="aptTime"
                value={form.aptTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-md-2 text-md-right" htmlFor="aptNotes">
              Apt. Notes
          </label>
            <div className="col-md-10">
              <textarea
                className="form-control"
                rows="4"
                cols="50"
                name="aptNotes"
                id="aptNotes"
                placeholder="Appointment Notes"
                value={form.aptNotes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group form-row mb-0">
            <div className="offset-md-2 col-md-10">
              <button
                type="submit"
                className="btn btn-primary d-block ml-auto"
              >
                Add Appointment
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddApointments
