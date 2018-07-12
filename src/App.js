import React, { Component } from 'react';
import './App.css';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Ocupacion from './components/Ocupacion';
import Buses from './components/Buses';
import Informacion from './components/Informacion';

class App extends Component {


  constructor(){
      super();

      this.state = {
        MostrarElementos:true
      }

      this.state = {
        startDate: moment()
      };
      this.state = {
        endDate: moment()
      };
      this.state = {
        OcupacionchartData_1: {}
      }

      this.state = {
        BusesData_1: {}
      }
      this.state = {
        InformacionchartData_1: {}
      }

      this.state = {
        Paraderos: ['PC1049']
      }


      this.fechaInicioHandle = this.fechaInicioHandle.bind(this);
      this.fechaTerminoHandle = this.fechaTerminoHandle.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
      this.getChartData();
    }

    fechaInicioHandle(date) {
      this.setState({
        startDate: date
      });
    }
    fechaTerminoHandle(date) {
      this.setState({
        endDate: date
      });
    }


    // Se obtiene la informacion de los graficos
    getChartData(){

      // grafico ocupacion por defecto
      const graficos_ocupacion_1 = {
          labels: [],
          datasets:[
            {
              label:'Personas',
              data:[],
              backgroundColor:[]
            }
          ]
        }

        this.setState({
          OcupacionchartData_1: graficos_ocupacion_1
        });

        // tabla buses por defecto
        const tabla_buses_1 = {
          patente: [],
          detencion: [],
          hora: [],
          recorrido: []
        }
        this.setState({
          BusesData_1: tabla_buses_1
        });


      // grafico informacion por defecto
      const graficos_informacion_1 = {
            labels: [],
            datasets:[
              {
                label:'Oprimidas',
                data:[
                ],
                backgroundColor:[]
              }
            ]
          }

          this.setState({
            InformacionchartData_1: graficos_informacion_1
          });
    }


