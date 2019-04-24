import React from 'react'
import { connect } from 'react-redux'
import { getShowById, setCart } from '../reducers';
import queryString from 'query-string'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core'
import OrderList from './OrderList';
import OrderTitle from './OrderTitle';
import MemberZone from './MemberZone';
import SelectSeat from './SelectSeat';
import OrderConfirm from './OrderConfirm';
const ticketlist = {
    discount: {
        name: '優待票',
        qty: 'discount_qty'
    },
    youth: {
        name: '半票',
        qty: 'youth_qty'
    },
    adult: {
        name: '全票',
        qty: 'adult_qty'
    }
}
const ten_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const uiState = (id = -1) => ({
    id,
    adult_qty: 0,
    youth_qty: 0,
    discount_qty: 0,
    adult: 0,
    youth: 0,
    discount: 0,
    total: 0,
    seats: []
})
class Order extends React.Component {
    state = uiState
    componentDidMount() {
        const { dispatch, show } = this.props
        dispatch({ type: 'SET_CART', data: uiState(show.id) })
    }
    handleClick = e => {
        if (this.props.cart.total === 0) return
        this.props.history.push('/order/selectseat')
    }
    handleQtyChange = type => e => {
        const value = parseInt(e.target.value, 10)
        const { dispatch, cart } = this.props
        let data = cart
        data.id = this.props.show.id
        switch (type) {
            case 'adult':
                data.adult_qty = value
                break
            case 'youth':
                data.youth_qty = value
                break
            case 'discount':
                data.discount_qty = value
        }
        dispatch(setCart(data))
    }
    _renderNotify = () => (
        <div style={{
            backgroundColor: '#00000080',
            textAlign: 'center',
            color: '#fff',
            width: '100%',
            padding: '10px',
            marginBottom: '10px'
        }}>
            <h2 style={{ marginTop: '0', marginBottom: '10px' }}>
                選擇電影票
                        </h2>
            <div style={{ width: '' }}>
                選擇您希望購買的電影票張數和類型.請注意系統將自動為您保留可訂的最佳座位, 每筆交易最多可購買10張電影票
                        </div>
        </div>
    )
    _renderQtySelect = type => (
        <select onChange={this.handleQtyChange(type)}>
            {ten_array.map(ele =>
                <option key={ele} value={ele}>
                    {ele}
                </option>
            )}
        </select>
    )
    _renderTicketSelect = () => {
        const { show, cart } = this.props
        return (
            <div style={{
                width: '100%',
                border: '1px solid #337ab7',
                borderRadius: '2px'
            }}>
                <div style={{ backgroundColor: '#337ab7', padding: '10px' }}>
                    <h4 style={{ margin: '0', color: '#fff' }}>
                        一般票種
                    </h4>
                </div>
                <div style={{
                    padding: '10px'
                }}>
                    <div style={{ backgroundColor: '#ccc', padding: '8px', display: 'flex' }}>
                        <div style={{ flex: '2' }}>
                            票種
                        </div>
                        <div style={{ flex: '2' }}>
                            價格
                        </div>
                        <div style={{ flex: '3' }}>
                            數量
                        </div>
                        <div style={{ flex: '1.5' }}>
                            合計
                        </div>
                    </div>
                    {
                        show.ticket_list.map(ticket =>
                            <div style={{ padding: '15px 8px', display: 'flex', color: '#ccc', borderBottom: '1px solid #ccc' }} key={ticket.name}>
                                <div style={{ flex: '2' }}>
                                    {ticketlist[ticket.name].name}
                                </div>
                                <div style={{ flex: '2', fontSize: '20px', color: '#990000' }}>
                                    {`$${ticket.price}`}
                                </div>
                                <div style={{ flex: '3' }}>
                                    {this._renderQtySelect(ticket.name)}
                                </div>
                                <div style={{ flex: '1.5' }}>
                                    {`$${cart[ticket.name]}`}
                                </div>
                            </div>)
                    }
                </div>
            </div>
        )
    }
    _renderMember = () => (
        <div style={{
            width: '100%',
            border: '1px solid #337ab7',
            borderRadius: '2px', marginBottom: '60px'
        }}>
            <div style={{ backgroundColor: '#337ab7', padding: '10px' }}>
                <h4 style={{ margin: '0', color: '#fff' }}>
                    會員專區
                            </h4>
            </div>
            <div style={{ padding: '10px', minHeight: '50px', color: '#ccc' }}>
                尚未登入
                        </div>
        </div>
    )
    render() {
        const { show } = this.props
        return Object.values(show).length === 0 ? <Redirect to='/booking' /> :
            <div style={{
                minHeight: 'calc(100vh - 60px)',
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
                        flexWrap: 'wrap-reverse'
                    }}>
                        <div style={{ flex: '1', minWidth: '700px', margin: '10px 30px', marginBottom: '100px' }}>
                            <OrderTitle />
                            {this._renderNotify()}
                            {this._renderTicketSelect()}
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
                        <Button variant='outlined' color='primary' style={{ height: '50px', width: '125px', margin: '30px' }} onClick={this.handleClick}>
                            選擇座位
                    </Button>
                    </div>
                </div>

            </div>
    }
}
const mapStateToProps = (state, ownProps) => {
    const value = queryString.parse(ownProps.location.search)
    return (
        {
            show: getShowById(state, value.show_id),
            cart: state.cart
        }
    )
}

const OrderPage = withRouter(connect(mapStateToProps)(Order))
export default props => (
    <div>
        <Route exact path={`${props.match.path}`} component={OrderPage} />
        <Route path={`${props.match.path}/selectseat`} component={SelectSeat} />
        <Route path={`${props.match.path}/orderconfirm`} component={OrderConfirm} />
    </div>
)