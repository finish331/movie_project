import React from 'react'
import { Link, Route } from 'react-router-dom'
import phone from '../images/phone.jpg'
import placeholder from '../images/placeholder.jpg'
import { connect } from 'react-redux'
import TheaterInformation from './TheaterInformation';
class Theater extends React.Component {

    render() {
        const { theaters } = this.props
        return (
            
            <div style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 60px)',
                paddingTop: '80px'
            }} >
            
                {theaters.map(
                    theater => (
                        <div key={theater.id} style={{
                            padding: '50px',
                            fontFamily: 'Microsoft JhengHei',
                            fontWeight: 'bold',
                            margin: '60px'
                        }} >
                            <Link to={`${this.props.match.url}/${theater.id}`}><img src={theater.image} style={{ height: '250px', width: '250px', justifyContent: 'center' }} /></Link>
                            <div style={{
                                display: 'flex',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                paddingLeft: '5px',
                                fontSize: '20px',
                                color: '#2196F3'
                            }}>{theater.name}</div>


                            <div style={{
                                display: 'flex',
                                fontSize: '18px',
                                marginBottom: '15px',
                                marginRight: '0px',
                                color: '#000000',
                                paddingRight: '0px'
                            }}>
                                <img src={placeholder} style={{ height: '25px', width: '25px', marginRight: '5px' }} />
                                <span style={{ display: 'inline-block', width: '230px', whihteSpace: 'pre-wrap' }}>
                                    {theater.address}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                fontSize: '18px',
                                marginBottom: '15px',
                                color: '#000000'
                            }}>
                                <img src={phone} style={{ height: '25px', width: '25px', marginRight: '5px' }} />
                                {theater.phone_number}
                            </div>

                        </div>

                    )
                )}
            </div>
        )
    }
}
export default props => (
    <div>
        <Route exact path={props.match.path} component={TheaterPage} />
        <Route path={`${props.match.path}/:id`} component={TheaterInformation} />
    </div>
)
const mapStateToProps = state => (
    {
        theaters: state.theaters
    }
)
const TheaterPage = connect(mapStateToProps)(Theater)