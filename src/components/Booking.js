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
class Booking extends React.Component {
    state = {
        THEATER: -1,
        MOVIE: -1
    }
    handleSelectionChange = () => e => {
        const value = e.target.value
        this.setState({
            THEATER: value,
            MOVIE: -1
        })
    }
    handleChange = () => e => {
        const value = e.target.id
        this.setState({
            MOVIE: value
        })
    }
    returnDate() {

        return (
            <div>
                <div style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    <div>
                        {this.props.shows.filter(movie => movie.movie_id == this.state.MOVIE && movie.theater_id == this.state.THEATER).map(
                            movie => (
                                <div>
                                    <div style={{ fontSize: '20px' }}>{movie.show_time.substring(0, 4)}年{movie.show_time.substring(5, 7)}月{movie.show_time.substring(8, 10)}日</div>
                                    <div style={{ margin: '10px 0' }}>
                                        {this.props.shows.filter(movie => movie.movie_id == this.state.MOVIE && movie.theater_id == this.state.THEATER).map(
                                            movie => (
                                                <Link to={`/order?show_id=${movie.id}`}>
                                                    <button style={{ marginBottom: '10px' }} className="bookingButton">{movie.show_time.substring(11, 16)}</button>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    }
    returnSession() {
        if (this.state.MOVIE != -1) {
            return (
                <div style={{ backgroundColor: '#f0f0f0', padding: '25px 350px' }}>
                    {this.props.movies.filter(movie => movie.id == this.state.MOVIE).map(
                        movie => (
                            <div style={{ display: 'flex' }}>
                                <div >
                                    <img src={movie.poster} style={{ height: '500px', width: '350px' }}></img>
                                </div>
                                <div style={{ fontFamily: 'Microsoft JhengHei', color: '#363636', padding: '5px 25px' }}>
                                    <div style={{ fontSize: '40px' }}>{movie.name}</div>
                                    <div style={{ paddingLeft: '20px' }}>{movie.degree} 　　片長 : {movie.duration} 分鐘</div>
                                    {this.returnDate()}

                                </div>
                            </div>
                        )
                    )}
                </div>
            )
        }
    }
    returnMovie() {
        const select_shows = this.props.shows.filter(ele => ele.theater_id == this.state.THEATER).map(ele => ele.movie_id)
        const select_movie = this.props.movies.filter(ele => select_shows.indexOf(ele.id) != -1)
        if (this.state.THEATER != -1) {
            return (
                <div>

                    <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '25px 400px' }}>
                            {select_movie.map(
                                ele => (
                                    <div style={{ fontFamily: 'Microsoft JhengHei', width: '200px', margin: '5px 10px' }} >
                                        <a id={ele.id} className="newChangeColor" onClick={this.handleChange()} style={{ textDecoration: 'none' }} >{ele.name}</a>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    {this.returnSession()}
                </div>
            )
        }
    }
    render() {

        return (
            <div style={{
                minHeight: 'calc(100vh - 60px)',
                paddingTop: '80px'
            }}>
                <div style={{ textAlign: 'center', backgroundColor: '#2196F3', padding: '10px' }}>
                    <div>
                        <select style={selectStyle} onChange={this.handleSelectionChange()}>
                            <option value={-1}>請選擇影城</option>
                            {this.props.theaters.map(
                                theaters => (
                                    <option value={theaters.id} key={theaters.id}>{theaters.name}</option>
                                )
                            )}
                        </select>
                    </div>
                </div>

                {this.returnMovie()}

                <div style={{ fontFamily: 'Microsoft JhengHei', padding: '25px 350px' }}>
                    <div style={{ fontSize: '50px', color: '#2196F3' }}>訂票注意事項</div>
                    <div style={{ padding: '0 50px', fontSize: '20px', color: '#363636' }}>
                        <li>「團體優待票券/愛心票/敬老票」無法與「一般/銀行優惠/iShow會員票種」同時訂票，請分次訂購。</li>
                        <li>銀行優惠票種與iShow會員票種無法於同筆訂單中，請分次訂購，唯兩筆訂票無法保證座位。</li>
                        <li>銀行購票優惠即日起可於網路訂票系統進行預訂。網路預訂以電影播放日期為準，而非以刷卡日計算，每卡每日購買張數限制依影片類型、單日購票張數相關規定限制。</li>
                        <li>未滿２歲且不佔位之兒童無需購票可免費入場觀賞【普遍級】影片，每位兒童需由至少一位已購票之成人陪伴。</li>
                        <li>需佔位或２歲以上未滿１２歲之兒童；需購買優待票。</li>
                        <li>網路訂票每張票需加收 NT$20 手續費。</li>
                        <li>片長 150分鐘以上(含150分鐘)之電影需加價 NT$10。</li>
                    </div>
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
export default connect(mapStateToProps)(Booking)
