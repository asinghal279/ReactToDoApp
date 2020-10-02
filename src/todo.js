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
        <div class="col-sm-12 mb-5">
          <div class="my-4 p-3 form-box">
            <h4 class="text-center">Please Enter your List Items Below</h4>
            <form onSubmit={this.handleSubmit} id="item-input" class="">
              <div class="form-group">
                <input
                  type="text"
                  id="titleInput"
                  class="form-control mb-4"
                  placeholder="Title"
                  value={this.state.newTitle}
                  onChange={(e) => this.setState({ newTitle: e.target.value })}
                  required
                />
                <textarea
                  name="tags"
                  id="tagsInput"
                  value={this.state.newTags}
                  class="form-control"
                  placeholder="Enter Coma Separated Tags.."
                  onChange={(e) =>
                    this.setState({ newTags: e.target.value.split(",") })
                  }
                  required
                ></textarea>
              </div>
              <div class="form-group text-right">
                <input
                  type="reset"
                  class="btn btn-outline-danger btn-sm mx-2"
                />
                <input
                  type="submit"
                  value="Add"
                  class="btn btn-outline-success btn-sm float-right"
                />
              </div>
            </form>
          </div>
          <div class="col-sm-12 text-center">
            <h2>The To Do list will populate over hear..</h2>
            <div class="d-flex justify-content-center">
              <p>Show Completed Tasks</p>
              <input
                class="check ml-2 show-completed"
                type="checkbox"
                name="checkbox"
                onChange={(e) => this.props.showCompletedTodo(e.target.checked)}
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div id="toDoList" class="col-sm-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default todo;
