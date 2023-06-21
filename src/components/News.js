import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    
    static defaultProps = {
        country: 'in',
        pageSize: 5
    }
    // static propTypes = {
    //     name : this.PropTypes.string,
    //     pageSize : this.PropTypes.number

    // }

    capitalizeFirstLetter = (stringgg) => {
        return stringgg.charAt(0).toUpperCase() + stringgg.slice(1);
    }
    constructor(props) {
        //articles ek array hai
        super(props);
        console.log('Hello i am a constructor from news file or news component');
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.country)} - BulletinBlaze`;

    }

    async componentDidMount() {
        this.props.setProgress(10);
        console.log('componentDidMount');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // jab tak fetch nahi ho rha tab tak loading wala gif dikhao isleye await wali line ke upar likha hai

        this.setState({ loading: true });
        let data = await fetch(url); //using fetch api concept in JS and returns a promise
        this.props.setProgress(30);
        let parsedData = await data.json();
this.props.setProgress(50);
        //jaise hi parsedData mila wese hi apan ne loading ko false kar diya
        this.setState({ loading: false });
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            loading: false
        })
        this.props.setProgress(100);
    }

    handlePrevClick = async () => {
        console.log('previous');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url); //using fetch api concept in JS and returns a promise
        // jab tak fetch nahi ho rha tab tak loading wala gif dikhao isleye await wali line ke upar likha hai

        this.setState({ loading: true });
        let parsedData = await data.json();

        //jaise hi parsedData mila wese hi apan ne loading ko false kar diya
        this.setState({ loading: false });
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }


    handleNextClick = async () => {
        console.log(this.state.totalResults);
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            // jab tak fetch nahi ho rha tab tak loading wala gif dikhao isleye await wali line ke upar likha hai

            let data = await fetch(url); //using fetch api concept in JS and returns a promise
            let parsedData = await data.json();

            //jaise hi parsedData mila wese hi apan ne loading ko false kar diya
            this.setState({ loading: false });

            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
            })
        }
    }

    fetchMoreData = async() =>{
        this.setState({page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })

    }
    render() {
        return (
            <>
          
                <h2> BulletinBlaze - Top Headlines of {this.capitalizeFirstLetter(this.props.country)}</h2>
                {/* agar loading == true hua toh hi spinner ko dikhayenge else nahi dikhayenge */}
                
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* {this.state.articles.map((element) => {
        console.log(element)
      })} */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem props_walatitle={element.title ? element.title : ""} props_waladescription={element.description ? element.description : ""} props_walaimageUrl={element.urlToImage}
                                        props_walanewsUrl={element.url}
                                    />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>


                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News
