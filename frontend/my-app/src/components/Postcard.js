import React, { Component } from 'react';

export default class Postcard extends Component {
    render() {

        const imageTwo = "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2018-02/vicious_dog_0.png?itok=nsghKOHs"

        return (
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <h5 className="card-title ">Post title</h5>
                    <div className="col-md-4">
                        <img src={imageTwo} className="card-img" alt="..."></img>
                    </div>
                    <p className="card-text">User's post example content</p>
                </div>
            </div>
        );
    }
}