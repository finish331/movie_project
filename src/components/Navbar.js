import React from 'react'
import LOGO from '../images/LOGO.png'
import { NavLink as Link } from 'react-router-dom'
import { connect } from 'react-redux'
const links = [
    { name: '介紹', to: 'film' },
    { name: '影城', to: 'theater' },
    { name: '訂票', to: 'booking' },
]
const style = {
    fontFamily: 'Microsoft JhengHei',
    //border: 'lightblue solid 1px ',
    margin: '0 15px',
    borderRadius: '5px',
    color: '#fff',
    padding: '10px',
    fontSize: '17px',
    fontWeight: '500',
    textDecoration: 'none'
}
const Navbar = props => (
    <div style={{
        height: '80px',
        backgroundColor: '#2660a9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: '1200'
    }}>
        <Link to='/'>
            <img src={LOGO} style={{ width: '200px', height: '100px',marginTop:'25px'}} />
        </Link>

        <div>
            {links.map(
                link =>
                    <Link to={`/${link.to}`} key={link.name}
                        style={style}
                    >
                        {link.name}
                    </Link>)}
            {props.isAuth ?
                <Link to='/profile' style={style}>
                    會員中心
                </Link> :
                <Link to='/login' style={style}>
                    登入
                </Link>}
        </div>
    </div>
)
const mapStateToProps = state => ({
    isAuth: state.user.token === '' ? false : true
})
export default connect(mapStateToProps)(Navbar)