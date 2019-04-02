import React, { Component } from 'react'
import { Home, Packs, Beats, Music, Bio, Contact } from './sections';
import { Route, Switch } from 'react-router-dom';

class Main extends Component {

  render() {
    return (
      <div className="main flex-column">
        <Switch>
          {/* Available Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/packs" component={Packs} />
          <Route exact path="/beats" component={Beats} />
          <Route exact path="/music" component={Music} />
          <Route exact path="/bio" component={Bio} />
          <Route exact path="/contact" component={Contact} />

          {/* 404 Component */}
          <Route component={Home} />
        </Switch>
      </div>
    )
  }
}

export default Main
