import React, { Component } from 'react';
import logo from '../../static/images/login_twitter_logo.png';
import {signIn} from "../../actions/authActions";
import {connect} from "react-redux";
import {Button, Col, Form, Modal} from "react-bootstrap";

import CanvasJSReact from '../../lib/canvasjs.react';
import {PullDownContent, PullToRefresh, RefreshContent, ReleaseContent} from "react-js-pull-to-refresh";
import {TweetBody} from "../HomeTweetList/listview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons";
import {faRetweet, faShareSquare} from "@fortawesome/free-solid-svg-icons";
import Tweet from "../Tweet/Tweet";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;


function mapStateToProps(store) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

class AnalyticsMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            openCommentModal: false
        }

        this.handleRefresh = this.handleRefresh.bind(this)
        this.getUser = this.getUser.bind(this)
    }

    handleRefresh() {
        //dispatch
        return new Promise((resolve) => {
            this.getUser()
        });
    }

    getUser() {
        fetch('https://randomuser.me/api/')
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                this.setState({
                    users: [
                        {
                            name: data.results[0].name,
                            image: data.results[0].picture.medium,
                            tweet: data.results[0].email,
                        },
                        ...this.state.users,
                    ]
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillMount() {
        this.getUser()
    }


    render() {
        const options = {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Top 10 tweets"
            },
            axisX: {
                title: "Tweets",
                reversed: true,
            },
            axisY: {
                title: "Number of views",
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: [
                    { y:  2200000000, label: "Tweet 1" },
                    { y:  1800000000, label: "Tweet 2" },
                    { y:  800000000, label: "Tweet 3"  },
                    { y:  563000000, label: "Tweet 4"  },
                    { y:  376000000, label: "Tweet 5"  },
                ]
            }]
        }



        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />

                <div style={{width: 566}}>
                    <PullToRefresh
                        pullDownContent={<PullDownContent />}
                        releaseContent={<ReleaseContent />}
                        refreshContent={<RefreshContent />}
                        pullDownThreshold={2}
                        onRefresh={this.handleRefresh}
                        triggerHeight={50}
                        backgroundColor='white'>

                        <div className="main-body">
                            {[...this.state.users].map((user, index) => {
                                let name = `${user.name.first} ${user.name.last}`
                                let handle = `@${user.name.first}${user.name.last}`
                                let image = user.image
                                let tweet = user.tweet
                                console.log(image)
                                return (
                                    <div>
                                        <h5>Tweet 1</h5>
                                        <TweetBody
                                            key={index}
                                            name={name}
                                            handle={handle}
                                            tweet={tweet}
                                            image={image} />
                                    </div>
                                )
                            })}
                        </div>
                    </PullToRefresh>
                </div>
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    message: {
        fontWeight: "bold",
        paddingTop: "2rem"
    },
    logo: {
        paddingTop: "10px",
        width: "50px",
    },
    email: {
        width: "30rem",
    },
    loginButton: {
        width: "30rem",
        backgroundColor: "#2F99EA"
    },
    signUpBox: {
        marginTop: 40
    },
    signUpButton: {
        backgroundColor: "#2F99EA"
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsMain);