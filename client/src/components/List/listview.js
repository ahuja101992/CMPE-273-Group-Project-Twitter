import '../../css/list.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { Component } from "react";
import {HOSTNAME} from "../../constants/appConstants";

let members = []
let subscribers = []
const Image = (props) => {
    return (
        <img src={props.image} alt="Logo" className="picture-list">
        </img>
    )
};

const Handle = (props) => {
    return (
        <div className="handle-list">
            {props.handle}
        </div>
    )
};

const Name = (props) => {
    return (
        <div class="name-list">
            {props.name}
        </div>
    )
};

const List = (props) => {
    if (props.tweet.description !== undefined) {
        return (
            <div class="tweet-list">
                <Title title={props.tweet} />
                {/* <Link to={{ pathname: '/cart', state: {res:res}}}>{res.name}</Link> */}
                <p>{props.tweet.description}</p>
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.tweet} />
                    <Subscribers subscribers={props.tweet} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="tweet-list">
                <Title title={props} />
                <br />
                <div style={{ display: 'inline-block' }}>
                    <Members members={props.tweet} />{' '}{' '}
                    <Subscribers subscribers={props.tweet} />
                </div>
            </div>
        )
    }
};

const Title = (props) => {
    if (props !== undefined) {
        return (
            <div> <Link style={{ color: "black" }} to={{
                pathname: '/listtweet',
                state: { listId: props.title.id, list: props.title }
            }}>
                {props.title.name}
            </Link></div>
        )
    }
};

const Members = (props) => {
    console.log(props);
    return (
        <p style={{ display: 'inline-block' }}> {members.length} members</p>
    )
};

const Subscribers = (props) => {
    console.log(props);
    return (
        <p style={{ display: 'inline-block' }}> {subscribers.length} subscribers</p>
    )
};

class ListBody extends Component {
    constructor(props) {
        super(props);
        this.displayTweet = this.displayTweet.bind(this);
    }
    displayTweet(id) {
        console.log("ID >>>>>> ", id);
            try {
                document.querySelector("#root > div > div > div > div > div.col-lg-3 > div > div > div > button:nth-child(10)").setAttribute("data-list-props", JSON.stringify(this.props.tweet));
                document.querySelector("#root > div > div > div > div > div.col-lg-3 > div > div > div > button:nth-child(10)").click();
            }
            catch (e) {
                console.log(e);
            }
    }

    componentDidMount(){
        axios.get(`http://${HOSTNAME}:8080/api/v1/list/${this.props.tweet.id}/members`)
        .then(response => {
            console.log("members count", response.data.data.members);
            members = response.data.data.members
        })
        .catch(err => {
            console.error(err);
        });

        axios.get(`http://${HOSTNAME}:8080/api/v1/list/${this.props.tweet.id}/subscribers`)
        .then(response => {
            console.log(" subscribers  count", response.data.data.subscribers);
            subscribers = response.data.data.subscribers
        })
        .catch(err => {
            console.error(err);
        });
       
        // this.props.tweet.members=members;
        // this.props.tweeet.subscribers=subscribers;
       
    }
    render() {
        console.log("check list ----------------", this.props);
        return (
            <div class="list-group">
                <button type="button" className="inner-body list-group-item list-group-item-action" onClick={(e) => this.displayTweet(this.props)}>
                    {
                        this.props.image ? (<Image image={this.props.image} />) : (<Image image="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/TwitterLogo__55acee_jntmic/twitter-applications-verified.jpg" />)
                    }
                    {/* <div className="inner-body-list list-group-item list-group-item-action">
                        <Image image={props.image} /> */}
                        <div className="body">
                            <div className="inner-body-inner-list">
                                <Name name={this.props.name} />
                                <Handle handle={this.props.handle} />
                            </div>
                            <List tweet={this.props.tweet} />
                        </div>
                    {/* </div > */}
                </button>
            </div>
        )
    }
}

export default ListBody;