import React, { Component } from "react";

class Project extends Component {
  state = {
    projects: this.props.list,
    selectedProject: "",
  };

  changeSelectedProject = (e) => {
    let selectedProjectName =
      e.target.options[e.target.selectedIndex].innerHTML;
    this.setState({ selectedProject: selectedProjectName }, () =>
      console.log(this.state.selectedProject)
    );
  };

  render() {
    return (
      <div className="col-sm-6">
        <h2>Project's Selection</h2>
        <div class="input-group col-sm-8 px-0">
          <select
            class="custom-select"
            id="inputGroupSelect04"
            onChange={this.changeSelectedProject}
          >
            {this.state.projects.map((project) => (
              <option>{project}</option>
            ))}
          </select>
          <div class="input-group-append">
            <button onClick={() => this.props.onDelete(this.state.selectedProject)} class="btn btn-outline-danger" type="button">
              Delete Project
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
