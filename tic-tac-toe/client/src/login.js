import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      username2: "",
      errors: "",
    };
  }
  componentDidMount() {
    if (localStorage.username) {
      this.props.history.push(
        "/?user=" + localStorage.username + "&vs=" + localStorage.vs
      );
    }
  }
  async submitdata(e) {
    e.preventDefault();
    const username = this.state.username;
    const username2 = this.state.username2;
    const data = JSON.stringify({ username, username2 });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:80/tictactoe/signin.php",
        data,
        config
      );
      console.log(res.data);
      if (res.data.includes("true")) {
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("vs", this.state.username2);
        this.props.history.push(
          "/?user=" + this.state.username + "&vs=" + this.state.username2
        );
      } else this.setState({ errors: "username not found" });
    } catch (error) {
      this.setState({ errors: "Server not found" });
    }

    // ;
  }
  render() {
    return (
      <form>
        <h3>Sign In</h3>
        <p className="alert-danger">{this.state.errors}</p>
        <div className="form-group">
          <label>Your Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Opponent Username</label>
          <input
            type="text"
            value={this.state.username2}
            onChange={(e) => this.setState({ username2: e.target.value })}
            className="form-control"
          />
        </div>

        <button
          onClick={(e) => this.submitdata(e)}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          Not <a href="/register">registered?</a>
        </p>
      </form>
    );
  }
}
