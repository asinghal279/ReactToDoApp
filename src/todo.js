import React, { Component } from "react";

class todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: "",
      newTags: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let array = [this.state.newTitle, this.state.newTags];
    this.props.addTodo(array);
    this.setState({
      newTitle: "",
      newTags: "",
    });
  };

  render() {
    return (
      <div className="col-sm-7">
        <div className="col-sm-12 mb-5">
          <div className="my-4 p-3 form-box">
            <h4 className="text-center">Please Enter your List Items Below</h4>
            <form onSubmit={this.handleSubmit} id="item-input" className="">
              <div className="form-group">
                <input
                  type="text"
                  id="titleInput"
                  className="form-control mb-4"
                  placeholder="Title"
                  value={this.state.newTitle}
                  onChange={(e) => this.setState({ newTitle: e.target.value })}
                  required
                />
                <textarea
                  name="tags"
                  id="tagsInput"
                  value={this.state.newTags}
                  className="form-control"
                  placeholder="Enter Coma Separated Tags.."
                  onChange={(e) => this.setState({ newTags: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-group text-right">
                <input
                  type="reset"
                  className="btn btn-outline-danger btn-sm mx-2"
                />
                <input
                  type="submit"
                  value="Add"
                  className="btn btn-outline-success btn-sm float-right"
                />
              </div>
            </form>
          </div>
          <div className="col-sm-12 text-center">
            <h2>The To Do list will populate over hear..</h2>
            <div className="d-flex justify-content-center align-item-center">
              <h5>Show Completed Tasks</h5>
              <input
                className="check ml-2 show-completed"
                type="checkbox"
                name="checkbox"
                onChange={(e) => this.props.showCompletedTodo(e.target.checked)}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div id="toDoList" className="col-sm-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default todo;
