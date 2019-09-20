import React, { Component } from "React";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Success extends Component {
  render() {
    return (
      <div className="container">
      <div className="panel-group">
        <div className="panel panel-info">
          <div className="panel-heading">
            <b>Successfully Registered</b>
          </div>
          <div className="panel-body">
            <form className="form-horizontal">
              <div className="form-group form-group-md">
              <h3>Summary</h3>
                <div className="row">
                  <label style={{ marginLeft: "15%" }}>First Name:</label>{" "}
                  {this.props.fieldValues.firstname}
                  <br />
                  <label style={{ marginLeft: "15%" }}>Last Name:</label>{" "}
                  {this.props.fieldValues.lastname}
                  <br />
                  <label style={{ marginLeft: "15%" }}>Email:</label>{" "}
                  {this.props.fieldValues.email}
                  <br />
                  <label style={{ marginLeft: "15%" }}>Phone:</label>{" "}
                  {this.props.fieldValues.phone}
                  <br />
                  <label style={{ marginLeft: "15%" }}>Address:</label>{" "}
                  {this.props.fieldValues.address}
                  <br />
                  <label style={{ marginLeft: "15%" }}>Description:</label>{" "}
                  {this.props.fieldValues.description}
                  <br />
                  <label style={{ marginLeft: "15%" }}>About:</label>{" "}
                  {this.props.fieldValues.about}
                  <br />
                </div>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return { fieldValues: state };
};

export default connect(
  mapStateToProps,
  null
)(Success);
