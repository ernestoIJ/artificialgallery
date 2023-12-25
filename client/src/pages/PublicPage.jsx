import { NavBar } from "../components";
import { Link } from "react-router-dom";
import { photo1, photo2, photo3, photo4, photo5, photo6, photo7 } from "../assets";

function PublicPage() {

   const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];

  return (
    <section className="flex flex-col min-h-screen bg-gray-900">
      <NavBar />
      <div className="container mx-auto px-4 py-[100px] flex flex-col md:flex-row items-center md:justify-between align-middle">
        <div className="mb-8 md:mb-0 md:flex-1 text-white">
          <h1 className="text-2xl font-bold mb-3">Welcome to ArtificialGallery</h1>
          <p className="mb-6"><b>Discover a Fusion of Imagination and Technology:</b> ArtificialGallery is an innovative platform where the boundaries of art and artificial intelligence converge. Here, we celebrate the creative synergy between human imagination and AI capabilities, offering a unique space for artists, enthusiasts, and explorers alike.</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link to="/sign-up" className="py-2 px-4 bg-gray-900 border-2 border-[#6469ff] text-white rounded hover-effect">Sign-up</Link>
            <Link to="/sign-in" className="py-2 px-4 bg-gray-900 border-2 border-[#6469ff] text-white rounded hover-effect">Sign-in</Link>
          </div>
        </div>
        <div className="mt-2 mx-9">
          <div className="vertical-scroll-container">
            <div className="vertical-scroll-content">
               {photos.map((photo, index) => (<img key={index} src={photo} alt="logo" className="mx-auto md:ml-auto md:mr-0  md:w-96 md:h-96 object-contain"/>))}
               {photos.map((photo, index) => (<img key={index} src={photo} alt="logo" className="mx-auto md:ml-auto md:mr-0 md:w-96 md:h-96 object-contain"/>))}
            </div>
         </div>
        </div>
      </div>
    </section>
  );
}

export default PublicPage;
