import React, {Component, PropTypes} from 'react';
import {
  Container,
  Grid,
  Image,
  Segment,
  Header,
  Input,
  Divider,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import BuyButton from './buttons/BuyButton';
import Price from './utils/Price';
import axios from './api/axios';

class PurchasePage extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      noOfTickets: 1,
      movie: null,
      isLoading: false
    };
  }

  componentDidMount () {
    this.setState({isLoading: true});

    const movieId = this.props.match.params.id;
    const onSuccess = (response) => {
      this.setState({movie: response.data, isLoading: false});
    };

    /*
     TODO:
     - try to handle "404 Not found" optionally in case the movie is not found
     */
    axios.get(`movies/${movieId}`).then(onSuccess);
  }

  handleChange (e) {
    this.setState({noOfTickets: e.target.value});
  }

  handleBuy () {
    // TODO call api
  }

  getImageSrc () {
    const {movie} = this.state;

    if (movie) {
      return movie.image;
    }

    return 'https://react.semantic-ui.com/assets/images/wireframe/image.png';
  }

  getDescription () {
    const {movie} = this.state;

    if (movie) {
      return movie.description;
    }

    return (
      <Image
        src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png'/>
    );
  }

  render () {
    const {
      noOfTickets,
      isLoading,
      movie
    } = this.state;
    let loadingIndicator = null;

    if (isLoading) {
      loadingIndicator = (
        <Dimmer active inverted>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }

    return (
      <Container>
        <Header as='h2' attached='top'>
          {movie && movie.title ? movie.title : '...'}
        </Header>
        <Segment attached>
          {loadingIndicator}
          <Grid>
            <Grid.Column width={4}>
              <Image
                src={this.getImageSrc()} />
            </Grid.Column>
            <Grid.Column width={8}>
              {this.getDescription()}
            </Grid.Column>
            <Grid.Column width={4}>
              <div>
                <Input
                  value={noOfTickets}
                  onChange={this.handleChange}
                  size='mini'
                  action={<BuyButton onClick={this.handleBuy}/>}
                  type='number'
                />
              </div>
              <Divider hidden/>
              <div>
                <Price price={movie && movie.price ? movie.price : NaN}/>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

PurchasePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default PurchasePage;
