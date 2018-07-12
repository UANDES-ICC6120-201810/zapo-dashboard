import React, { Component } from 'react';

class Buses extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableData:props.tableData
    }
  }

  createTable = () => {
    let table = []


    if (this.props.tableData != null){
      // Outer loop to create parent
      for (let i = 0; i < this.props.tableData.patente.length; i++) {
        let children = []
        //Inner loop to create children
        children.push(<td style={{'width':'400px'}}>{this.props.tableData.patente[i]}</td>)
        children.push(<td style={{'width':'400px'}}>{this.props.tableData.detencion[i]}</td>)
        children.push(<td style={{'width':'400px'}}>{this.props.tableData.hora[i]}</td>)
        children.push(<td style={{'width':'400px'}}>{this.props.tableData.recorrido[i]}</td>)
        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
      }
    }
    return table
  }

  render() {
    return (


      <table className="table">
        <thead className="thead-dark">
          <tr>
            <tr>
            <th></th>
          </tr>
          </tr>
        </thead>
        <tbody style={{'height': '300px','overflow':'scroll', 'display': 'block'}}>
          <tr>
            <td style={{'width':'400px', 'fontWeight': 'bold'}}>Patente</td>
            <td style={{'width':'400px', 'fontWeight': 'bold'}}>Detencion</td>
            <td style={{'width':'400px', 'fontWeight': 'bold'}}>Hora</td>
            <td style={{'width':'400px', 'fontWeight': 'bold'}}>Recorrido</td>
          </tr>
          {this.createTable()}
        </tbody>
      </table>
    );
  }
}

export default Buses
