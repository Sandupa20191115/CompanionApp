import React,{Component} from "react";

export class DateTime extends Component{
    constructor() {
        super();
        this.state = {
            currentDateTime: new Date()
        }
    }

    componentDidMount() {
        setInterval(this.update, 1000)
    }

    update = () => {
        this.setState({
            currentDateTime: new Date()
        })
    };

    render(){

        let hours = this.state.currentDateTime.getHours();
        let amPm = "AM";
        if(hours>12){
            hours=hours-12
            amPm = "PM";
        }
        let minutes = this.state.currentDateTime.getMinutes();
        if(minutes.toString().length === 1)
            minutes = "" + 0 + minutes
        const seconds = this.state.currentDateTime.getSeconds();

        const month =  this.state.currentDateTime.getMonth()+1;
        const date =  this.state.currentDateTime.getDate();

        return (
            <div className={"dateTime"}>
                <div className={"time"}>
                    { hours } : {minutes} {amPm}
                </div>
                <div className={"date"}>
                    {date}/{month}
                </div>
            </div>
        );
    }
}