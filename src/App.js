import React, { Component } from "react";
import Project from "./project";
import Todo from "./todo";
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {
        "Async/Await": [{ id: 2343, title: "morning", tags: ["promises", "callbacks"] }],
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

  handleDeleteTodo = (e) => {
    let idTobeDeleted = e.target.parentNode.getAttribute("id");
    let toDoList = [...this.state.projects[this.state.selectedProject]];
    let spliceIndex;
    toDoList.some((todo, index) => {
      if(todo.id === idTobeDeleted){
        spliceIndex = index;
        return true;
      }
    })
    toDoList.splice(spliceIndex,1);
    console.log(toDoList);
    let newProjectsObj = {...this.state.projects};
    newProjectsObj[this.state.selectedProject] = toDoList;
    // this.state.projects[this.state.selectedProject] = toDoList
    this.setState({
      projects: newProjectsObj,
    })
  }

  render() {
    let d = new Date();
    let currentDate =
      "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
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
              <div class="col-sm-12 mb-3 p-2 to-do-item">
                <div class="d-flex justify-content-between">
                  <span>{todo.title}</span>
                  <div id={todo.id} class="input-group-text">
                    <button
                      class="btn btn-outline-info btn-sm edit-button mx-1"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      &#9998;
                    </button>
                    <button onClick={this.handleDeleteTodo} class="btn btn-outline-danger btn-sm delete-button">
                      X
                    </button>
                    <input
                      class="check ml-2 card-check"
                      type="checkbox"
                      name="checkbox"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-4">
                  <div class="">{todo.tags.map((tag) => <span class="badge badge-info mr-2 p-2">{tag}</span>)}</div>
                  <div class="">{currentDate}</div>
                </div>
              </div>
            ))}
          </Todo>
        </div>
      </div>
    );
  }
}

export default App;
