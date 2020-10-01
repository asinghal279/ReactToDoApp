import React, { Component } from "react";
import Project from './project';

class App extends Component {
  state = {
    projects: ["Async/Await", "EasyBank"]
  };

  handleDeleteProject = (project) => {
    let index = this.state.projects.indexOf(project) 
    if(index>-1)
    this.setState({
      projects: this.state.projects.splice(index,1)
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Project list={this.state.projects} onDelete={(projectToDelete) => this.handleDeleteProject(projectToDelete)}/>
        </div>
      </div>
    );
  }
}

export default App;
