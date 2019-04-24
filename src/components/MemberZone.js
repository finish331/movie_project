import React from 'react'
import { connect } from 'react-redux'

const MemberZone = props => {
    const auth = props.user.token !== ''
    return (
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
                {auth ? `${props.user.name}你好` : '尚未登入'}
             </div>
        </div>
    )
}

const mapStateToProps = state => (
    {
        user: state.user
    }
)

export default connect(mapStateToProps)(MemberZone)