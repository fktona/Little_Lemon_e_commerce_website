import headerImg from "../assets/img/header.jpg"

function HeadingText() {
  const bgImage = {
    background: `url(${headerImg}) ,rgb(0, 0, 0 , 0.2)`, 
    backgroundSize: 'cover',
    width: '100%',
   backgroundBlendMode: 'difference',
    
    backgroundRepeat: 'no-repeat',
    
  };

  return (
    <div className="text-crisp-white absolute flex items-center mx-auto h-[40vh] lg:h-[30vh]  bg-black fontFamilies-calibra shadow-sm" style={bgImage}>
      <h1 className="font-bold opacity-70 text-white w-full h-full bg-black">
        CULINARY OASIS
      </h1>
      <h2 className="text-white text-white opacity-70 w-full h-full bg-black">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
    </div>
  );
}

export default HeadingText;
