import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import topImage from './assets/images/background3-01.jpg';
import backgroundImage from './assets/images/background5-01.jpg';
import flagImage from './assets/images/PenangFlag.png';
import headerLogo from './assets/images/HeaderLogo.png';

import food1 from './assets/images/Images CAT/Images CAT/Food/char kuey teow.jpg';
import food2 from './assets/images/Images CAT/Images CAT/Food/hokkien mee.jpg';
import food3 from './assets/images/Images CAT/Images CAT/Food/laksa penang.jpg';
import food4 from './assets/images/Images CAT/Images CAT/Food/pasembur.jpg';
import food5 from './assets/images/Images CAT/Images CAT/Food/nasikandar.jpg';


import escape from './assets/images/places/ESCAPEPENANG.png';
import street from './assets/images/places/STREETART.png';
import penanghill from './assets/images/places/PENANGHILL.png';
import kekloksi from './assets/images/places/KEKLOKSI.png';
import batu from './assets/images/places/BATUFERRINGHI.png';



import hotel1 from './assets/images/Images CAT/Images CAT/Hotels/ascott.jpg';
import hotel2 from './assets/images/Images CAT/Images CAT/Hotels/eastin.jpg';
import hotel3 from './assets/images/Images CAT/Images CAT/Hotels/eno.jpg';
import hotel4 from './assets/images/Images CAT/Images CAT/Hotels/lexis.jpg';
import hotel5 from './assets/images/Images CAT/Images CAT/Hotels/hompton.jpg';

import facebookIcon from './assets/images/icon/facebook-icon.png';
import twitterIcon from './assets/images/icon/twitter-icon.png';
import instagramIcon from './assets/images/icon/instagram-icon.jpeg';

