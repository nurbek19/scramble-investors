import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {PageHeader} from "react-bootstrap";
import PhotoForm from "../../components/PhotoForm/PhotoForm";
import {createPhoto} from "../../store/actions/photos";

class NewPhoto extends Component {
    onCreatePhoto = photoData => {
        this.props.createPhoto(photoData);
    };

    render() {
        return(
            <Fragment>
                <PageHeader>Add new photo</PageHeader>

                <PhotoForm
                    onSubmit={this.onCreatePhoto}
                />
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createPhoto: photoData => dispatch(createPhoto(photoData))
});

export default connect(null, mapDispatchToProps)(NewPhoto);