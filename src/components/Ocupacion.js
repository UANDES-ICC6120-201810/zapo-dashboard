import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

import './Ocupacion.css';

class Ocupacion extends Component {

  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: false
  }


  render() {
    return (
      <div className="Ocupacion-contenido" align="center">
        <Line
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Ocupacion del paradero',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default Ocupacion
