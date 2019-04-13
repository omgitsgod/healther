import React, { Component } from "react";
import { getFile } from 'blockstack'

export default class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      page: "form",
      FullName: "",
      DOB: "",
      Phone: "",
      Email: "",
      Address: "",
      City: "",
      State: "",
      Zip: "",
      Type: "---"
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();
    this.setState({page: "results"})
    const options = { decrypt: false }
    getFile('results.json', options)
    .then((file) => {
      var results = JSON.parse(file || '[]')
      var tiny = results.filter(x => x.Patient === this.state.FullName)
      this.setState({results : tiny})
      console.log(tiny);

    })
  }
  render() {
    if(this.state.page === "form") {
    return (
      <form className="search-form" onSubmit={e => this.submitHandler(e)}>
        <label>Full Name</label>
        <input
          type="text"
          value={this.state.FullName}
          name="FullName"
          placeholder="Full Name"
          onChange={e => this.changeHandler(e)}
        />
        <label>Date Of Birth</label>

        <input
          type="text"
          value={this.state.DOB}
          name="DOB"
          placeholder="Date of Birth"
          onChange={e => this.changeHandler(e)}
        />
        <label>Phone</label>

        <input
          type="text"
          value={this.state.Phone}
          name="Phone"
          placeholder="Phone"
          onChange={e => this.changeHandler(e)}
        />

        <label>Email</label>
        <input
          type="text"
          value={this.state.Email}
          name="Email"
          placeholder="Email(optional)"
          onChange={e => this.changeHandler(e)}
        />

        <label>Address</label>
        <input
          type="text"
          value={this.state.Address}
          name="Address"
          placeholder="Address"
          onChange={e => this.changeHandler(e)}
        />

        <label>City</label>
        <input
          type="text"
          value={this.state.City}
          name="City"
          placeholder="City"
          onChange={e => this.changeHandler(e)}
        />

        <label>State</label>
        <input
          type="text"
          value={this.state.State}
          name="State"
          placeholder="State"
          onChange={e => this.changeHandler(e)}
        />

        <label>Zip</label>
        <input
          type="text"
          value={this.state.Zip}
          name="Zip"
          placeholder="Zip"
          onChange={e => this.changeHandler(e)}
        />

        <label>Type</label>
        <select
          className="select"
          name="Type"
          onChange={this.changeHandler}
          value={this.state.Type}
        >
          <option value="---">---</option>
          <option value="All">X-Ray</option>
          <option value="Discharge Summary">Discharge Summary</option>
          <option value="Emergency Room Records">Emergency Room Records</option>
          <option value="Operative/Procedure Reports">
            Operative/Procedure Reports
          </option>
          <option value="Billing Records">Billing Records</option>
          <option value="X-Ray">X-Ray</option>
        </select>
        <button className='submit btn-primary'>Submit</button>
      </form>
    );
  } else {
    return (
      <p>hi</p>
    )
  }
  }
}
