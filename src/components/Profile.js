import React from "react";
import { connect } from 'react-redux'
import Api from "../Api";

class ModifyProfile extends React.Component {
  state = {
    edit: true,
  }
  componentDidMount() {
    this.setState(this.props.user)
  }
  checkPhone = phoneNumber => {
    var re = /^[09]{2}[0-9]{8}$/;
    if (!re.test(phoneNumber)) {
      alert("您的手機格式錯誤！");
      return true;
    }
    return false;
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };
  handleEditClick = () => {
    this.setState({ edit: false })
  }
  handleCancel = () => {
    this.setState({ edit: true })
    this.setState(this.props.user)
  }
  handleConfirm = async () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber
    }
    const update = await Api.updateProfile(data, this.props.user.token)
    this.props.dispatch({ type: 'SET_PROFILE', data: update })
    this.setState({ edit: true })
  }
  render() {
    const { name, email, phoneNumber, address } = this.state
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="profile-area"
          style={{
            minWidth: "70%",
            borderBottom: "3px solid #2E282A"
          }}
        >
          <form>
            <h2>Profile</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  paddingRight: "5%",
                  borderRight: "3px solid #2E282A",
                  width: "100%"
                }}
              >
                <div>
                  <label>Name</label>
                  <input type="text" onChange={this.handleChange("name")} value={name} disabled={this.state.edit} />
                </div>
                <div>
                  <label>E-mail</label>
                  <input type="email" onChange={this.handleChange("email")} value={email} disabled={this.state.edit} />
                </div>
              </div>
              <div
                style={{
                  paddingLeft: "5%",
                  width: "100%"
                }}
              >
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    onChange={this.handleChange("phoneNumber")}
                    value={phoneNumber} disabled={this.state.edit}
                  />
                </div>
                <div>
                  <label>Address</label>
                  <input type="text" onChange={this.handleChange("address")} value={address} disabled={this.state.edit} />
                </div>
              </div>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "10px"
            }}
          >
            {this.state.edit ? <button
              style={{
                marginRight: "10px"
              }}
              onClick={this.handleEditClick}
            >
              修改
              </button> :
              <div style={{ display: 'flex' }}>
                <button
                  style={{
                    marginRight: "10px"
                  }}
                  onClick={this.handleCancel}
                >
                  取消
              </button>
                <button
                  style={{
                    marginRight: "10px"
                  }}
                  onClick={this.handleConfirm}
                >
                  確認修改
              </button></div>

            }
          </div>
        </div>
      </div>
    );
  }
}

class Record extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="profile-area" style={{ width: "60%" }}>
          <h2>Record</h2>
          {this.props.record.map(order => (

            <div
              style={{
                marginLeft: "20px",
                borderBottom: "3px solid #2E282A"
              }}
            >
              <h3 style={{ paddingLeft: "10px", marginBottom: "0px" }}>
                {order.movie}
              </h3>
              <div
                style={{
                  display: "flex"
                }}
              >
                <div
                  style={{ paddingLeft: "20px", marginBottom: "6px" }}
                >
                  <p>{`訂票日期：${new Date(order.create_at).toLocaleDateString()}`}</p>
                  <p>{`場次：${order.number}`}</p>
                  <p>{`座位：${order.tickets.map(ticket => ticket.seat)}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const ProfilePage = props => (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      minHeight: 'calc(100vh - 60px)',
      paddingTop: '80px',
      backgroundColor: '#d6e4f0'
    }}
  >
    <div
      style={{
      }}
    >
      <ModifyProfile {...props} />
      <Record {...props.user} />
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    user: state.user
  }
)

export default connect(mapStateToProps)(ProfilePage)