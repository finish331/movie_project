import React from 'react'
import { connect } from 'react-redux'
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
const OrderList = ({ cart }) => (
    <div style={{
        width: '100%',
        border: '1px solid #337ab7',
        borderRadius: '2px'
    }}>
        <div style={{ backgroundColor: '#337ab7', padding: '10px' }}>
            <h4 style={{ margin: '0', color: '#fff' }}>
                購物清單
            </h4>
        </div>
        <div style={{ padding: '5px 10px', minHeight: '50px', color: '#ccc' }}>
            {Object.keys(cart).map(
                ele => {
                    if (ele in ticketlist) {
                        return !!cart[ele] ?
                        <div style={{ borderBottom: '1px solid #f3f3f3', padding: '8px', fontSize: '16px' }} key={ele}>
                        <div style={{ margin: '10px' }}>{ticketlist[ele].name}</div>
                        <div style={{ textAlign: 'end', margin: '10px', whiteSpace: 'pre' }}>{`x   ${cart[ticketlist[ele].qty]}   =   ${cart[ele]}`}</div>
                    </div> : null
                    }
                }
            )}
            <div style={{ textAlign: 'end', paddingTop: '10px', paddingBottom: '20px', borderBottom: '2px #f3f3f3 solid', marginBottom: '20px' }}>{`合計 : ${cart.total}`}</div>
        </div>
    </div>
)

const mapStateToProps = state => (
    {
        cart: state.cart
    }
)
export default connect(mapStateToProps)(OrderList)