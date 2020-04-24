import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchUserPhotos, removePhoto} from "../../store/actions/photos";
import {Col, Grid, PageHeader} from "react-bootstrap";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import Button from "react-bootstrap/es/Button";
import {Link} from "react-router-dom";
import ImageModal from "../../components/ImageModal/imageModal";

class UserPhotos extends Component {
    state = {
        show: false,
        currentImage: ''
    };

    componentDidMount() {
        this.props.fetchUserPhotos(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchUserPhotos(this.props.match.params.id);
        }
    }

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = image => {
        this.setState({show: true, currentImage: image});
    };

    removePhoto = id => {
        this.props.removePhoto(id).then(() => {
            this.props.fetchUserPhotos(this.props.match.params.id);
        });
    };

    render() {
        const userPhotos = this.props.userPhotos;

        return (
            <Fragment>
                <Grid>
                    <PageHeader>
                        {userPhotos.length > 0 ? userPhotos[0].user.username + "'s gallery" : "You haven't any photos"}
                        {this.props.user && (this.props.user._id === this.props.match.params.id) &&
                        <Link to="/new-photo">
                            <Button bsStyle="primary" className="pull-right">Add photo</Button>
                        </Link>}
                    </PageHeader>

                    {userPhotos ? userPhotos.map(product => (
                        <Col xs={6} md={4} key={product._id}>
                            <PhotoCard
                                id={product._id}
                                title={product.title}
                                image={product.image}
                                user={product.user}
                                authorId={this.props.user._id}
                                show={() => this.handleShow(product.image)}
                                remove={() => this.removePhoto(product._id)}
                            />
                        </Col>
                    )) : (<p style={{fontSize: '56px', textAlign: 'center', paddingTop: '200px'}}>Loading...</p>)}
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

const mapStateToProps = state => ({
    userPhotos: state.photos.userPhotos,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchUserPhotos: id => dispatch(fetchUserPhotos(id)),
    removePhoto: id => dispatch(removePhoto(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPhotos);