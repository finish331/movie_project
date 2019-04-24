import React from 'react'
import OrderTitle from './OrderTitle';
import MemberZone from './MemberZone';
import OrderList from './OrderList';
import { connect } from 'react-redux'
import Api from '../Api';
import { Button } from '@material-ui/core'
import { withRouter, Redirect } from 'react-router-dom'
import { getShowById } from '../reducers';
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
class OrderConfirm extends React.Component {
    state = { list: [], message: '' }
    _ticketlist = (type, price, qty, total) => (
        <div style={{ padding: '15px 8px', display: 'flex', color: '#ccc', borderBottom: '1px solid #ccc', fontSize: '14px' }} key={type}>
            <div style={{ flex: '10' }} key={type}>
                {type}
            </div>
            <div style={{ flex: '4' }}>
                {price}
            </div>
            <div style={{ flex: '2' }}>
                {qty}
            </div>
            <div style={{ flex: '1' }}>
                {total}
            </div>
        </div>
    )
    determineSuccess = () => {
        return this.state.list.length >= 1 ?
            <div>
                <h1 style={{ color: 'green' }}>訂購成功</h1>
                <Button variant='outlined' onClick={() => this.props.history.push('/')}>回首頁</Button>
            </div> :
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ flex: '1', minWidth: '700px', margin: '10px 30px', marginBottom: '100px' }}>
                        <OrderTitle />
                        {this._renderOrder()}
                    </div>
                    <div style={{ flex: '1', minWidth: '250px', margin: '10px 30px', marginBottom: '100px' }}>
                        <MemberZone />
                    </div>
                </div>
                <div style={{ color: 'red', textAlign: 'end' }}>{this.state.message}</div>
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
    }
    handleConfirm = async e => {
        const order = await Api.createOrder(this.props.cart, this.props.token)
        if (order.list.length >= 1) {
            const record = await Api.getRecord(this.props.token)
            this.props.dispatch({ type: 'SET_RECORD', data: record })
        }
        this.setState(order)
    }
    _renderOrder = () => {
        const { cart, show } = this.props
        return (
            <div>
                <div style={{ backgroundColor: '#ccc', padding: '8px', display: 'flex' }}>
                    <div style={{ flex: '10' }}>
                        商品
                        </div>
                    <div style={{ flex: '4' }}>
                        價格
                        </div>
                    <div style={{ flex: '2' }}>
                        數量
                        </div>
                    <div style={{ flex: '1' }}>
                        合計
                    </div>
                </div>
                {show.ticket_list.map(ticket => {
                    return !!cart[ticket.name] ?
                        this._ticketlist(ticketlist[ticket.name].name,
                            ticket.price,
                            cart[ticketlist[ticket.name].qty],
                            cart[ticket.name]
                        ) : null
                })}
                <div style={{ padding: '15px 8px', fontWeight: '700', display: 'flex', color: '#777777', borderBottom: '1px solid #ccc', fontSize: '16px' }} >
                    <div style={{ flex: '16' }}>
                        總額
                    </div>
                    <div style={{ flex: '1' }}>
                        {cart.total}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.props.cart.id === -1 ? <Redirect to='/booking' /> :
            (
                <div style={{
                    minHeight: 'calc(100vh - 60px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '150px',
                    paddingBottom: '30px'
                }}>
                    {this.determineSuccess()}
                </div>
            )
    }
}

const mapStateToProps = state => (
    {
        token: state.user.token,
        show: getShowById(state, state.cart.id),
        cart: state.cart
    }
)

export default withRouter(connect(mapStateToProps)(OrderConfirm))