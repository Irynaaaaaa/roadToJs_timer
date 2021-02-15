import './App.css';
import ReactDOM from 'react-dom';
import React, {Component,useState} from 'react';


class Timer extends Component {
  
    state = {
        isActive : false,
        timeLeft : this.props.timeLeft,
        interval : this.props.interval,
        line : 100 ,
        amountOfSeconds : this.props.amountOfSeconds
    };
  

 componentDidMount(){

    this.timerID = setInterval(
        () => this.tick(),
        1000
      );         
 }

 componentWillUnmount(){
    clearInterval(this.timerID)
 }

 tick() {
    if(this.state.isActive ) {
        if((this.state.timeLeft===0) || (this.state.timeLeft===2)  ){
            this.pause();
            this.componentWillUnmount();
        }
        this.setState((state) => {
            const timer = state.timeLeft - state.interval;
            const liner = state.line  - state.amountOfSeconds;
            return {
                timeLeft: timer,
                line : liner
            }
        })
    }
}
  
 pause = () => {
    this.setState({isActive: false});
}
startTimer = () => {
    this.setState({isActive: true});
};


render(){

    const width = {
      width :`${this.state.line}%`
    };

    return(
    <div className = 'timer'>
        <h1>{this.state.timeLeft}</h1>
            <button type="button" onClick={this.startTimer}>Start</button>
            <button type="button" onClick={this.pause}>Stop</button>
            <div className="timer-line" style={width  }>.</div>
    </div>
    )
  
  }

}



const firstTimer = {
  timeLeft : 60,
  interval : 1,
  amountOfSeconds : 1.7

}
const secondTimer = {
  timeLeft : 90,
  interval : 2,
  amountOfSeconds : 2.2
}
ReactDOM.render(
  <div>
     <Timer {...firstTimer} />,
     <Timer interval= {secondTimer.interval} timeLeft = {secondTimer.timeLeft} amountOfSeconds = {secondTimer.amountOfSeconds}/>,
  </div>, 
  document.getElementById('root')
);

export default Timer;
