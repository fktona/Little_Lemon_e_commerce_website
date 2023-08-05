import headerImg from "../assets/img/header.jpg"

function HeadingText() {
  const bgImage = {
    backgroundImage: `url(${headerImg})`, 
    backgroundSize: 'cover',
    width: '100%',
    aspectRatio: '2.5/1', 
    padding: '2rem',
    backgroundRepeat: 'no-repeat',
    marginTop: '4rem',
  };

  return (
    <div className="bg-image text-crisp-white flex items-center mx-auto md:aspect-ratio-16/6 p-5 bg-subtle-brown fontFamilies-calibra shadow-sm" style={bgImage}>
      <h1 className="font-bold text-white">
        CULINARY OASIS
      </h1>
      <h2 className="text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
    </div>
  );
}

export default HeadingText;
