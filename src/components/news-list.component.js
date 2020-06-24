import React, { Component } from "react";
import NewsDataService from "../services/news.service";
import { Link } from "react-router-dom";

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveNews = this.retrieveNews.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNews = this.setActiveNews.bind(this);
    this.removeAllNews = this.removeAllNews.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      News: [],
      currentNews: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveNews();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveNews() {
    NewsDataService.getAll()
      .then(response => {
        this.setState({
          News: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNews();
    this.setState({
      currentNews: null,
      currentIndex: -1
    });
  }

  setActiveNews(News, index) {
    this.setState({
      currentNews: News,
      currentIndex: index
    });
  }

  removeAllNews() {
    NewsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    NewsDataService.findByName(this.state.searchTitle)
      .then(response => {
        this.setState({
          News: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, News, currentNews, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>News List</h4>

          <ul className="list-group">
            {News &&
              News.map((News, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNews(News, index)}
                  key={index}
                >
                  {News.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNews}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentNews ? (
            <div>
              <h4>News</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentNews.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentNews.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentNews.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/News/" + currentNews.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a News...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}