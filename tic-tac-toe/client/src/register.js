import React, { Component } from "react";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      errors: "",
    };
  }
  async submitdata(e) {
    e.preventDefault();
    const username = this.state.username;

    const data = JSON.stringify({ username });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:80/tictactoe/signup.php",
        data,
        config
      );
      console.log(res.data);
      if (res.data.includes("true")) this.props.history.push("/login");
      else this.setState({ errors: "username already exists" });
    } catch (error) {
      this.setState({ errors: "Server not found" });
    }

    // ;
  }
  render() {
    return (
      <form>
        <h3>Sign Up</h3>
        <p className="alert-danger">{this.state.errors}</p>
        <div className="form-group">
          <label>Your Username</label>
          <input
            type="text"
            value={this.state.username}
            className="form-control"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>

        <button
          onClick={(e) => this.submitdata(e)}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          already <a href="/login">registered?</a>
        </p>
      </form>
    );
  }
}
