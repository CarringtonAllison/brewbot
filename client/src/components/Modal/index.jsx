import React, { Component } from 'react';
import API from "../../utils/API"

class Modal extends Component {
    state = {
        name: "",
        abv: "",
        description: ""
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSave = e => {
        e.preventDefault();
        let obj = {
            name: this.state.searchResaults.name,
            description: this.state.searchResaults.description,
            abv: this.state.searchResaults.abv
        }
        API.addBeerToDB(obj).then(res => console.log(res)).catch(err => console.log(err));
    } 

    render() {

        return (
            <div>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sorry... We couldnt find your search. Please add it to our database!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label for="beer-name" className="col-form-label">Beer/Brewery Name:</label>
                                        <input type="text" className="form-control" id="recipient-name" name="name"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="abv-text" className="col-form-label">ABV:</label>
                                        <textarea className="form-control" id="message-text" name="abv"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label for="descript-text" className="col-form-label">Description:</label>
                                        <textarea className="form-control" id="message-text" name="description"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleSave()}>Add It!!!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;