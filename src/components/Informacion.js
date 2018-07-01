import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

import './Informacion.css';

class Informacion extends Component {

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
      <Bar
        data={this.props.chartData}
        options={{
          title:{
            display:this.props.displayTitle,
            text:'Cantidad de solicitud de informacion',
            fontSize:25
          },
          legend:{
            display:this.props.displayLegend,
            position:this.props.legendPosition
          }
        }}
      />
    );
  }
}

export default Informacion
