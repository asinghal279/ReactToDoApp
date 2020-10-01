import React, { Component } from "react";
import Project from "./project";
import Todo from "./todo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {
        "Async/Await": [{ id: 2343, title: "morning", tags: "yo, po" }],
      },
      selectedProject: "Async/Await",
    };
  }

  handleDeleteProject = (project) => {
    delete this.state.projects[project];
    this.setState(
      {
        projects: this.state.projects,
      },
      () => console.log(this.state.projects)
    );
  };

  handleInput = (value) => {
    let obj = { ...this.state.projects };
    obj[value] = [];
    this.state.projects[value] = [];
    this.setState(
      {
        projects: this.state.projects,
      },
      () => console.log(this.state.projects)
    );
  };

  handleTodoInput = (values) => {
    let obj = {
      id: Date.now(),
      title: values[0],
      tags: values[1],
    };
    this.state.projects[this.state.selectedProject].push(obj);
    this.setState(
      {
        projects: this.state.projects,
      },
      () => console.log(this.state.projects)
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Project
            list={this.state.projects}
            selectedProject={this.state.selectedProject}
            onDelete={(projectToDelete) =>
              this.handleDeleteProject(projectToDelete)
            }
            addProject={(value) => this.handleInput(value)}
            selectedProjectHandler={(value) =>
              this.setState({ selectedProject: value })
            }
          />
          <Todo addTodo={(arr) => this.handleTodoInput(arr)}>
            {this.state.projects[this.state.selectedProject].map((todo) => (
              <div>{todo.title}</div>
            ))}
          </Todo>
        </div>
      </div>
    );
  }
}

export default App;
