import headerImg from "../assets/img/header.jpg"

function HeadingText() {
  const bgImage = {
    background: `url(${headerImg}) ,rgb(0, 0, 0 , 0.2)`, 
    backgroundSize: 'cover',
    width: '100%',
   backgroundBlendMode: 'screen',
    
    backgroundRepeat: 'no-repeat',
    
  };

  return (
    <div className="text-crisp-white  flex items-center mx-auto mt-[3rem] h-[40vh] md:aspect-ratio[2.5/1]  bg-black fontFamilies-calibra shadow-sm" style={bgImage}>
      <h1 className="font-bold opacity-70  w-full h-full ">
        CULINARY OASIS
      </h1>
      <h2 className="text-white  w-full h-full ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
    </div>
  );
}

export default HeadingText;
