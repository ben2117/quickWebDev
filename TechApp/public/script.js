
var Component1 = React.createClass({

  componentWillMount: function() {
    this.setState(
      {
        error : " ",
        data : " "
      }
    );
  },

  componentDidMount: function(){


  },

  click: function(title){
    var input = ReactDOM.findDOMNode(this.refs.input).value;
    fetch('https://www.omdbapi.com/?t='+input+'&y=&plot=short&r=json', this)
    .then(
      function(response) {
        if (response.status !== 200) {
          this.setState({ error : "there was a problem"});
          return;
        }
        response.json().then(function(data) {
          this.setState({data : data});
        }.bind(this));
      }.bind(this)
    )
    .catch(function(err) {
      this.setState({ error : "there was a problem"});
    });
  },

  callBack: function(){
    console.log("hello")
  },

  renderResults: function(){
    return (
      <div className="row" style={{padding: "0.5%"}}>
        <div className="col-xs-8 col-md-4">
            <img src={this.state.data.Poster} />
        </div>
        <div className="col-xs-12 col-md-8">
            <h2> {this.state.data.Title} </h2>
            <br/>
            <h3> {this.state.data.Plot} </h3>
            <br/>
            <h4> {this.state.data.Actors} </h4>
        </div>
        </div>
    )
  },

  render: function(){
    console.log(this.state.data);
    return (
        <div>
          <p><i>this website uses fetch and will need a fancy browser that implements it such as chrome or firefox to work</i></p>
          <div className="input-group input-group-lg">
            <span className="input-group-addon" id="sizing-addon1">&lt;(0.o)&gt;</span>
            <input type="text" ref="input" className="form-control" placeholder="Search For Movie" aria-describedby="sizing-addon1"/>
             <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.click}>Searcharydoo!</button>
             </span>
          </div>
          <br/>
          <div className="jumbotron">
            {this.renderResults()}
          </div>

        </div>
      )
  }

})

ReactDOM.render(<Component1 />, document.getElementById('Component1'));
