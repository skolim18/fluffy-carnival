import React, { Component } from 'react';
import Postcard from './Postcard';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col-md-9">
                        <Postcard />
                    </div>
                    <div className="col-md-3">
                        Waska kolumna
                    </div>
                </div>
            </div>
        );
    }
}
