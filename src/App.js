import React, { Component } from "react";
import Project from './project';

class App extends Component {
  state = {
    projects: ["Async/Await", "EasyBank"]
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Project list={this.state.projects}/>
        </div>
      </div>
    );
  }
}

export default App;
