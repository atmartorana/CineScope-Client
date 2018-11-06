/* Used this website: https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na */

import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // animation wrapper
// Gotta find an easier way to import multiple images
import tmpbanner from '../img/tmpbanner.png';
import tmpbanner2 from '../img/tmpbanner2.png';

import styled from 'styled-components';

const imgUrls = [tmpbanner, tmpbanner2];

// Styling
const CarouselContainer = styled.div`
    height: 500px;
    overflow: hidden;
`;

const Animations = styled.div`
    .carousel-enter {
        transform: translate(100%);
    }
    .carousel-enter.carousel-enter-active {
        transform: translate(0%);
        transition: transform 500ms ease-in-out;
    }
    .carousel-leave {
        transform: translate(0%);
    }
    .carousel-leave.carousel-leave-active {
        transform: translate(-100%);
        transition: transform 500ms ease-in-out;
    }

`;


class Carousel extends Component {
	constructor(props){
        super(props);
        
        this.state = {
            currentImageIndex: 0
        };

        this.setSlide = this.setSlide.bind(this);
    }
    
    /* Sets the current slide based on index */
    setSlide (index) {
        // checks if the slide index goes out of bounds
        const lastIndex = imgUrls.length - 1;
        const firstIndex = 0;
        if (index > lastIndex) {
            index = firstIndex;
        } 
        else if (index < firstIndex) {
            index = lastIndex;
        }

        this.setState({
            currentImageIndex: index
        });

    }

    /* As soon as it mounts, start a timer which changes slides periodically */
    componentDidMount() {
        setInterval(
            function() {
                var { currentImageIndex } = this.state;
                this.setSlide(currentImageIndex + 1)
            }
            .bind(this),
            4000);
    }
    
	render(){
		return (
			<CarouselContainer>
                <Animations>
                <CSSTransitionGroup
                    transitionName="carousel"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    component="div"
                    transitionAppear={true} 
                    transitionAppearTimeout={1000}>
                    
                    {/*Possibly a new component for this later <BackgroundImage page={page} key={page} />*/}
                    <img src={imgUrls[this.state.currentImageIndex]} alt={imgUrls[this.state.currentImageIndex]} key={imgUrls[this.state.currentImageIndex]} />
                    
                </CSSTransitionGroup>
                </Animations>
                {/*<img src={imgUrls[this.state.currentImageIndex]} alt={imgUrls[this.state.currentImageIndex]} />*/}

                {/* TODO: complete carousel navigation */}
            </CarouselContainer>
		);
	}
}

export default Carousel;