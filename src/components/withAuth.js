import React from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
export default Component => {
    class AuthComponent extends React.Component {
        render() {
            
            return this.props.token === '' ? <Redirect to='/login' /> : <Component />
        }
    }
    const mapStateToProps = state => (
        {
            token : state.user.token
        }
    )
    return connect(mapStateToProps)(AuthComponent)
}