import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const selectStyle = {
    fontFamily: 'Microsoft JhengHei',
    fontSize: '16px',
    width: '350px',
    padding: '5px',
    borderRadius: '5px'
}
class QuickBooking extends React.Component {

    state = {
        MOVIE: -1,
        THEATER: -1,
        TIME: -1,
        DATE: -1,
    }
    _renderSelection = (data, type) => {
        return (
            <div style={{ marginBottom: '15px' }}>
                <select style={selectStyle} onChange={this.handleSelectionChange(type)} value={this.state[type]}>
                    <option value={-1}>請選擇</option>
                    {data.map(ele => <option value={ele.id} key={ele.id}>{ele.name}</option>)}
                </select>
            </div>
        )
    }
    handleSelectionChange = (type) => e => {
        const value = e.target.value
        if (type === 'DATE') this.setState({
            DATE: value,
            TIME: -1
        })
        else if (type === 'TIME') {
            this.setState({
                [type]: parseInt(value, 10)
            })
        }
        else {
            let ui = {
                MOVIE: -1,
                TIME: -1,
                DATE: -1,
            }
            ui[type] = parseInt(value, 10)
            this.setState(ui)
        }
    }
    filterMovies = () => {
        const THEATER = this.state.THEATER
        const { movies, shows } = this.props
        const select_shows = shows.filter(ele => ele.theater_id === THEATER).map(ele => ele.movie_id)
        return movies.filter(ele => select_shows.indexOf(ele.id) !== -1)
    }
    filterDates = () => {
        const { THEATER, MOVIE } = this.state
        const { shows } = this.props
        const select_dates = shows.filter(ele => ele.theater_id === THEATER && ele.movie_id === MOVIE).map(ele => {
            let date = new Date(ele.show_time).toLocaleDateString()
            return date
        })
        return select_dates.filter((ele, index) => select_dates.indexOf(ele) === index).map(ele => {
            return {
                id: ele,
                name: ele
            }
        })
    }
    filterTimes = () => {
        const { THEATER, MOVIE, DATE } = this.state
        const { shows } = this.props
        const select_times = shows.filter(ele => {
            let date = new Date(ele.show_time).toLocaleDateString()
            return ele.theater_id === THEATER
                && ele.movie_id === MOVIE
                && date === DATE
        })
        return select_times.map(ele => {
            let time = new Date(ele.show_time).toLocaleTimeString()
            return {
                id: ele.id,
                name: time,
            }
        })
    }
    render() {
        const movies = this.filterMovies()
        const dates = this.filterDates()
        const times = this.filterTimes()
        return (
            <div style={{ display: 'block', padding: '20px', backgroundColor: '#2660a9', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontFamily: 'Microsoft JhengHei', fontSize: '30px', fontWeight: '500px', color: 'white', marginBottom: '15px' }}>快速訂票</div>
                </div>
                {this._renderSelection(this.props.theaters, 'THEATER')}
                {this._renderSelection(movies, 'MOVIE')}
                {this._renderSelection(dates, 'DATE')}
                {this._renderSelection(times, 'TIME')}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Link to={`/order?show_id=${this.state.TIME}`}
                        style={{ backgroundColor: '#2196F3', textDecoration: 'none', color: '#fff', fontFamily: 'Microsoft JhengHei', border: '0px', borderRadius: '0px', padding: '10px 50px', fontSize: '16px' }}
                    >
                        前往訂票
                    </Link>
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => (
    {
        movies: state.movies,
        theaters: state.theaters,
        shows: state.shows
    }
)
export default connect(mapStateToProps)(QuickBooking)

