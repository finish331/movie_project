import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Information from './Information';

class Film extends React.Component {
    state = {
        onShow: 'on_show',
        type: '現正熱映',
    }
    handleClick = (status, type) => {
        this.setState({ onShow: status })
        this.setState({ type: type })
    }
    render() {
        const { match = {}, information = [] } = this.props
        return (
            <div style={{
                minHeight: 'calc(100vh - 60px)',
                paddingTop: '80px'
            }}>
                <div style={{
                    textAlign: 'center',
                    paddingTop: '50px',
                }}>
                    <button onClick={() => this.handleClick('on_show', '現正熱映')} className="changeTypeButton" style={{ backgroundColor: this.state.onShow === 'on_show' ? '#0066FF' : '#2196F3' }}>現正熱映</button>
                    <button onClick={() => this.handleClick('not_released', '即將上映')} className="changeTypeButton" style={{ backgroundColor: this.state.onShow === 'not_released' ? '#0066FF' : '#2196F3' }}>即將上映</button>
                </div>
                <div style={{
                    color: '#1E90FF',
                    fontSize: '30px',
                    textAlign: 'center',
                    padding: '30px 0px',
                    fontWeight: 'bold'
                }}>
                    {this.state.type}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '100px', justifyContent: 'center' }}>
                    {information.filter(movie => movie.release === this.state.onShow).map(movie => <Poster {...movie} key={movie.id} match={match} information={movie} />)}
                </div>
            </div>
        )
    }
}
const Poster = props => (
    <div style={{
        margin: '0px 50px 50px 0px'
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '16px',
            fontFamily: '微軟正黑體',
            color: '#999'
        }}>
            <Link to={`${props.match.url}/${props.id}`}><img src={props.poster} style={{ height: '400px', width: '280px' }} /></Link>
            <div style={{ display: 'flex' }}>
                <p style={{
                    border: '1px solid',
                    borderRadius: '6px',
                    textAlign: 'center',
                    margin: '5px 8px 0px 0px',
                    padding: '3px'
                }}>數位</p>
                <p style={{
                    border: '1px solid',
                    borderRadius: '6px',
                    textAlign: 'center',
                    margin: '5px 8px 0px 0px',
                    padding: '3px'
                }}>IMAX</p>
                <p style={{
                    border: '1px solid',
                    borderRadius: '6px',
                    textAlign: 'center',
                    margin: '5px 8px 0px 0px',
                    padding: '3px',
                }}>{props.degree}</p>
            </div>
            <p style={{ color: '#0066FF', margin: '3px 0px', fontSize: '20px', fontWeight: 'bold' }}>{props.name}</p>
        </div>
    </div>
)
export default props => (
    <div>
        <Route exact path={`${props.match.path}`} component={FilmPage} />
        <Route path={`${props.match.path}/:id`} component={Information} />
    </div>
)
const mapStateToProps = state => (
    {
        information: state.movies
    }
)
const FilmPage = connect(mapStateToProps)(Film)