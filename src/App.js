import React, { Component } from "react";
import Project from "./project";
import Todo from "./todo";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {
        "Async/Await": [
          {
            id: 2343,
            title: "morning",
            tags: "promises, callbacks",
            completed: false,
          },
        ],
      },
      selectedProject: "Async/Await",
      alertClass: "alert alert-warning alert-dismissible fade d-none",
      showCompletedProjects: false,
      idTobeUpdated: "",
      titleToUpdate: "",
      tagsToUpdate: "",
    };
  }

  handleDeleteProject = () => {
    if (Object.keys(this.state.projects).length > 1) {
      delete this.state.projects[this.state.selectedProject];
      this.setState(
        {
          projects: this.state.projects,
        },
        () => console.log(this.state.projects)
      );
    } else {
      this.setState({
        alertClass: "alert alert-warning alert-dismissible fade show",
      });
    }
  };

  handleProjectInput = (value) => {
    let obj = { ...this.state.projects };
    obj[value] = [];
    this.state.projects[value] = [];
    // console.log(obj, this.state.projects);
    this.setState(
      {
        projects: this.state.projects,
        alertClass: "alert alert-warning alert-dismissible fade d-none",
      },
      () => console.log(this.state.projects)
    );
  };

  handleTodoInput = (values) => {
    let obj = {
      id: Date.now(),
      title: values[0],
      tags: values[1],
      completed: false,
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
      if (todo.id === +idTobeDeleted) {
        spliceIndex = index;
        return true;
      }
      return false;
    });
    toDoList.splice(spliceIndex, 1);
    // let newProjectsObj = { ...this.state.projects };
    // newProjectsObj[this.state.selectedProject] = toDoList;
    this.state.projects[this.state.selectedProject] = toDoList;
    this.setState({
      projects: this.state.projects,
    });
  };

  handleTodoCompletedChange = (e) => {
    let toDoList = [...this.state.projects[this.state.selectedProject]];
    toDoList.some((todo, index) => {
      if (todo.id === +e.target.parentElement.getAttribute("id")) {
        console.log(e.target.checked);
        if (e.target.checked) {
          todo.completed = true;
          e.target.checked = true;
        } else {
          e.target.checked = false;
          todo.completed = false;
        }
      }
    });
    this.state.projects[this.state.selectedProject] = toDoList;
    this.setState({
      projects: this.state.projects,
    });
  };

  checkedOrNot = (val) => {
    if (val) {
      return (
        <input
          className="check ml-2 card-check"
          type="checkbox"
          name="checkbox"
          onChange={this.handleTodoCompletedChange}
          checked="checked"
        />
      );
    } else {
      return (
        <input
          className="check ml-2 card-check"
          type="checkbox"
          name="checkbox"
          onChange={this.handleTodoCompletedChange}
        />
      );
    }
  };

  handleShowCompleted = (val) => {
    let bool;
    if (val) {
      bool = true;
    } else {
      bool = false;
    }
    this.setState({
      showCompletedProjects: bool,
    });
  };

  projectsToBeShown = () => {
    let result;
    if (this.state.showCompletedProjects)
      result = this.state.projects[this.state.selectedProject].filter(
        (todo) => todo.completed
      );
    else result = this.state.projects[this.state.selectedProject];
    return result;
  };

  openUpdateForm = (e) => {
    let toDoList = [...this.state.projects[this.state.selectedProject]];
    toDoList.some((todo, index) => {
      if (todo.id === +e.target.parentNode.getAttribute("id")) {
        this.setState({
          idTobeUpdated: e.target.parentNode.getAttribute("id"),
          titleToUpdate: todo.title,
          tagsToUpdate: todo.tags,
        });
        return true;
      }
    });
  };

  handleUpdateInput = (e) => {
    console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleUpdateSubmit = () => {
    let toDoList = [...this.state.projects[this.state.selectedProject]];
    toDoList.some((todo, index) => {
      if (todo.id === +this.state.idTobeUpdated) {
        todo.title = this.state.titleToUpdate;
        todo.tags = this.state.tagsToUpdate;
        return true;
      }
    });
    // let newProjectsObj = { ...this.state.projects };
    // newProjectsObj[this.state.selectedProject] = toDoList;
    this.state.projects[this.state.selectedProject] = toDoList;
    this.setState({
      projects: this.state.projects,
    });
  };
  render() {
    let d = new Date();
    let currentDate =
      "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    return (
      <div className="container">
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New message
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="titleToUpdate"
                      value={this.state.titleToUpdate}
                      onChange={this.handleUpdateInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">
                      Tags:
                    </label>
                    <textarea
                      id="tagsToUpdate"
                      value={this.state.tagsToUpdate}
                      onChange={this.handleUpdateInput}
                      className="form-control"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="update-button"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={this.handleUpdateSubmit}
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Project
            list={this.state.projects}
            selectedProject={this.state.selectedProject}
            onDelete={this.handleDeleteProject}
            addProject={(value) => this.handleProjectInput(value)}
            selectedProjectHandler={(value) =>
              this.setState({ selectedProject: value })
            }
            warningAlertClass={this.state.alertClass}
            handleAlertClose={() =>
              this.setState({
                alertClass: "alert alert-warning alert-dismissible fade d-none",
              })
            }
          />
          <Todo
            addTodo={(arr) => this.handleTodoInput(arr)}
            showCompletedTodo={this.handleShowCompleted}
          >
            {this.projectsToBeShown().map((todo) => {
              return (
                <div key={todo.id} className="col-sm-12 mb-3 p-2 to-do-item">
                  <div className="d-flex justify-content-between">
                    <span>{todo.title}</span>
                    <div id={todo.id} className="input-group-text">
                      <button
                        className="btn btn-outline-info btn-sm edit-button mx-1"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={this.openUpdateForm}
                      >
                        &#9998;
                      </button>
                      <button
                        onClick={this.handleDeleteTodo}
                        className="btn btn-outline-danger btn-sm delete-button"
                      >
                        X
                      </button>
                      {this.checkedOrNot(todo.completed)}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <div className="">
                      {todo.tags.split(",").map((tag) => (
                        <span key={tag} className="badge badge-info mr-2 p-2">{tag}</span>
                      ))}
                    </div>
                    <div className="">{currentDate}</div>
                  </div>
                </div>
              );
            })}
          </Todo>
        </div>
      </div>
    );
  }
}

export default App;
