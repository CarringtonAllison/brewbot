import React, { Component } from 'react';
import Input from "../../components/Input";
import Button from "../../components/Button";
import API from "../../utils/API";
import titleCase from "../../utils/titlecase";
import "./index.css"

class AddBeers extends Component {
    state = {
        name: "",
        abv: "",
        description: "",
        beerAddedMessage: ""
    }

    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleAdd = e => {
        e.preventDefault();
        this.setState({
            beerAddedMessage: "Beer Added You Legend, thank you!"
        })

        let obj = {
            name: titleCase(this.state.name),
            abv: this.state.abv,
            description: this.state.description
        }

        API.addBeerToDB(obj)
            .then(data => {
                console.log(data)
                this.setState({
                    name: "",
                    abv: "",
                    description: ""
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className=" login col-10">
                    <div className="col">
                        <h1 className="center formWorks">Add Beer</h1>
                    </div>
                    <form className="col">
                        <div className="col pad">
                            <Input
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="Beer Name"
                            />
                        </div>
                        <div className="col pad">
                            <Input
                                name="abv"
                                value={this.state.abv}
                                onChange={this.handleInputChange}
                                placeholder="ABV"
                            />
                        </div>

                        <div className="col pad">
                            <Input
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                placeholder="Description"
                            />
                        </div>

                        <div className="col pad center">
                        {/* beer added message carrington */}
                        <p>{this.state.beerAddedMessage}</p>
                            <Button
                                onClick={this.handleAdd}
                                className="input-lg"
                            > Add Beer </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBeers;