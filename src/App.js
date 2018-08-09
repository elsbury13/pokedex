import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

var divStyle = { float: 'right' };

class App extends Component {
  state = {
    pokemons: [],
    loading: true
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true});

    const pokemon = {
      name: this.state.name
    };

    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon.name)
      .then(response => {
        const pokemons = response.data;
        this.setState({
          pokemons,
          loading: false
        });
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          document.getElementById('loading').innerHTML = "Sorry this pokemon cannot be found... Please try again"
          console.log(error.reposnse);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
      .then(response => {
        const pokemons = response.data;
        this.setState({
          pokemons,
          loading: false
        });
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.reposnse);
          document.getElementById('loading').innerHTML = "Sorry this pokemon cannot be found... Please try again"
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  render () {
    let content;
    if (this.state.loading) {
      content =
        <div>
          <div className="w3-third">
            <div className="w3-white w3-text-grey w3-card-4">
              <div className="w3-container">
                <h1># Pokemon</h1>
                <div id="loading">Loading...</div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </div>
            </div>
          </div>
          <div className="w3-twothird">
            <div className="w3-container w3-card w3-white w3-margin-bottom">
              <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-maxcdn fa-fw w3-xxlarge w3-text-teal"></i>Moves</h2>
              <form onSubmit={this.handleSubmit} style={divStyle}>
                <label>
                  Pokemon Name/Number:<br />
                  <input type="text" name="name" onChange={this.handleChange} />
                </label>
                <button type="submit">Search</button>
              </form>
              <div>Loading...</div>
              <div className="w3-container">
                <h5 className="w3-opacity"></h5>
                <h6 className="w3-text-teal"></h6>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </div>
            </div>
          </div>
        </div>
    } else {
      content =
        <div>
        <div className="w3-third">

          <div className="w3-white w3-text-grey w3-card-4">
            <div className="w3-container">
              <h1>#{this.state.pokemons.id} {this.state.pokemons.name}</h1>
              <img src={this.state.pokemons.sprites.front_default} />
              <p>
              <strong>Type:</strong>&nbsp;&nbsp;
              { this.state.pokemons.types.map(
                (types, index) =>
                  <span key={index}>
                    {types.type.name}&nbsp;
                  </span>
              )}
                <br /><strong>Weight:</strong> {this.state.pokemons.weight}<br />
                <strong>Height:</strong> {this.state.pokemons.height}
              </p>
              <hr />

              <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Stats</b></p>
                { this.state.pokemons.stats.map(
                  (stats, index) =>
                    <p key={index}>
                      {stats.stat.name}
                      <div className="w3-container w3-center w3-round-xlarge w3-teal">{stats.base_stat}</div>
                      <br />
                    </p>
                )}
              <br />
            </div>
          </div><br />
        </div>
        <div className="w3-twothird">
          <div className="w3-container w3-card w3-white w3-margin-bottom">
            <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-maxcdn fa-fw w3-xxlarge w3-text-teal"></i>Moves</h2>
            <form onSubmit={this.handleSubmit} style={divStyle}>
              <label>
                Pokemon Name/Number:<br />
                <input type="text" name="name" onChange={this.handleChange} />
              </label>
              <button type="submit">Search</button>
            </form>
            { this.state.pokemons.moves.map(
                (moves, index) =>
                  <div className="w3-container">
                    <h5 key={index} className="w3-opacity"><b>{moves.move.name}</b></h5>
                      {moves.version_group_details.map(
                        (level, index2) =>
                          <span key={index2}>
                          {level.version_group.name}&nbsp;
                          (level {level.level_learned_at})&nbsp; &nbsp;
                          </span>
                        )}
                  <hr />
                  </div>
              )}
          </div>
        </div>
      </div>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default App;
