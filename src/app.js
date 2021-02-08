const scaleNames={
    c:'celsius',
    f:'farenheit'
}
function BoilingVerdict({celsius}){
    if(celsius >= 100){
        return <div className="alert alert-success">L'eau bout</div>
    }
    
        return <div className="alert alert-info">L'eau ne bout pas</div>
    
}
function tryConvert(temperature, convert){
    const value = parseFloat(temperature)
    if(Number.isNaN(value)){
        return '';
    }else{
       return (Math.round(convert(value)*100) /100).toString()
    }
}
function toCelsius(farenheit){
   return (farenheit -32) * 5/9
}
function toFarenheit(celcius){
    return (celcius*9/5) +32
}
class TemperatureInput extends React.Component{
    
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
  
        this.props.onTemperatureChange(e.target.value)
    }
    render(){
        const{temperature}=this.props
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div>
        <div className="form-group">
        <label htmlFor={name}>Saisissez la température en {scaleName} : </label>
        <input type="text" id={name} value={temperature} onChange={this.handleChange} className="form-control"></input>
        </div>
        </div>
    }
}
class Calculator extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            scale:'c',
            temperature : 20
        }
       this.handleCelciusChange=this.handleCelciusChange.bind(this)
       this.handleFarenheitChange= this.handleFarenheitChange.bind(this) 
    }
    handleCelciusChange(temperature){
        this.setState({scale : 'c',temperature})
    }
    handleFarenheitChange(temperature){
        this.setState({scale : 'f',temperature})
    }


    render(){
        const {temperature, scale}= this.state
        const celcius = scale==='c'? temperature : tryConvert(temperature,toCelsius)
        const farenheit = scale === 'f' ? temperature : tryConvert(temperature,toFarenheit)
        return <div>
        <TemperatureInput scale="c" temperature={celcius} onTemperatureChange={this.handleCelciusChange}/>
        <TemperatureInput scale="f" temperature={farenheit} onTemperatureChange={this.handleFarenheitChange}/>
        <BoilingVerdict celsius={celcius}></BoilingVerdict>
        </div>
    }
}
ReactDOM.render(<Calculator />, document.querySelector('#app'));