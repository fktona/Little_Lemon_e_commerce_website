import headerImg from "../assets/img/header.jpg"
import { useLocation } from "react-router";
function HeadingText() {
  const bgImage = {
    background: `url(${headerImg}) ,rgb(0, 0, 0 , 0.2)`, 
    backgroundSize: 'cover',
    width: '100%',
   backgroundBlendMode: 'screen',
    
    backgroundRepeat: 'no-repeat',
    
  };
  const location = useLocation();
  return (
    <div className={`text-crisp-white  flex items-center mx-auto mt-[3rem] h-[40vh]
     md:aspect-ratio[2.5/1]   shadow-sm ${location.pathname === '/cart' || location.pathname === '/profile' ? 'hidden':'flex'}`} style={bgImage}>
      
    </div>
  );
}

export default HeadingText;
