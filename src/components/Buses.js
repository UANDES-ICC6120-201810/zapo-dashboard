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
        children.push(<td>{this.props.tableData.patente[i]}</td>)
        children.push(<td>{this.props.tableData.detencion[i]}</td>)
        children.push(<td>{this.props.tableData.hora[i]}</td>)
        children.push(<td>{this.props.tableData.recorrido[i]}</td>)
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
            <th>Patente Detencion Hora Recorrido</th>
          </tr>
          </tr>
        </thead>
        <tbody style={{'height': '300px','overflow':'scroll', 'display': 'block'}}>
          {this.createTable()}
        </tbody>
      </table>
    );
  }
}

export default Buses
