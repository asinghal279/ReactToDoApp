import React, { Component } from "react";

class Project extends Component {
  state = {};
  render() {
    return (
      <div className="col-sm-6">
        <h2>Project's Selection</h2>
        <div class="input-group col-sm-8 px-0">
          <select class="custom-select" id="inputGroupSelect04">
              {this.props.list.map(project => <option>{project}</option>)}
          </select>
          <div class="input-group-append">
            <button class="btn btn-outline-danger" type="button">
              Delete Project 
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
