import React from 'react'
import protect from '../images/protect.png'
import universal from '../images/universal.png'
import coaching12 from '../images/coaching_12.png'
import coaching15 from '../images/coaching_15.png'
import restricted from '../images/restricted.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMovieById } from '../reducers';

var degreePhoto = {
    '普遍級': universal,
    '輔12級': coaching12,
    '輔15級': coaching15,
    '保護級': protect,
    '限制級': restricted
}

var Test = [{ key: '普遍級', value: universal },
{ key: '輔12級', value: universal },
{ key: '輔15級', value: universal },
{ key: '保護級', value: universal },
{ key: '限制級', value: universal },]
class PostInformation extends React.Component {
    state = {
        degreePhoto: ""
    }
    render() {
        const { degree, type, poster, video, name } = this.props.movie
        const durationhour = Math.floor(this.props.movie.duration / 60)
        const durationmin = this.props.movie.duration % 60
        const date = new Date(this.props.movie.date).toLocaleDateString()
        let introduce = typeof this.props.movie.introduce === 'undefined' ? [] : this.props.movie.introduce.split('#')
        let actor = typeof this.props.movie.actor === 'undefined' ? [] : this.props.movie.actor.split(',')
        return (
            <div style={{
                minHeight: 'calc(100vh - 60px)',
                paddingTop: '80px'

            }}>
                <p style={{
                    fontFamily: '微軟正黑體',
                    fontSize: '20px',
                    marginTop: '0px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingLeft: '150px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgb(200, 200, 200)',
                    opacity: '0.6',
                    boxShadow: '0 5px 100px rgb(38, 96, 250)'
                }}>現正熱映</p>
                <div style={{ display: 'flex', direction: 'row', paddingLeft: '150px', flexWrap: 'wrap' }}>
                    <img src={poster} style={{ height: '400px', width: 'auto' }} />
                    <div style={{ display: 'flex', direction: 'column', color: '#696969', paddingLeft: '70px', fontSize: '18px', fontFamily: '微軟正黑體' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ verticalAlign: 'top' }}>演&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;員：</td>
                                    <td style={{ paddingLeft: '10px' }}>
                                        {actor.map(actor => (
                                            <div style={{ whiteSpace: 'nowrap' }} key={actor}>
                                                {actor}
                                                <br />
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: 'top' }}>類&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</td>
                                    <td style={{ paddingLeft: '10px' }}>{type}</td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: 'top' }}>片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;長：</td>
                                    <td style={{ paddingLeft: '10px' }}>{durationhour}小時{durationmin}分鐘</td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: 'top' }}>級&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;數：</td>
                                    <td style={{ paddingLeft: '10px' }}>{degree}</td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: 'top' }}>上映日期：</td>
                                    <td style={{ paddingLeft: '10px' }}>{date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ margin: '0px 0px 0px 80px', fontFamily: '微軟正黑體', fontSize: '20px', width: '680px' }}>
                        <div style={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                            <div style={{ direction: 'column' }}>
                                <p style={{ margin: '0px', fontSize: '40px', fontWeight: 'bold' }}>{name}</p>
                            </div>
                            <div>
                                <img src={degreePhoto[degree]} style={{ width: 'auto', height: '70px' }} />
                            </div>
                        </div>
                        <div style={{ width: '100%', marginTop: '20px', backgroundColor: 'black', height: '1px' }}></div>
                        <div style={{ color: '#696969', fontSize: '18px', marginTop: '15px' }}>
                            {introduce.map(introduce => (
                                <div key={introduce}>
                                    {introduce}
                                    <br />
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ padding: '50px 0px 50px 150px', display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <iframe width="650" height="370" src={video} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                    <div style={{ paddingRight: '250px', textAlign: 'center' }}>
                        <Link to="/Film">
                            <button style={{ padding: '5px 40px', backgroundColor: '#242870', fontSize: '20px', fontFamily: '微軟正黑體', color: 'lightgray', marginRight: '20px' }}>更多電影</button>
                        </Link>
                        <Link to="/Booking">
                            <button style={{ padding: '5px 40px', backgroundColor: '#242870', fontSize: '20px', fontFamily: '微軟正黑體', color: 'lightgray' }}>前往訂票</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        movie: getMovieById(state, ownProps.match.params.id)
    }
)
export default connect(mapStateToProps)(PostInformation)