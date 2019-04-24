import React from 'react'
import OrderTitle from './OrderTitle';
import MemberZone from './MemberZone';
import OrderList from './OrderList';
import { connect } from 'react-redux'
import Api from '../Api';
import { Button, CircularProgress } from '@material-ui/core'
import { withRouter, Redirect } from 'react-router-dom'
const arr = {
    a: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    b: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    c: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    d: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    e: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    f: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    g: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    h: [1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15, 16],
    i: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
}

class SelectSeat extends React.Component {
    state = {
        selected_seats: [],
        isFetching: true
    }
    async componentDidMount() {
        const selected_seats = await Api.getSelectedSeats(this.props.cart.id)
        this.setState({ selected_seats, isFetching: false })
    }
    determineSeatColor = seat => {
        if (this.state.selected_seats.indexOf(seat) !== -1) return '#ff4679'
        if (this.props.cart.seats.indexOf(seat) !== -1) return '#0099e3'
        else return ''
    }
    handleConfirm = e => {
        const { adult_qty, youth_qty , discount_qty, seats } = this.props.cart
        const seat_qty = adult_qty + youth_qty + discount_qty
        if (this.props.cart.seats.length !== seat_qty) return
        this.props.history.push(`/order/orderconfirm`)
    }
    handleClick = seat => e => {
        const { adult_qty, youth_qty , discount_qty,  seats } = this.props.cart
        if (seats.indexOf(seat) !== -1 || this.state.selected_seats.indexOf(seat) !== -1) return
        const seat_qty = adult_qty + youth_qty + discount_qty
        const length = seats.push(seat)
        if (length > seat_qty) seats.shift()
        this.props.dispatch({ type: 'SET_SEAT', seats })
    }
    _seatBox = (seat, key) => (
        <div style={{
            height: '25px',
            width: '25px',
            border: '2px solid #ccc',
            borderRadius: '3px',
            textAlign: 'center',
            fontSize: '11px',
            lineHeight: '21px',
            margin: '1px',
            backgroundColor: this.determineSeatColor(`${key}-${seat}`),
            cursor: 'pointer'
        }} onClick={this.handleClick(`${key}-${seat}`)} key={`${key}-${seat}`}>
            {seat}
        </div>
    )
    _rowNumber = key => (
        <div style={{ color: '#ccc', textAlign: 'center', margin: '5px', width: '10px' }}>
            {key}
        </div>
    )
    _screen = () => (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
            <div style={{ width: '450px', height: '20px', backgroundColor: "#453e3b", justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '15px', width: '90%', border: '1px #ccc solid', borderRadius: '10px' }} />
            </div>
        </div>
    )
    _renderSelectZone = () => (
        <div>
            <div style={{
                backgroundColor: '#00000080',
                textAlign: 'center',
                color: '#fff',
                width: '100%',
                padding: '10px',
                marginBottom: '10px'
            }}>
                <h2 style={{ marginTop: '0', marginBottom: '10px' }}>
                    選擇座位
                        </h2>
                <div style={{ width: '' }}>
                    選擇您希望購買的電影票張數和類型.請注意系統將自動為您保留可訂的最佳座位, 每筆交易最多可購買10張電影票
                </div>
            </div>
            {this._screen()}
            <div style={{ minWidth: '450px', overflow: 'auto' }}>
                {Object.keys(arr).map(key => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
                        {this._rowNumber(key)}
                        {arr[key].map(seat => {
                            return !!seat ?
                                this._seatBox(seat, key) : <div style={{ width: '50px', height: '25px' }} />
                        })}
                        {this._rowNumber(key)}
                    </div>
                ))}
            </div>
        </div>
    )
    loader = () => {
        return (
            <div style={{ height: '100%', display:'flex',width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        )
    }
    render() {
        return this.props.cart.total === 0 ?
            <Redirect to='/' /> :
            <div style={{
                minHeight: 'calc(100vh - 60px)',
                maxWidth: '1440px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '150px',
                paddingBottom: '30px'
            }}>
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: '1', minWidth: '700px', margin: '10px 30px', marginBottom: '100px' }}>
                            <OrderTitle />
                            {this.state.isFetching ? this.loader() : this._renderSelectZone()}
                        </div>
                        <div style={{ flex: '1', minWidth: '250px', margin: '10px 30px', marginBottom: '100px' }}>
                            <MemberZone />
                            <OrderList />
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',

                    }}>
                        <Button variant='outlined' color='primary' style={{ height: '50px', width: '125px', margin: '30px' }} onClick={this.handleConfirm}>
                            確認訂單
                </Button>
                    </div>
                </div>
            </div>
    }
}

const mapStateToProps = state => (
    {
        cart: state.cart
    }
)

export default withRouter(connect(mapStateToProps)(SelectSeat))