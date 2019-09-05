import React, { Component } from 'react';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        Waska kolumna
                    </div>
                </div>
            </div>
        );
    }
}
