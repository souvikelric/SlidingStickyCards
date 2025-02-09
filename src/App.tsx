import { useEffect } from 'react';
import './App.css'
import Sticky from './components/StickyContainer/sticky';
import Lenis from 'lenis';

function App() {

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,   // Scroll speed (in seconds)
      easing: (t) => t,  // Easing function (you can use other easing functions)
      smoothWheel: true, // Enable smooth wheel scrolling
    });

    // Animation loop for Lenis
    function animate(time: number) {
      lenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Cleanup function when the component unmounts
    return () => {
      lenis.destroy();
    };
  }, []);



  return (
            <div className="page-container">
                <div className="spacer"></div>
                <Sticky/>
                <div className="spacer"></div>
            </div>
        )
    }
  export default App
                