    handleClick = () => {
      const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2NsaWVudF9pZCI6Mn0.relaBLHrVieE8ecpdwL47t9VkcnHCiztjp47xA3dVE8"


      if (this.state.startDate != null && this.state.endDate != null) {
        this.state.MostrarElementos = true;
        var start = this.state.startDate.format("YYYY-MM-DD") + " 00:00"
        var end = this.state.endDate.format("YYYY-MM-DD") + " 23:59"

        // informacion ocupacion
        //paradero 1
        const url_ocupacion_1 = "https://proyectozapo.herokuapp.com/api/v1/amount_of_passengers?bus_stop="+this.state.Paraderos[0]+"&start="+start+"&end="+end;

        fetch(url_ocupacion_1, {
            method: 'GET',
            headers: {
              "Authorization": token
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Informacion ocupacion paradero 1")
          console.log(responseData)
          console.log("Informacion ocupacion paradero 1")
          if (responseData.error != ""){

            var dates = []
            var amounts = []

            var current_time = this.state.startDate
            var current_time_string = start
            var h = 0

            while (current_time.format("YYYY-MM-DD HH:mm") != end){
              console.log("actuales")

              console.log(current_time.format("YYYY-MM-DD HH:mm"))
              console.log(end)
              console.log("actuales")

              if (h < responseData.length) {
                if (responseData[h].date == (current_time.format("YYYY-MM-DD HH:mm")+":00")){
                  dates.push(responseData[h].date)
                  amounts.push(responseData[h].amount)
                  h+=1
                } else {
                  dates.push(current_time_string)
                  amounts.push(responseData[h].amount)
                }
                current_time = this.state.startDate.add(1, 'minutes')
                current_time_string = current_time.format("YYYY-MM-DD HH:mm")
              }
              else {
                h+=1
              }
            }
            var colores = []
            for (var i = 0; i < dates.length; i++){
              colores.push('rgba('+ Math.floor((Math.random() * 255) + 1)+ ','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+', 0.6)')
            }
            var elemento_1 = {
                  labels: dates,
                  datasets:[
                    {
                      label:'Personas',
                      data:amounts,
                      backgroundColor:colores
                    }
                  ]
            }

            this.setState((prevState, props) => ({
                OcupacionchartData_1: elemento_1
            }));
          } else {
            var elemento_1 = {
                  labels: [],
                  datasets:[
                    {
                      label:'Personas',
                      data:[],
                      backgroundColor:[]
                    }
                  ]
            }
            this.setState((prevState, props) => ({
                OcupacionchartData_1: elemento_1
            }));
          }
          })

          // informacion de los Buses
          //paradero 1
          const url_buses_1 = 'https://proyectozapo.herokuapp.com/api/v1/bus_events?bus_stops={"data":['+ '"'+this.state.Paraderos[0] + '"'+']}&start='+start+'&end='+end+'&order_by=asc';

          fetch(url_buses_1, {
              method: 'GET',
              headers: {
                "Authorization": token
              }
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("Informacion Buses paradero 1")
            console.log(responseData);
            console.log("Informacion Buses paradero 1")
            if (responseData.error != ""){
              // se deveria cambiar la data mas abajo
              var patentes = []
              var detenciones = []
              var horas = []
              var recorridos = []

              for (var i = 0; i < responseData.length; i++){
                patentes.push(responseData[i].plate_number)
                if (responseData[i].bus_speed == "0.0"){
                  detenciones.push("Se detuvo")
                } else {
                  detenciones.push("No se detuvo")
                }
                horas.push(responseData[i].event_time)
                recorridos.push(responseData[i].route_code)
              }

              var elemento_1 = {
                patente: patentes,
                detencion: detenciones,
                hora: horas,
                recorrido: recorridos
              }

              this.setState((prevState, props) => ({
                  BusesData_1: elemento_1
              }));
            } else {
              var elemento_1 = {
                patente: [],
                detencion: [],
                hora: [],
                recorrido: []
              }

              this.setState((prevState, props) => ({
                  BusesData_1: elemento_1
              }));
            }
          })

        // informacion de precionar el boton
        // Paradero 1
        const url_precionar = 'https://proyectozapo.herokuapp.com/api/v1/amount_of_waiting_time_queries?bus_stops={"data":['+ '"'+this.state.Paraderos[0] + '"'+']}&start='+start+'&end='+end+'&order_by=asc';

        fetch(url_precionar, {
            method: 'GET',
            headers: {
              "Authorization": token
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Informacion botones paradero 1")
          console.log(responseData)
          console.log("Informacion botones paradero 1")
          if (responseData.length > 0 ){
            var labels = []
            var data = []
            var consulta_mal = 0
            var no_autorizado = 0

            for (var i = 0; i < responseData.length; i++){
              if (responseData[i].type  == "waiting time query") {
                if (labels.includes(responseData[i].route_code)){
                  for(var j = 0; j < labels.length; j++){
                    if (responseData[i].route_code == labels[j]){
                      data[j] += 1;
                    }
                  }
                } else{
                  labels.push(responseData[i].route_code)
                  data.push(1)
                }
              } else if (responseData[i].type  == "failed waiting time query"){
                consulta_mal+=1
              } else if (responseData[i].type  == "not authorized waiting time query"){
                no_autorizado+=1
              }
            }
            labels.push("Erronea")
            data.push(consulta_mal)
            labels.push("No autorizada")
            data.push(no_autorizado)

            var colores = []
            for (var i = 0; i < labels.length; i++){
              colores.push('rgba('+ Math.floor((Math.random() * 255) + 1)+ ','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+', 0.6)')
            }

            var elemento = {
                  labels: labels,
                  datasets:[
                    {
                      label:'Oprimidas',
                      data: data,
                      backgroundColor: colores
                    }
                  ]
            }

            this.setState((prevState, props) => ({
                InformacionchartData_1: elemento
            }));

          } else {
            var elemento = {
                  labels: [],
                  datasets:[
                    {
                      label:'Oprimidas',
                      data: [],
                      backgroundColor: []
                    }
                  ]
            }

            this.setState((prevState, props) => ({
                InformacionchartData_1: elemento
            }));
          }
          })
      } else{
        console.log("La fecha no permite la consulta")
      }
    }

  render() {
      return(
        <div className="App-pagina">
          <div className="App-cabecera">
            <header className="App-header" align="left">
              <img src={require('./logo.jpg')} />
            </header>
          </div>
          <div className="App-contenido">
          </div>

          <div className="App-graficos" align="center">
            <p> Fecha inicial </p>
            <DatePicker selected={this.state.startDate} onChange={this.fechaInicioHandle} />
            <p> Fecha Final </p>
            <DatePicker selected={this.state.endDate} onChange={this.fechaTerminoHandle} />

            <button align="center" onClick={this.handleClick}>
                Mostrar Graficos
            </button>

            { this.state.MostrarElementos ?
              <div>
                <h1 className="Paradero" align="center">Paradero {this.state.Paraderos[0]}</h1>
                <Ocupacion chartData={this.state.OcupacionchartData_1} legendPosition="bottom" redraw/>
                <div className="row">
                  <div className="column">
                    <Informacion chartData={this.state.InformacionchartData_1} legendPosition="bottom" redraw/>
                  </div>
                  <div className="column">
                    <Buses tableData={this.state.BusesData_1}/>
                  </div>
                </div>
              </div>
            : null }
          </div>
        </div>
      );
  }
}

export default App;
