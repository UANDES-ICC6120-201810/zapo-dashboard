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
        OcupacionchartData_2: {}
      }

      this.state = {
        BusesData_1: {}
      }
      this.state = {
        BusesData_2: {}
      }
      this.state = {
        InformacionchartData_1: {}
      }
      this.state = {
        InformacionchartData_2: {}
      }

      this.state = {
        Paraderos: ['PC1049', 'PC164']
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

        const graficos_ocupacion_2 = {
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
          OcupacionchartData_2: graficos_ocupacion_2
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

        const tabla_buses_2 = {
          patente: [],
          detencion: [],
          hora: [],
          recorrido: []
        }
        this.setState({
          BusesData_2: tabla_buses_2
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

        const graficos_informacion_2 = {
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
        InformacionchartData_2: graficos_informacion_2
      });
    }


    handleClick = () => {
      const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2NsaWVudF9pZCI6Mn0.relaBLHrVieE8ecpdwL47t9VkcnHCiztjp47xA3dVE8"


      if (this.state.startDate != null && this.state.endDate != null) {
        this.state.MostrarElementos = true;
        var start = this.state.startDate.format("YYYY-MM-DD") + " 00:00"
        var end = this.state.endDate.format("YYYY-MM-DD") + " 24:00"

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

            for (var i = 0; i < responseData.length; i++){
              dates.push(responseData[i].date)
              amounts.push(responseData[i].amount)
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
            console.log("hola");
            console.log(elemento_1);
            console.log("hola");

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
          // paradero 2
          const url_ocupacion_2 = "https://proyectozapo.herokuapp.com/api/v1/amount_of_passengers?bus_stop="+this.state.Paraderos[1]+"&start="+start+"&end="+end;

          fetch(url_ocupacion_2, {
              method: 'GET',
              headers: {
                "Authorization": token
              }
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("Informacion ocupacion paradero 2")
            console.log(responseData)
            console.log("Informacion ocupacion paradero 2")
            if (responseData.error != ""){

              var dates = []
              var amounts = []

              for (var i = 0; i < responseData.length; i++){
                dates.push(responseData[i].date)
                amounts.push(responseData[i].amount)
              }


              var colores = []
              for (var i = 0; i < dates.length; i++){
                colores.push('rgba('+ Math.floor((Math.random() * 255) + 1)+ ','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+', 0.6)')
              }

              var elemento_2 = {
                    labels: dates,
                    datasets:[
                      {
                        label:'Personas',
                        data:amounts,
                        backgroundColor:colores
                      }
                    ]
              }
              console.log("hola");
              console.log(elemento_2);
              console.log("hola");


              this.setState((prevState, props) => ({
                  OcupacionchartData_2: elemento_2
              }));
            } else {
              var elemento_2 = {
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
                  OcupacionchartData_2: elemento_2
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
                if (responseData[i].bus_speed == "1.0"){
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
        // paradero 2
        const url_buses_2 = 'https://proyectozapo.herokuapp.com/api/v1/bus_events?bus_stops={"data":['+ '"'+this.state.Paraderos[1] + '"'+']}&start='+start+'&end='+end+'&order_by=asc';

        fetch(url_buses_2, {
            method: 'GET',
            headers: {
              "Authorization": token
            }
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Informacion Buses paradero 2")
          console.log(responseData);
          console.log("Informacion Buses paradero 2")
          if (responseData.error != ""){
            // se deveria cambiar la data mas abajo
            var patentes = []
            var detenciones = []
            var horas = []
            var recorridos = []

            for (var i = 0; i < responseData.length; i++){
              patentes.push(responseData[i].plate_number)
              if (responseData[i].bus_speed == "1.0"){
                detenciones.push("Se detuvo")
              } else {
                detenciones.push("No se detuvo")
              }
              horas.push(responseData[i].event_time)
              recorridos.push(responseData[i].route_code)
            }

            var elemento_2 = {
              patente: patentes,
              detencion: detenciones,
              hora: horas,
              recorrido: recorridos
            }

            this.setState((prevState, props) => ({
                BusesData_2: elemento_2
            }));
          } else {
            var elemento_2 = {
              patente: [],
              detencion: [],
              hora: [],
              recorrido: []
            }

            this.setState((prevState, props) => ({
                BusesData_2: elemento_2
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

          // paradero 2
          const url_precionar_2 = 'https://proyectozapo.herokuapp.com/api/v1/amount_of_waiting_time_queries?bus_stops={"data":['+ '"'+this.state.Paraderos[1] + '"'+']}&start='+start+'&end='+end+'&order_by=asc';
          console.log(url_precionar_2);
          fetch(url_precionar_2, {
              method: 'GET',
              headers: {
                "Authorization": token
              }
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log("Informacion botones paradero 2")
            console.log(responseData);
            console.log("Informacion botones paradero 2")
            if (responseData.length > 0 ){
              var labels_2 = []
              var data_2 = []
              var consulta_mal = 0
              var no_autorizado = 0

              for (var i = 0; i < responseData.length; i++){
                if (responseData[i].type  == "waiting time query") {
                  if (labels_2.includes(responseData[i].route_code)){
                    for(var j = 0; j < labels_2.length; j++){
                      if (responseData[i].route_code == labels_2[j]){
                        data_2[j] += 1;
                      }
                    }
                  } else{
                    labels_2.push(responseData[i].route_code)
                    data_2.push(1)
                  }
                } else if (responseData[i].type  == "failed waiting time query"){
                  consulta_mal+=1
                } else if (responseData[i].type  == "not authorized waiting time query"){
                  no_autorizado+=1
                }
              }
              labels_2.push("Erronea")
              data_2.push(consulta_mal)
              labels_2.push("No autorizada")
              data_2.push(no_autorizado)


              var colores_2 = []
              for (var i = 0; i < labels_2.length; i++){
                colores_2.push('rgba('+ Math.floor((Math.random() * 255) + 1)+ ','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+', 0.6)')
              }

              var elemento_2 = {
                    labels: labels_2,
                    datasets:[
                      {
                        label:'Oprimidas',
                        data: data_2,
                        backgroundColor: colores_2
                      }
                    ]
              }

              this.setState((prevState, props) => ({
                  InformacionchartData_2: elemento_2
              }));

            } else {
              var elemento_2 = {
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
                  InformacionchartData_2: elemento_2
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
                <h1 className="Paradero" align="center">Paradero {this.state.Paraderos[1]}</h1>
                <Ocupacion chartData={this.state.OcupacionchartData_2} legendPosition="bottom" redraw/>
                <div className="row">
                  <div className="column">
                    <Informacion chartData={this.state.InformacionchartData_2} legendPosition="bottom" redraw/>
                  </div>
                  <div className="column">
                    <Buses tableData={this.state.BusesData_2}/>
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
