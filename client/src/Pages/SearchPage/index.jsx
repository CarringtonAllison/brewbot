import React, { Component } from 'react';
import { Container, Row, Col } from "../../components/Grid";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import DropDown from "../../components/DropDown";

import axios from 'axios'

let defaultImage = 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/20/0/fnd_beer-istock.jpg.rend.hgtvcom.616.462.suffix/1448031613421.jpeg'


class SearchPage extends Component {
    state = {
        search: "",
        searchResaults: {},
        favorits: [],
        image: defaultImage
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        console.log(value);
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
        this.state.favorits.push(obj);
        
        console.log(this.state.favorits);
    }

    handleFormSubmit = e => {
        e.preventDefault();
        let URL = "https://cors-escape.herokuapp.com/https://api.brewerydb.com/v2/beers//?key=091aef518454c817284027220f913f6c&name=" + this.state.search;

        axios.get(URL).then(res => {
            this.setState({
                searchResaults: res.data.data[0],
                image: (res.data.data[0].labels ? res.data.data[0].labels.contentAwareLarge : defaultImage)
            })

            console.log(this.state.searchResaults);

        }).catch(err => console.log(err));

        console.log("Submited");
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="sm-12">
                        <form>
                            <Container>
                                <Row>
                                    <Col size="xs-8 sm-8">
                                        <Input
                                            name="search"
                                            value={this.state.search}
                                            onChange={this.handleInputChange}
                                            placeholder="Search For Beers"
                                        />
                                    </Col>
                                    <Col size="xs-10 sm-2">
                                        <DropDown></DropDown>
                                    </Col>
                                    <Col size="xs-10 sm-2">
                                        <Button
                                            onClick={this.handleFormSubmit}
                                            type="success"
                                            className="input-lg"
                                        > Search </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-3"></Col>
                    <Col size="sm">
                        <Card
                            URL={this.state.image}
                            title={this.state.searchResaults.name}
                            description={this.state.searchResaults.description}
                            ABV={this.state.searchResaults.abv}
                            onClick={this.handleSave}
                        />
                    </Col>
                    <Col size="sm-3"></Col>
                </Row>
            </Container>
        );
    }
}

export default SearchPage;