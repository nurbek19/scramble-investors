import React from 'react';
import {Button, Image, Panel} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import config from '../../config';

const PhotoCard = props => {
    return (
        <Panel key={props.id}>
            <Panel.Body>
                <Image
                    style={{width: '100%', height: '280px', objectFit: 'cover', marginBottom: '15px'}}
                    src={config.apiUrl + '/uploads/' + props.image}
                />
                <h4><a style={{cursor: 'pointer'}} onClick={props.show}>{props.title}</a></h4>
                <Link to={"/photos/" + props.user._id} style={{marginBottom: '10px'}}>{props.user.username}</Link>
                <br/>
                {props.authorId === props.user._id && <Button bsStyle="danger" onClick={props.remove}>Delete</Button>}
            </Panel.Body>
        </Panel>
    )
};

PhotoCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default PhotoCard;