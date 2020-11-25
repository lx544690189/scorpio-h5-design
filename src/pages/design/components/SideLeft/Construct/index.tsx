import React from "react";

export default class Index extends React.Component {
  state = {
    timestemp: new Date().getTime()
  };

  componentDidMount(){
    //@ts-expect-error
    window.changeN = ()=>{
      this.setState({
        timestemp: new Date().getTime(),
      })
    }
  }

  render() {
    console.log('render,timestemp=',this.state.timestemp);
    return (
      <div className="App">
        <h1>n={this.state.timestemp}</h1>
      </div>
    );
  }
}
