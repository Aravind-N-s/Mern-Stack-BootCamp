import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveRecordTwo } from "../actions";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import { nextStep, prevStep } from "../actions";

class Details extends Component {
  nextStep(e) {
    e.preventDefault();
    var data = {
      address: this.refs.address.value,
      description: this.refs.description.value,
      phone: this.refs.phone.value,
      about: this.refs.about.value
    };
    this.props.saveRecordTwo(data);
  }

  render() {
    return (
      <div className="container">
        <div className="panel-group">
          <div className="panel panel-info">
            <div className="panel-heading">
              <b>Fill The details</b>
            </div>
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="form-group form-group-md">
                  <div className="row">
                    <label className="col-sm-2 control-label">Address:</label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        ref="address"
                        defaultValue={this.props.fieldValues.address}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div className="row">
                    <label className="col-sm-2 control-label">
                      Description:
                    </label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        ref="description"
                        defaultValue={this.props.fieldValues.description}
                      />
                    </div>
                  </div>
                  <br />

                  <div className="row">
                    <label className="col-sm-2 control-label">Phone:</label>
                    <div className="col-md-6">
                      <input
                        type="phone"
                        className="form-control"
                        ref="phone"
                        defaultValue={this.props.fieldValues.phone}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div className="row">
                    <label className="col-sm-2 control-label">About us:</label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        ref="about"
                        defaultValue={this.props.fieldValues.about}
                        required
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <input
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.props.prevStep()}
                    value="Back"
                    style={{ marginLeft: "15%" }}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.nextStep.bind(this)}
                    value="Save & Continue"
                    style={{ marginLeft: "2%" }}
                  />
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ prevStep, saveRecordTwo }, dispatch);
};

const mapStateToProps = state => {
  return { fieldValues: state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
