import React, { Component } from "react";
import Project from "./project";

class App extends Component {
  state = {
    projects: ["Async/Await", "EasyBank", "Standup", "GoodMorning"],
  };

  handleDeleteProject = (project) => {
    let index = this.state.projects.indexOf(project);
    if (index > -1 && this.state.projects.length>1) {
      this.state.projects.splice(index, 1);
      this.setState(
        {
          projects: this.state.projects,
        },
        () => console.log(this.state.projects)
      );
      return true;
    }
    else{
      return false
    }
  };

  componentDidMount() {
    document.querySelectorAll(".close").forEach((button) => {
      button.addEventListener("click", () => {
        button.parentElement.classList.add("d-none");
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Project
            list={this.state.projects}
            onDelete={(projectToDelete) =>
              this.handleDeleteProject(projectToDelete)
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
