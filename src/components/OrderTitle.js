import React from 'react'
import { connect } from 'react-redux'
import protect from '../images/protect.png'
import universal from '../images/universal.png'
import coaching12 from '../images/coaching_12.png'
import coaching15 from '../images/coaching_15.png'
import restricted from '../images/restricted.png'
import { getShowById, getMovieById } from '../reducers';
var degreePhoto = {
    '普遍級': universal,
    '輔12級': coaching12,
    '輔15級': coaching15,
    '保護級': protect,
    '限制級': restricted
}
const OrderTitle = ({ show, movie_degree }) => {
    const date = new Date(show.show_time)
    const localDate = date.toLocaleDateString()
    const time = date.toLocaleTimeString()
    return (
        <div style={{
            display: 'flex',
            marginBottom: '10px'
        }}>
            <div style={{
                height: "80px",
                width: '80px',
                margin: '10px',
                marginRight: '20px',
                backgroundImage: `url('${degreePhoto[movie_degree]}')`,
                backgroundSize:'cover',
                backgroundPosition:'center'
            }} />
            <div style={{ flex: '1' }}>
                <h2 style={{ marginTop: '10px' }}>
                    {show.movie_name}
                </h2>
            </div>
            <div style={{ padding: '10px 0', color: '#337ab7', fontSize: '15px' }}>
                <div style={{ marginBottom: '10px' }}>{localDate} {time}</div>
                <div style={{ marginBottom: '10px' }}>{show.theater_name}</div>
                <div style={{ marginBottom: '10px' }}>{`第${show.screen_name}廳`}</div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    const show = getShowById(state, state.cart.id)
    return (
        {
            show,
            movie_degree: getMovieById(state, show.movie_id).degree
        }
    )
}
export default connect(mapStateToProps)(OrderTitle)