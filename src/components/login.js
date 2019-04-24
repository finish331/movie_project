import React from "react";
import { Link, withRouter } from "react-router-dom";
import Banner from "../images/banner.jpg";
import BackgroundImg from "../images/film.jpg";
import { connect } from "react-redux";
import Api from "../Api";
class Profile extends React.Component {
  state = {
    account_login: "",
    password_login: "",
    account: "",
    password: "",
    name: "",
    address: "",
    phoneNumber: "",
    email: ""
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleRegClick = () => {
    fetch("http://databaseproject-222606.appspot.com/user", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        account: this.state.account,
        password: this.state.password,
        name: this.state.name,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        isVIP: 0,
        isManager: 0
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.doLogin(data);
      });
  };
  handleLoginClick = async () => {
    const { account_login, password_login } = this.state;
    const data = await Api.login({ account: account_login, password: password_login })
    if (data.msg) {
      this.setState({
        msg: data.msg
      });
    } else {
      this.props.doLogin(data);
      this.props.history.push("/profile");
    }
  };
  checkPhone = phoneNumber => {
    var re = /^[09]{2}[0-9]{8}$/;
    if (!re.test(phoneNumber)) {
      alert("您的手機格式錯誤！");
      return true;
    }
    return false;
  };

  regist = () => {
    if (
      this.refs.registPassword.value !== this.refs.registConfirmPassword.value
    ) {
      alert("您的密碼確認錯誤！");
    } else {
      this.handleRegClick();
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
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
        />
        <div
          id="SignIn"
          className="profile-area"
          style={{
            borderBottom: "5px solid #2E282A"
          }}
        >
          <h2 className="profile-title">Sign In</h2>
          <form>
            <div>
              <label>Account</label>
              <input
                type="text"
                ref="account"
                required
                onChange={this.handleChange("account_login")}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                ref="password"
                required
                onChange={this.handleChange("password_login")}
              />
            </div>
          </form>
          <div style={{ color: "red" }}>{this.state.msg}</div>
          <div>
            <button onClick={this.handleLoginClick}>LOGIN</button>
          </div>
        </div>
        <div
          id="Register"
          className="profile-area"
          style={{
            borderBottom: "5px solid #2E282A"
          }}
        >
          <form>
            <h2 className="profile-title">Register</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                ref="registName"
                onChange={this.handleChange("name")}
                required
              />
            </div>
            <div>
              <label>Account</label>
              <input
                type="text"
                ref="registAccount"
                onChange={this.handleChange("account")}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                ref="registPassword"
                onChange={this.handleChange("password")}
                required
              />
            </div>
            <div>
              <label>Password Confirm</label>
              <input type="password" ref="registConfirmPassword" required />
            </div>
            <div>
              <label>E-mail</label>
              <input
                type="email"
                ref="registEmail"
                onChange={this.handleChange("email")}
                required
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                ref="registPhoneNumber"
                onChange={this.handleChange("phoneNumber")}
                required
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                ref="registAddress"
                onChange={this.handleChange("address")}
                required
              />
            </div>
            <button onClick={this.regist}>Register</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  doLogin: data => dispatch({ type: "LOGIN", data })
});
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Profile)
);
