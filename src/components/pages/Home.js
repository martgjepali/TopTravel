import { useRef } from 'react';
import '../../App.css';
import Cards from '../Cards';
import Footer from '../Footer';
import HeroSection from '../HeroSection';

function Home() {
  const cardsRef = useRef(null);
  return (
    <>
      <HeroSection cardsRef={cardsRef} />
      <Cards ref={cardsRef} />
      <Footer />
    </>
  );
}

export default Home;