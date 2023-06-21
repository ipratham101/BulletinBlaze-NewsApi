import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {props_walatitle, props_waladescription, props_walaimageUrl, props_walanewsUrl} = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width: "18 rem"}}>
                    <img src={props_walaimageUrl} className="card-img-top" alt="..." />
                    <div className="card-body"> 
                        <h5 className="card-title">{props_walatitle}...</h5>
                        <p className="card-text">{props_waladescription}...</p>
                        <a rel="noreferrer" href= {props_walanewsUrl} target = "_blank" className="btn btn-sm btn-primary">Read More...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
