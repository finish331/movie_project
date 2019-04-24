import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home';
import Film from './components/Film';
import Login from './components/login';
import Theater from './components/Theater';
import Booking from './components/Booking';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Information from './components/Information';
import TheaterInformation from './components/TheaterInformation';
import { connect } from 'react-redux'
import Api from './Api';
import Profile from './components/Profile';
import SelectSeat from './components/SelectSeat';
import Order from './components/Order';
import withAuth from './components/withAuth'
class Routes extends React.Component {
    async componentDidMount() {
        let movies = await Api.getMovies()
        let theaters = await Api.getTheaters()
        let shows = await Api.getShows()
        this.props.getMovie(movies)
        this.props.getTheaters(theaters)
        this.props.getShows(shows)
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/film" component={Film} />
                            <Route path="/login" component={Login} />
                            <Route path="/profile" component={withAuth(Profile)} />
                            <Route exact path="/theater" component={Theater} />
                            <Route path="/theater/:id" component={TheaterInformation} />
                            <Route path="/booking" component={Booking} />
                            <Route path="/testing" component={SelectSeat} />
                            <Route path="/film/:id" component={Information} />
                            <Route path="/order" component={Order} />
                            <Route path="/*" render={() => <div>404</div>} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>)
    }
}


const mapDispatchToProps = dispatch => (
    {
        getMovie: movies => dispatch({ type: 'FETCH_MOVIES', movies }),
        getTheaters: theaters => dispatch({ type: 'FETCH_THEATERS', theaters }),
        getShows: shows => dispatch({ type: 'FETCH_SHOWS', shows })
    }
)
export default connect(null, mapDispatchToProps)(Routes)
