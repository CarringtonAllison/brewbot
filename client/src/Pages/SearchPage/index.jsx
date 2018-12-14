import React, { Component } from 'react';
import { Container, Row, Col } from "../../components/Grid";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CardBeer from "../../components/CardBeer";
import CardBrewery from "../../components/CardBrewery";
import DropDown from "../../components/DropDown";
import FavCard from "../../components/favoriteCard"
import jwt_decode from 'jwt-decode';
import API from "../../utils/API"


let defaultImage = 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/20/0/fnd_beer-istock.jpg.rend.hgtvcom.616.462.suffix/1448031613421.jpeg'

class SearchPage extends Component {
    state = {
        search: "",
        searchResaults: {},
        image: defaultImage,
        searchOption: "beers",
        first_name: '',
        last_name: '',
        email: '',
        errors: {},
        fav: []
    }

    componentDidMount() {
        const token = localStorage.getItem("usertoken");
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSave = e => {
        e.preventDefault();
        let obj = {
            name: this.state.searchResaults.name,
            description: this.state.searchResaults.description,
            abv: this.state.searchResaults.abv,
            email: this.state.email
        }
        API.addFavorites(obj).then(data => console.log(data)).catch(err => console.log(err));
    }

    handleFormSubmit = e => {
        e.preventDefault();

        API.getBeerDB(this.state.search).then(res => {
            if (res.data[0]) {
                this.setState({
                    searchResaults: {
                        name: res.data[0].name,
                        description: res.data[0].descript,
                        abv: res.data[0].abv,
                        image: defaultImage
                    }
                })
            }
            else {
                API.getbeer(this.state.searchOption, this.state.search)
                    .then(res => {
                        if (res.data.data) {
                            this.setState({
                                searchResaults: res.data.data[0],
                                image: this.handleImages(res)
                            });
                        }
                        else {
                            // modal needs to go here!!!!!!!!!!!!!!!
                            console.log("This doest exist");
                        }
                    }).catch(err => console.log(err));
            }

        }).catch(err => console.log(err));

        console.log("Submited");
    }

    handleImages(res) {
        if (this.state.searchOption === "beers") {
            return res.data.data[0].labels ? res.data.data[0].labels.contentAwareLarge : defaultImage;
        }
        else if (this.state.searchOption === "breweries") {
            return res.data.data[0].images ? res.data.data[0].images.large : defaultImage;
        }
    }

    renderCard() {
        if (this.state.searchOption === 'beers') {
            return <CardBeer
                image={this.state.image}
                {...this.state.searchResaults}
                onClick={this.handleSave}
            />
        }
        else if (this.state.searchOption === 'breweries') {
            return <CardBrewery
                URL={this.state.image}
                {...this.state.searchResaults}
            />
        }
    }

    favBeers() {
        API.getFavBeers(this.state.email)
            .then(res => {
                this.setState({
                    fav: res.data[0].favorites
                });
            }).catch(err => console.log(err));
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
                                        <DropDown onChange={this.handleInputChange}></DropDown>
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
                        {this.renderCard()}
                    </Col>
                    <Col size="sm-3"></Col>
                </Row>
            </Container>
        );
    }
}

export default SearchPage;