import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchPhotos} from "../../store/actions/photos";

import PhotoCard from '../../components/PhotoCard/PhotoCard';
import {Col, Grid} from "react-bootstrap";
import ImageModal from "../../components/ImageModal/imageModal";

class Photos extends Component {
    state = {
        show: false,
        currentImage: ''
    };

    componentDidMount() {
        this.props.onFetchPhotos();
    }

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = image => {
        this.setState({show: true, currentImage: image});
    };

    render() {
        return (
            <Fragment>
                <Grid>
                    {this.props.photos.map(product => (
                        <Col xs={6} md={4} key={product._id}>
                            <PhotoCard
                                id={product._id}
                                title={product.title}
                                image={product.image}
                                user={product.user}
                                show={() => this.handleShow(product.image)}
                            />
                        </Col>
                    ))}
                </Grid>
                <ImageModal
                    show={this.state.show}
                    close={this.handleClose}
                    image={this.state.currentImage}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        photos: state.photos.photos,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPhotos: () => dispatch(fetchPhotos())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);