import React, { Component } from "react";

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.list,
      selectedProject: this.props.selectedProject,
      projectName: "",
    };
  }

  changeSelectedProject = (e) => {
    this.props.selectedProjectHandler(e.target.value);
  };

  deleteClicked = async () => {
    this.props.onDelete();
    this.props.selectedProjectHandler(Object.keys(this.state.projects)[0]);
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
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.addProject(this.state.projectName);
    this.setState({
      projectName: "",
    });
  };

  render() {
    return (
      <div className="col-sm-5 border-right">
        <h2>Project's Selection</h2>
        <div className="input-group col-sm-8 px-0 mb-4">
          <select
            className="custom-select"
            id="selector"
            onChange={this.changeSelectedProject}
          >
            {Object.keys(this.state.projects).map((project) => (
              <option key={project} id={project} value={project}>
                {project}
              </option>
            ))}
          </select>
          <div className="input-group-append">
            <button
              onClick={this.deleteClicked}
              className="btn btn-outline-danger"
              type="button"
            >
              Delete Project
            </button>
          </div>
        </div>
        <div className={this.props.warningAlertClass} id="warning" role="alert">
          <strong>Warning !</strong> There should be atleast one project in the
          list
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.props.handleAlertClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="col-sm-12 p-0 mt-4"
          id="projectForm"
        >
          <div className="form-group">
            <h3 htmlFor="project">Please enter a new Project here :</h3>
            <input
              type="text"
              name="project"
              id="projectName"
              value={this.state.projectName}
              className="form-control mb-4"
              placeholder="Project Name"
              onChange={this.inputField}
              required
            />
            <div className="text-right">
              <input
                type="submit"
                value="Add Project"
                className="btn btn-outline-success btn-md"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Project;
