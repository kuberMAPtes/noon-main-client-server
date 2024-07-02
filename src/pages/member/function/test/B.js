import React, { useEffect } from 'react';
import { Link, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const B = () => {
  useEffect(() => {
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element);
    });

    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const scrollTo = () => {
    scroll.scrollTo(100); // Scrolling to 100px from the top of the page.
  };

  const scrollMore = () => {
    scroll.scrollMore(100); // Scrolling an additional 100px from the current scroll position.
  };

  const handleSetActive = (to) => {
    console.log(to);
  };

  return (
    <div>
      <Link 
        activeClass="active" 
        to="test1" 
        spy={true} 
        smooth={true} 
        offset={50} 
        duration={500} 
        onSetActive={handleSetActive}
      >
        Test 1
      </Link>
      <br/>
      <Link to="test2" smooth={true} duration={500}>
        Test 2
      </Link>
      <br/>
      <Link to="anchor" smooth={true} duration={500}>
        Test 6 (anchor)
      </Link>
      <br/>
      <Link to="firstInsideContainer" containerId="containerElement" smooth={true} duration={500}>
        Go to first element inside container
      </Link>
      <br/>
      <Link to="secondInsideContainer" containerId="containerElement" smooth={true} duration={500}>
        Go to second element inside container
      </Link>
      <br/>

      <Element name="test1" className="element">
        test 1
      </Element>
      <Element name="test2" className="element">
        test 2
      </Element>
      <div id="anchor" className="element">
        test 6 (anchor)
      </div>

      <div className="element" id="containerElement" style={{ position: 'relative', height: '200px', overflow: 'scroll', marginBottom: '100px' }}>
        <Element name="firstInsideContainer" style={{ marginBottom: '200px' }}>
          first element inside container
        </Element>
        <Element name="secondInsideContainer" style={{ marginBottom: '200px' }}>
          second element inside container
        </Element>
      </div>

      <a onClick={scrollToTop}>To the top!</a>
      <br/>
      <a onClick={scrollToBottom}>To the bottom!</a>
      <br/>
      <a onClick={scrollTo}>Scroll to 100px from the top</a>
      <br/>
      <a onClick={scrollMore}>Scroll 100px more from the current position!</a>
    </div>
  );
};

export default B;
