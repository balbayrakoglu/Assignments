import React, { Component } from "react";
import NewsDataService from "../services/news.service";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNews = this.getNews.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateNews = this.updateNews.bind(this);
    this.deleteNews = this.deleteNews.bind(this);

    this.state = {
      currentNews: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNews(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNews: {
          ...prevState.currentNews,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentNews: {
        ...prevState.currentNews,
        description: description
      }
    }));
  }

  getNews(id) {
    NewsDataService.get(id)
      .then(response => {
        this.setState({
          currentNews: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentNews.id,
      title: this.state.currentNews.title,
      description: this.state.currentNews.description,
      published: status
    };

    NewsDataService.update(this.state.currentNews.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentNews: {
            ...prevState.currentNews,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNews() {
    NewsDataService.update(
      this.state.currentNews.id,
      this.state.currentNews
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The News was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNews() {    
    NewsDataService.delete(this.state.currentNews.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/News')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNews } = this.state;

    return (
      <div>
        {currentNews ? (
          <div className="edit-form">
            <h4>News</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNews.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentNews.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentNews.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentNews.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNews}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNews}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a News...</p>
          </div>
        )}
      </div>
    );
  }
}