import React, { Component } from "react";

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.list,
      selectedProject: this.props.selectedProject,
      newItem: ""
    };

    this.alertClass = "alert alert-warning alert-dismissible fade ";
  }

  changeSelectedProject = (e) => {
    let optionsNode = document.querySelector("#selector");
    let selectedProjectName =
      optionsNode.options[optionsNode.selectedIndex].innerHTML;
    this.props.selectedProjectHandler(selectedProjectName);
  };

  deleteClicked = async () => {
    await this.props.onDelete(this.state.selectedProject);
    await this.changeSelectedProject();
  };

  class = () => {
    if (this.state.projects.length > 1) {
      let k = this.alertClass;
      k = k + "d-none";
      return k;
    } else {
      let k = this.alertClass;
      k = k + "show";
      return k;
    }
  };

  inputField = (e) => {
    this.setState({
      newItem : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addProject(this.state.newItem)
  }

  render() {
    return (
      <div className="col-sm-6">
        <h2>Project's Selection</h2>
        <div class="input-group col-sm-8 px-0 mb-4">
          <select
            class="custom-select"
            id="selector"
            onChange={this.changeSelectedProject}
          >
            {Object.keys(this.state.projects).map((project) => (
              <option id={project} value={project}>
                {project}
              </option>
            ))}
          </select>
          <div class="input-group-append">
            <button
              onClick={this.deleteClicked}
              class="btn btn-outline-danger"
              type="button"
            >
              Delete Project
            </button>
          </div>
        </div>
        <div className={this.class()} id="warning" role="alert">
          <strong>Warning !</strong> There should be atleast one project in the
          list
          {/* <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> */}
        </div>
        <form onSubmit={this.handleSubmit} class="col-sm-12 p-0 mt-4" id="projectForm">
          <div class="form-group">
            <h3 for="project">Please enter a new Project here :</h3>
            <input
              type="text"
              name="project"
              id="projectName"
              class="form-control mb-4"
              placeholder="Project Name"
              onChange = {this.inputField}
              required
            />
            {/* <div
                class="alert alert-success alert-dismissible fade d-none"
                id="projectAddSuccess"
                role="alert"
                data-hide="alert"
              >
                <strong> Project Added </strong> to the options list. Please go
                and select your project from the list.
                <button type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> */}
            <div class="text-right">
              <input
                type="submit"
                value="Add Project"
                class="btn btn-outline-success btn-md"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Project;