function StarRating({ rating }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Adjust `isMobile` when the window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Center stars horizontally
        alignItems: 'center', // Center stars vertically if needed
        marginBottom: '10px',
        flexDirection: 'row', // Keep stars in a row
      }}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          style={{
            color: index < rating ? '#FFD700' : '#CCCCCC', // Gold for filled stars, grey for empty
            fontSize: isMobile ? '10px' : '20px', // Smaller stars on mobile
            marginRight: '5px', // Default margin between stars
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}


const App = () => {

  const [apiHost, setApiHost] = useState('');
  const [error, setError] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  // References for the sections
  const homesection = useRef(null);
  const foodsection = useRef(null);
  const placesection = useRef(null);
  const hotelsection = useRef(null);
  const contactsection = useRef(null);

  const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/test') // Ensure this URL matches your Node.js endpoint
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error('Error:', error));
    }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = getStyles(isMobile);

  const openPopup = (popupId) => {
    if (isPopupVisible !== popupId) {
      setPopupVisible(popupId);
    }
  };

  const closePopup = () => {
    if (isPopupVisible !== null) {
      setPopupVisible(null);
    }
  };

  // Function to scroll to a specific section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {

    fetch('http://localhost:5000/api/config')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setApiHost(data.apiHost);
        console.log('Connected to the API', data);  // Log the response
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching data:', error);  // Log the error
      });

    const handleScroll = () => {
      const maxScroll = 300; // Maximum scroll distance for fading
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(1 - scrollPosition / maxScroll, 0);
      setOpacity(newOpacity);

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (
    <div style={styles.pageContainer}>
      {/* Header Bar */}
      <header style={styles.headerBar}>
        <img src={headerLogo} alt="Header Logo" style={styles.headerIMG} />
        
          <nav style={styles.nav}>
            <a href="#home" onClick={() => scrollToSection(homesection)} style={styles.navLink}>Home</a>
            <a href="#foods" onClick={() => scrollToSection(foodsection)} style={styles.navLink}>Foods</a>
            <a href="#places"  onClick={() => scrollToSection(placesection)} style={styles.navLink}>Places</a>
            <a href="#hotels" onClick={() => scrollToSection(hotelsection)} style={styles.navLink}>Hotels</a>
            <a href="#contact" onClick={() => scrollToSection(contactsection)} style={styles.navLink}>Contact</a>
          </nav>
      </header>

      {/*check react and node connection*/}
      
      {/*<div>
            <h1>React and Node.js Connection Test</h1>
            <p>{message}</p>
      </div>*/}

      {/* Main Content */}
      <div ref={homesection} style={styles.imageContainerTop}>
        <img src={topImage} alt="Penang" style={styles.image} />
      </div>
      <div style={styles.content}>
        
        <img src={flagImage} alt="Penang Flag" style={styles.flag} />
        <h1 style={styles.title}>Explore the Beauty of Penang</h1>
        <p style={styles.text}>
          Penang is known for its stunning landscapes, rich cultural heritage, and mouthwatering street food.
          Explore the best of this beautiful island with us. Scroll down to see more!
          <div ref={foodsection} style={styles.spacing}> </div>
        </p>
      </div>


        <h2 style={styles.sectionTitle}>Penang Cuisine</h2>
        <p style={styles.text}>
          Indulge in the rich flavors and vibrant street food culture of Penang, where every bite tells a story of tradition and taste!
        </p>
        <div
                  style={styles.imageContainer}
                >
                  <div>
                    <img
                      style={styles.contentBackground}
                      src={food1}
                      alt="Charkueyteow"
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
                      onClick={() => openPopup('charkuey')}
                    />
                    
                    {isPopupVisible == 'charkuey' && (
                      <div style={styles.popupOverlay} onClick={closePopup}>
                        <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                          <h2>Char Kuey Teow</h2>
                          <p>Char Kuey Teow is a famous Hokkien hawker dish originated in Penang island of Malaysia 
                          where many Hokkien people reside. Char Kuey Teow is Hokkien words for the dish (in 
                          Hokkien dialect) – “char” means fry, “Kway” means cake and “Teow” means thread. It is 
                          said that at its core, a good char kway teow can be judged by its ‘wok hei’ or breath of 
                          the wok. This can be recognised as a slightly sweet, charred taste brought about by 
                          cooking just the right portion over just the right temperature. Furthermore, the greens 
                          and bean sprouts gives off a fresh, crunchy texture that makes the dish taste even more 
                          unique from other dishes of the cuisine. 
                          </p>
                          
                          <h3>Our Suggestion</h3>
                          <div
                            style={styles.suggestionContainer}>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/57zLxX8dAHoZ2G8x7" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Koey Teow Kerang Taiping Famous
                              <StarRating rating={5} />
                            </a></div>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/KkdHKW33BZuMNscg8" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Sany - Lis Char Kuey Teow <StarRating rating={4} />
                            </a>
                            </div>
                          </div>
                          
                          <button style={styles.closeButton} onClick={closePopup}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>
                  
                  <div>
                    <img
                      style={styles.contentBackground}
                      src={food2}
                      alt="Hokien"
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
                      onClick={() => openPopup('hokkienmee')}
                    />
                    
                    {isPopupVisible == 'hokkienmee' && (
                      <div style={styles.popupOverlay} onClick={closePopup}>
                        <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                          <h2>Hokkien Mee</h2>
                          <p>As the name of the dish alludes, Hokkien mee of Penang is a dish of the Hokkien 
                          community. By the way, Hokkien mee in Kuala Lumpur and Singapore refer to completely 
                          different dishes. In Kuala Lumpur, Hokkien mee is thick noodles stir fried in dark soy 
                          sauce with lard, prawn, squid, pork liver, and cabbage resulting in a dark colour dish. In 
                          Singapore, Hokkien mee is a noodle dish fried in seafood and pork stock with prawn, 
                          pork belly slices, squid, and eggs. It is a yellowish looking dish from the yellow noodles 
                          and pale stock. Only in Penang is Hokkien noodle a soupy dish. It is a noodle dish in a 
                          soup made by boiling fried prawn heads and stock bones. Prawns and pork slices are the 
                          basic garnishes with other options like pig intestine, prawn balls, char siew (roast pork), 
                          duck blood, etc. Additional sambal chili is usually provided in a spoon for those who 
                          want a further umami spicy boost to their Hokkien mee. </p>

                          <h3>Our Suggestion</h3>
                          
                          <div
                            style={styles.suggestionContainer}>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/sTfe63PGrbFDVaVq8" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Aimi Lim Halal Hokkien Mee
                              <StarRating rating={5} />
                            </a></div>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/UqgxR2s63qRm367x5" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              木通福建面 Hokkien Mee<StarRating rating={4} />
                            </a>
                            </div>
                          </div>
                          
                          <button style={styles.closeButton} onClick={closePopup}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>
                  <div>
                    <img
                      style={styles.contentBackground}
                      src={food5}
                      alt="Nasi Kandar"
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
                      onClick={() => openPopup('nasikandar')}
                    />
                    
                    {isPopupVisible == 'nasikandar'&& (
                      <div style={styles.popupOverlay} onClick={closePopup}>
                        <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                          <h2>Nasi Kandar</h2>
                          <p>Nasi kandar is a meal of steamed rice which can either be plain or mildly flavoured and 
                          served with a variety of curries and side dishes. The rice is usually topped with eggs, 
                          meats and vegetables. The selection has since expanded to include fish roe, okra, quails 
                          prepared in herbs and spices, sambal udang, ayam goreng, cabbage, lamb and mutton. 
                          After that the curry sauces is poured over the rice and you can either request for a larger 
                          amount of sauce, and this is known 'banjir' (flooding) or you can ask for it to be served 
                          separately. Either way this helps open up a palette of flavours thus giving you a happy 
                          eating experience.</p>

                          <h3>Our Suggestion</h3>
                          
                          <div
                            style={styles.suggestionContainer}>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/W3YDucN2ZhwtyND58" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Nasi Kandar Sulaiman
                              <StarRating rating={5} />
                            </a></div>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/BqBTSCpYoEF1RwkX9" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Deens Maju Nasi Kandar <StarRating rating={5} />
                            </a>
                            </div>
                          </div>
                          
                          <button style={styles.closeButton} onClick={closePopup}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>

                  <div>
                    <img
                      style={styles.contentBackground}
                      src={food4}
                      alt="Pasembur"
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
                      onClick={() => openPopup('pasembur')}
                    />
                    
                    {isPopupVisible =='pasembur' && (
                      <div style={styles.popupOverlay} onClick={closePopup}>
                        <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                          <h2>Pasembur</h2>
                          <p>Pasembur has its origins in Penang, Malaysia. This salad is also known as Rojak Mamak, 
                          which means “mixed salad” in Malay. Pasembur was first created by the Indian Muslim 
                          community in Penang, who were known as Mamak. They combined various ingredients 
                          to create a tasty snack that was affordable and filling. The ingredients used in Pasembur 
                          vary depending on the region and the personal preference of the cook. The salad 
                          typically includes shredded vegetables such as cucumber, carrot, turnip, and bean 
                          sprouts. It also includes various seafood such as prawns, squid, and crab meat. The dish 
                          is topped with crispy fried dough fritters known as “keropok”, as well as boiled eggs and 
                          tofu. Pasembur’s unique taste comes from the spicy peanut sauce, which is made from 
                          ground peanuts, chillies, and tamarind.</p>
                          
                          <h3>Our Suggestion</h3>
                          
                          <div
                            style={styles.suggestionContainer}>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/ri7mStNDmYPF7TFi9" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              GANI Famous Pasembur
                              <StarRating rating={4} />
                            </a></div>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/moZkCoWJmBxZfern7" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Pasembur King (Hussain) <StarRating rating={5} />
                            </a>
                            </div>
                          </div>
                          
                          <button style={styles.closeButton} onClick={closePopup}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>

                  <div>
                    <img
                      style={styles.contentBackground}
                      src={food3}
                      alt="Laksa"
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
                      onClick={() => openPopup('laksa')}
                    />
                    
                    {isPopupVisible == 'laksa' && (
                      <div style={styles.popupOverlay} onClick={closePopup}>
                        <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                          <h2>Asam Laksa</h2>
                          <p>Asam laksa is actually common in the northern Peninsular Malaysia and northern 
                          Sumatra. Depending on its place of origin, a bowl of asam laksa usually consists of 
                          smooth rice noodles, shredded mackerel, sliced vegetables such as cucumber, onions, 
                          chillies, lettuce, common mint, laksa mint and pink torch ginger, pineapple slices and a 
                          sweet prawn paste called heh ko. Asam laksa is a Peranakan noodle dish that comes with 
                          a sour fish and tamarind-based broth. It is one of the most iconic Penang dishes. </p>

                          <h3>Our Suggestion</h3>
                          <div
                            style={styles.suggestionContainer}>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/pAycS1nKZAaaiWEJA" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Laksa Kuah Pekat
                              <StarRating rating={4} />
                            </a></div>
                            <div style={styles.suggestionContainerPlace}>
                            <a 
                              href="https://maps.app.goo.gl/eGfdZPj45DZ93P2E8" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={styles.suggestionText}
                            >
                              Laksa Sungai Nibong <StarRating rating={5} />
                            </a>
                            </div>
                          </div>
                      
                          
                          <button style={styles.closeButton} onClick={closePopup}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>
                </div>

        
        <div ref={placesection} style={styles.spacing}></div>
        <h2 style={styles.sectionTitle}>Island Escapades</h2>
        <p style={styles.text}>
          Discover the beauty of Penang's stunning tourist attractions, from the historic streets of George Town to the serene beaches and lush hilltop views – a paradise waiting to be explored!
        </p>

        <div style={styles.imageContainer}>
          <img src={escape} alt="Escape" style={styles.image} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.0)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
          onClick={() => openPopup('escape')}/>

          {isPopupVisible == 'escape' && (
            <div style={styles.popupOverlay} onClick={closePopup}>
              <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h2>Escape Penang</h2>
                <p>ESCAPE is the fun destination with exciting rides and attractions. Hosted with nature in mind. 
                Located in Teluk Bahang, Penang, Malaysia, ESCAPE re-introduces outdoor play in a natural 
                environment so to give the visitor an appreciation of the world around them and shows that 
                there's no age limit to having fun. </p>

                <StarRating rating={5} />

                <a 
                  href="https://maps.app.goo.gl/ipepBGzFjGJBB59B7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}
                >
                  View Location on Map
                </a>
                
                
                <button style={styles.closeButton} onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={styles.imageContainer}>
          <img src={street} alt="Street" style={styles.image} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.0)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
          onClick={() => openPopup('street')}/>

          {isPopupVisible == 'street' && (
            <div style={styles.popupOverlay} onClick={closePopup}>
              <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h2>Penang Street Art</h2>
                <p>George Town, Penang is a cultural mashup like no other, with its striking Peranakan 
                architecture, diverse cuisine and famous Penang Street Art representing a unique mix of 
                Malay, Indian and Chinese heritage. The island of Penang, off the west coast of Malaysia, was 
                also a British colony and signs of its colonial past are evident. </p>
                
                <StarRating rating={4} />

                <a 
                  href="https://maps.app.goo.gl/4nXSX41vXQqMovxi8" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}
                >
                  View Location on Map
                </a>
              
                
                <button style={styles.closeButton} onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={styles.imageContainer}>
          <img src={penanghill} alt="Penanghill" style={styles.image} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.0)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
          onClick={() => openPopup('penanghill')}/>
          {isPopupVisible == 'penanghill' && (
            <div style={styles.popupOverlay} onClick={closePopup}>
              <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h2>Penang Hill</h2>
                <p>Penang Hill, or Bukit Bendera, is a hill resort near Penang Island's center, located 9 km west of George Town 
                  within the Air Itam suburb. Comprising multiple peaks, its highest point, Western Hill, rises 833 meters above sea level. 
                  Known for its lush greenery, Penang Hill served as a retreat during British colonial times and remains a popular 
                  tourist destination for its history and heritage. Notable peaks include Flagstaff Hill and Strawberry Hill, the latter 
                  named after a house owned by Penang's founder, Francis Light.</p>
                
                <StarRating rating={4} />

                <a 
                  href="https://maps.app.goo.gl/yjZDiWeABJKyrA9k6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}
                >
                  View Location on Map
                </a>
                
                
                <button style={styles.closeButton} onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={styles.imageContainer}>
          <img src={kekloksi} alt="Kekloksi" style={styles.image} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.0)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
          onClick={() => openPopup('kekloksi')}/>

          {isPopupVisible == 'kekloksi' && (
            <div style={styles.popupOverlay} onClick={closePopup}>
              <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h2>Kek Lok Si Temple</h2>
                <p>
                Kek Lok Si Temple, in Air Itam, Penang, is Malaysia's largest Buddhist temple and a key cultural landmark. Established in 1891, 
                it blends Chinese, Thai, and Burmese architectural styles, symbolizing Buddhist unity. Highlights include the seven-story 
                Pagoda of Rama VI, featuring ten thousand Buddha statues, and a 36.5-meter-tall statue of Kuan Yin, the Goddess of Mercy, 
                surrounded by serene gardens. A hub for worship and tourism, the temple offers stunning views of Penang Island and hosts 
                vibrant celebrations during Chinese New Year and Wesak Day.</p>

                <StarRating rating={4} />
                
                <a 
                  href="https://maps.app.goo.gl/hJxpHG2zqgANR1Q8A" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}
                >
                  View Location on Map
                </a>
                
                
                <button style={styles.closeButton} onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={styles.imageContainer}>
          <img src={batu} alt="Batu" style={styles.image} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.0)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(0.95)'}
          onClick={() => openPopup('batu')}/>

          {isPopupVisible == 'batu' && (
            <div style={styles.popupOverlay} onClick={closePopup}>
              <div style={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h2>Batu Ferringhi</h2>
                <p>Batu Ferringhi, located along the northern coast of Penang Island, is a vibrant beach destination known for its golden sands, 
                  sparkling blue waters, and bustling nightlife. Popular among locals and tourists alike, it offers a wide array of activities, 
                  from water sports like parasailing and jet-skiing to tranquil beachfront relaxation. The area is also renowned for its lively night market, 
                  where visitors can shop for souvenirs, handicrafts, and enjoy a variety of local street food. With a mix of luxury resorts, casual eateries, 
                  and stunning ocean views, Batu Ferringhi is a perfect getaway for leisure, adventure, and an authentic taste of Penang's coastal charm.</p>
                
                <StarRating rating={4} />

                <a 
                  href="https://maps.app.goo.gl/GUxNfoWmaSmupfCT9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}
                >
                  View Location on Map
                </a>
                
                
                <button style={styles.closeButton} onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        
        
        <div ref={hotelsection} style={styles.spacing}></div>
        <h2 style={styles.sectionTitle}>Cozy Getaways</h2>
        <p style={styles.text}>
          Experience comfort and luxury at Penang’s finest hotels, where breathtaking views, exceptional service, and unforgettable stays await you!
        </p>
        
        <div style={styles.imageContainer}>
          <div
            style={{
              ...styles.imageContainer3,
              position: 'relative',
              justifyContent: 'center',
            }}
            onClick={() => (window.location.href = 'https://ascottgurney.my-penang.com')}
          >
            <img
              style={{
                ...styles.contentBackground3,
                transition: 'transform 0.3s ease', // Smooth scaling transition
              }}
              src={hotel1}
              alt="Explore More"
            />
            <div
              style={styles.hotelText}
            >
              Ascott Gurney Penang
              <StarRating rating={5} />
            </div>
          </div>

          <div
            style={{
              ...styles.imageContainer3,
              position: 'relative',
              justifyContent: 'center',
            }}
            onClick={() => (window.location.href = 'https://www.lexissuitespenang.com')}
          >
            <img
              style={{
                ...styles.contentBackground3,
                transition: 'transform 0.3s ease', // Smooth scaling transition
              }}
              src={hotel4}
              alt="Explore More"
            />
            <div
              style={styles.hotelText}
            >
              Lexis Suites Penang
              <StarRating rating={4} />
             
            </div>
          </div>

          <div
            style={{
              ...styles.imageContainer3,
              position: 'relative',
              justifyContent: 'center',
            }}
            onClick={() => (window.location.href = 'https://penang.eastin.com/?gad_source=1&gclid=Cj0KCQiA4fi7BhC5ARIsAEV1YiaMKPTe6lu-bJT0j3ZLCe08Tcn1cehNMDZahd-S14neLAsWjV_wlD0aAu0NEALw_wcB')}
          >
            <img
              style={{
                ...styles.contentBackground3,
                transition: 'transform 0.3s ease', // Smooth scaling transition
              }}
              src={hotel2}
              alt="Explore More"
            />
            <div
              style={styles.hotelText}
            >
              Eastin Hotel Penang
              <StarRating rating={4} />
            </div>
          </div>

          <div
            style={{
              ...styles.imageContainer3,
              position: 'relative',
              justifyContent: 'center',
            }}
            onClick={() => (window.location.href = 'https://www.eohotels.com/offers/?gad_source=1&gclid=Cj0KCQiA4fi7BhC5ARIsAEV1YiZJsL-190Nn3OK9vuXo7dVf2Q5FBCuwPcdPoYVvS4ZOzE0wR6b7b8IaAkCHEALw_wcB')}
          >
            <img
              style={{
                ...styles.contentBackground3,
                transition: 'transform 0.3s ease', // Smooth scaling transition
              }}
              src={hotel3}
              alt="Explore More"
            />
            <div
              style={styles.hotelText}
            >
              Eastern & Oriental 
              <StarRating rating={5} />
            </div>
          </div>

          <div
            style={styles.imageContainer3}
            onClick={() => (window.location.href = 'https://homptonhotel.com')}
          >
            <img
              style={{
                ...styles.contentBackground3,
                transition: 'transform 0.3s ease', // Smooth scaling transition
              }}
              src={hotel5}
              alt="Explore More"
            />
            <div
              style={styles.hotelText}
            >
              Hompton Penang
              <StarRating rating={5} />
            </div>
          </div>

      </div>

      
      <div ref={contactsection} style={styles.spacing}></div>
      <footer style={styles.footer}>
        <div style={styles.container}>
          {/* About Us Section */}
          <div style={styles.section}>
            <img src={headerLogo} style={styles.footerIMG} alt="Background Image" />
          </div>

          {/* Quick Links Section */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Quick Links</h3>
            <nav aria-label="Quick Links">
              <ul style={styles.list}>
                {[
                  { name: "Home", href: "/home"},
                ].map((link, index) => (
                  <li key={index} style={styles.listItem}>
                    <a href={link.href} style={styles.link}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Follow Us Section */}
          <div style={styles.section}>
            <h3 style={styles.heading}>Follow Us</h3>
            <address style={{ display: "flex", gap: '10px' }} aria-label="Social Media Links">
              {[
                { name: "Facebook", href: "https://facebook.com", icon: facebookIcon },
                { name: "Twitter", href: "https://twitter.com", icon: twitterIcon },
                { name: "Instagram", href: "https://www.instagram.com/travel_jompenang?igsh=bTBiaXI4ZncxcGw3", icon: instagramIcon },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.icon}
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    style={styles.iconImage}
                  />
                </a>
              ))}
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.bottomText}>
            &copy; {new Date().getFullYear()} Travel Jom! All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const getStyles = (isMobile) => ({
  spacing: {
    marginBottom: isMobile ? '50px' : '100px',
  },
  pageContainer: {
    backgroundColor: '#fff',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
    color: '#333',
    width: 'auto',
    height: 'auto',
    overflow: 'auto',
  },
  headerBar: {
    width: isMobile ? '100%' : 'calc(100% - 360px)', // Full width on mobile
    height: isMobile ? '25px' : '80px',             // Consistent height
    position: 'fixed',          // Fixed to viewport
    top: isMobile ? '5px' : '10px',  // Reduced top space for mobile
    zIndex: 1000,               // Ensure it stays above other elements
    display: 'flex',            // Flex container
    justifyContent: 'space-between', // Space between items
    alignItems: 'center',       // Center items vertically
    margin: isMobile ? '0 0px' : '0 180px', // Adjust margins for mobile
    padding: '0 20px',          // Internal padding for content spacing
    boxSizing: 'border-box',    // Include padding in size calculation
    backgroundColor: '#f7fff7', // Background color
    borderRadius: '15px',       // Rounded corners
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  headerIMG: {
    width: isMobile ? '75px' : '150px',            // Conditional width based on mobile
    height: 'auto',
    marginTop: isMobile ? '10px' : '20px',          // Adjust marginTop for mobile
    marginBottom: isMobile ? '5px' : '10px',        // Adjust marginBottom for mobile
    transition: 'width 0.3s ease, margin 0.3s ease', // Smooth transitions for width and margins
  },
  nav: {
    display: 'flex',
    gap: '15px',
    listStyle: 'none',
    padding: 0,
    flexDirection:'row', 
    alignItems:'flex-start', 
  },

  navLink: {
    textDecoration: 'none',
    fontFamily: '"Montserrat", sans-serif',
    color: '#fb5607',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(255, 229, 157, 0.5)',
    fontSize: isMobile ? '7px' : '15px', // Smaller font size on mobile
    transition: 'color 0.3s',
    margin: 'auto',
  },

  imageContainerTop: {
    gap: '5px',
    width: isMobile ? '100%' : 'auto', // Full width on mobile
    height: 'auto',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
  },
  imageContainer: {
    gap: '5px',
    width: isMobile ? '100%' : 'auto', // Full width on mobile
    height: 'auto',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
    padding: isMobile ? '0 0px' : '0 200px', // Adjust padding based on screen size

  },

  imageContainer3: {
    width: '100%',              // Allow full width for responsiveness
    height: 'auto',
    borderRadius: '15px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    position: 'relative',
  },
  hotelText: {
    position: 'absolute',
    bottom: isMobile ? '5px' : '20px', // Adjust bottom spacing for smaller screens
    left: '50%',  // Adjust left spacing for smaller screens
    color: '#fff',
    fontSize: isMobile ? '5px' : '15px', // Use slightly larger font for readability
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)', // Keep the shadow for readability
    transition: 'transform 0.3s, filter 0.3s',
  
    // Responsive alignment
    whiteSpace: 'nowrap', // Prevent text wrapping
    overflow: 'hidden',   // Hide overflow text
    textAlign: 'center',    


    transform: 'translateX(-50%)', // Adjust for centering

  },
  
  image: {
    width: '100%',                // Ensure the image spans the full width of its container
    height: 'auto',               // Maintain aspect ratio
    objectFit: 'cover',           // Ensure the image covers the container without distortion
    transition: 'transform 0.3s ease', // Smooth transition for transforms
    maxWidth: isMobile ? '100%' : 'auto', // Ensure full width on mobile, maintain default on desktop
  },
  flag: {
    width: isMobile ? '150px' : '300px',         // Smaller width on mobile
    height: 'auto',                               // Maintain aspect ratio
    marginTop: isMobile ? '100px' : '200px',     // Reduce top margin on mobile
    marginBottom: isMobile ? '10px' : '20px',    // Reduce bottom margin on mobile
    transition: 'width 0.3s ease, margin 0.3s ease', // Smooth transition for width and margins
  },
  content: {
    textAlign: 'center',  
    marginBottom: isMobile ? '10px' : '20px', // Reduce bottom margin on mobile for better spacing
    transition: 'opacity 1.0s ease',           // Smooth opacity transition
  },
  title: {
    fontSize: isMobile ? '24px' : '50px',           // Smaller font size for mobile
    fontFamily: '"Montserrat", sans-serif',
    textAlign: 'center',                            // Keep text centered on both mobile and desktop
    marginBottom: isMobile ? '10px' : '20px',       // Reduce bottom margin on mobile for better space usage
    textShadow: '2px 2px 4px rgba(199, 199, 199, 0.5)', // Add subtle shadow
    color: '#1D3557',
    transition: 'font-size 0.3s ease, margin 0.3s ease', // Smooth transition for font size and margin
  },
  sectionTitle: {
    fontSize: isMobile ? '25px' : '40px',           // Smaller font size for mobile
    fontFamily: '"Montserrat", sans-serif',
    textAlign: isMobile ? 'center' : 'left',        // Center-align text on mobile, left-align on larger screens
    marginTop: isMobile ? '20px' : '50px',          // Reduce top margin on mobile
    marginBottom: isMobile ? '15px' : '30px',       // Reduce bottom margin on mobile
    padding: isMobile ? '0px 20px' : '0px 200px',   // Reduce padding on mobile for better layout
    color: '#1D3557',
    textShadow: '2px 2px 4px rgba(199, 199, 199, 0.5)', // Subtle text shadow for depth
    transition: 'font-size 0.3s ease, margin 0.3s ease, padding 0.3s ease', // Smooth transitions for font size, margin, and padding
  },
  popupOverlay: {
    position: 'fixed',                     // Fixed positioning to cover the viewport
    top: 0,                                // Position it at the top of the screen
    left: 0,                               // Position it at the left of the screen
    width: '100%',                         // Cover full width of the viewport
    height: '100%',                        // Cover full height of the viewport
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',                       // Use flexbox to center content
    justifyContent: 'center',              // Center the content horizontally
    alignItems: 'center',                  // Center the content vertically
    zIndex: 1000,                          // Ensure it stays on top of other content
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  },
  popupContent: {
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: "#fff",                 // White background for the popup content
    padding: isMobile ? '15px' : '20px',      // Adjust padding for mobile to save space
    borderRadius: '10px',                     // Rounded corners for a modern look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    textAlign: 'center',                      // Center align the text
    maxWidth: isMobile ? '90%' : '1000px',    // Limit width on mobile, full width on desktop
    width: 'auto',                            // Allow content width to adjust automatically
    height: 'auto',                           // Allow content height to adjust automatically
    transition: 'padding 0.3s ease, max-width 0.3s ease', // Smooth transition for padding and max-width
  },
  closeButton: {
    fontFamily: '"Montserrat", sans-serif',
    marginTop: isMobile ? '5px' : '10px',          // Reduce top margin on mobile for a more compact layout
    padding: isMobile ? '8px 16px' : '10px 20px',   // Reduce padding on mobile for a more compact button
    cursor: 'pointer',
    backgroundColor: '#ff006e',                     // Bright pink background color for the button
    color: '#fff',                                  // White text color
    border: 'none',
    borderRadius: '5px',                            // Rounded corners for a modern look
    transition: 'background-color 0.3s ease',        // Smooth transition for background color
  },
  
  contentBackground: {
    width: isMobile ? '60px' : '200px',          // Reduce width on mobile for a more compact layout
    height: 'auto',                               // Maintain auto height to adjust based on content
    backgroundColor: '#fff',                      // White background for content
    objectFit: 'cover',                           // Ensure image or content fits well within the container
    borderRadius: isMobile ? '10px' : '15px',     // Slightly reduce border-radius for mobile to maintain proportions
    transition: 'transform 0.3s, filter 0.3s',     // Smooth transition for transformations and filter effects
    position: 'relative',                         // Ensure positioning relative for inner elements
  },
  contentBackground3: {
    width: isMobile ? '60px' : '200px', // Full width for responsive design
    height: 'auto', // Height adjusts based on content
    objectFit: 'cover', // Ensures content is covered within the container
    borderRadius: isMobile ? '10px' : '15px', // Adjust border radius for mobile devices
    position: 'relative', // Keep relative positioning for inner elements
    transition: 'transform 0.3s, filter 0.3s', // Smooth transition for transformations and filters
  
    // Flexbox for alignment
    display: 'flex',
    justifyContent: 'center', // Center items horizontally
    alignItems: 'flex-end', // Align items at the bottom
  },
  
  
  
  
  footerIMG: {
    width: isMobile ? '150px' : '200px',    // Adjust image size for mobile
    height: 'auto',
  },

  footer: {
    backgroundColor: '#f7fff7',
    color: '#000',
    padding: isMobile ? '20px 10px' : '50px 200px', // Adjust padding for mobile
    marginTop: '50px',
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 'auto',
    margin: '0 auto',
    flexWrap: 'wrap',
  },

  section: {
    flex: '1 1 300px',
    margin: isMobile ? '10px' : '10px 20px', // Adjust margin on mobile
  },

  suggestionContainer: {
    display: 'flex',
    justifyContent: 'center', // Centers the box horizontally
    alignItems: 'center', // Centers the box vertically (if the parent container has height)
    width: isMobile ? '300px': '700px',
    height: isMobile ? '100px': 'auto',
    backgroundColor: '#8338ec',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    margin: '0 auto', // Centers the box horizontally with automatic left and right margins
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
    gap: '5px',

  },

  suggestionContainerPlace: {
    width: '100%',
    maxWidth: '400px', // Limit the width to prevent the container from becoming too wide on large screens
    height: isMobile ? '50px' : 'auto', // Use dynamic height for mobile and auto for larger screens
    backgroundColor: '#fff',
    padding: isMobile ? '10px' : '20px', // Less padding on smaller screens
    margin: '30px auto', // Center the container and provide vertical spacing
    boxSizing: 'border-box', // Ensure padding does not affect width calculations
    borderRadius: '8px', // Optional rounded corners for a modern look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth

    // Flexbox for centering content
    display: 'flex', 
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically
    flexDirection: 'column',  // Stack the items vertically (can be changed based on layout)
  },

  suggestionText: {
    fontSize: isMobile ? '10px' : '15px',
    textDecoration: 'none',
    color: '#000',
    display: 'block', // This is fine for block-level elements
    marginBottom: '10px',
    
    // Centering the text
    textAlign: 'center', // Horizontally centers the text
    margin: '0 auto', // Ensure the element is centered if it has a width
  },

  heading: {
    color: '#000',
    fontSize: isMobile ? '16px' : '18px',    // Adjust heading font size for mobile
    marginBottom: '10px',
  },

  text: {
    color: '#000',
    fontSize: isMobile ? '15px' : '20px',    // Adjust text size for mobile
    fontFamily: '"Montserrat", sans-serif',
    textAlign: 'center',  
    lineHeight: '1.5',
    padding: isMobile ? '0 10px' : '0 200px', // Adjust padding for mobile
  },

  list: {
    listStyle: 'none',
    padding: 0,
  },

  listItem: {
    marginBottom: '8px',
  },

  link: {
    color: '#000',
    textDecoration: 'none',
    fontSize: isMobile ? '12px' : '14px',  // Adjust font size for mobile links
    transition: 'color 0.3s',
  },

  linkHover: {
    color: '#00bcd4',
  },

  socialIcons: {
    display: 'flex',
    gap: '10px',
  },

  icon: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
  },

  iconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  bottomBar: {
    textAlign: 'center',
    marginTop: '20px',
    borderTop: '1px solid #555',
    paddingTop: '10px',
  },

  bottomText: {
    color: '#000',
    fontSize: isMobile ? '10px' : '12px',    // Adjust text size for bottom text on mobile
    fontFamily: '"Montserrat", sans-serif',
  },
});

  


export default App;
