import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from "components/api";
import { LoadMoreButton } from "components/Button/Button";
import { Loader } from "./Loader/Loader";



export class App extends Component  {

  state = {
    imageName: '',
    gallery: [],
    loading: false,
    page: 1,
    totalResult: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page ||
        prevState.imageName !== this.state.imageName) {
        
        this.setState({ loading: true });

        getImages(this.state.imageName, this.state.page)
          .then(response => {
                if (response.data.hits.length !== 0) {
                  this.setState({ gallery: [...this.state.gallery, ...response.data.hits], totalResult: response.data.total })
                }
            })
            .catch(error => console.log(error))
          .finally(() => this.setState({ loading: false })

          );
        }; 
  };

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
    });
    
    this.setState(prevState => {
      if (prevState.imageName !== this.state.imageName) {
        return ({ gallery: [], page: 1 })
      };
    });
  };

  getNextPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
    
    setTimeout(() => window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    }), 500)


  };



  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          gallery={this.state.gallery}
          page={this.state.page}/>
        <Loader loading={this.state.loading}/>
        {this.state.gallery.length >= 1 && this.state.gallery.length < this.state.totalResult &&  <LoadMoreButton getNextPage={this.getNextPage} />}
      </div>
    );
  };
};
