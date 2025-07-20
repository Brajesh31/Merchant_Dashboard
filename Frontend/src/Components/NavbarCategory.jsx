import React from 'react';

const NavbarCategory = () => {


  return (
    <div className="bg-white-900 text-white m-0 flex" style={{overflowX:'auto',  scrollbarWidth:'thin',msScrollbarBaseColor:'aqua', scrollbarColor:'rgb(31, 29, 49) rgb(234, 211, 255)'}}>
      <nav className="bg-gray-800 text-white" >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ul className="flex justify-center space-x-8">
            <li><a href="#apparel" className="hover:text-indigo-400 transition duration-300">Apparel</a></li>
            <li><a href="#home-living" className="hover:text-indigo-400 transition duration-300">Home & Living</a></li>
            <li><a href="#health-beauty" className="hover:text-indigo-400 transition duration-300">Health & Beauty</a></li>
            <li><a href="#food-drinks" className="hover:text-indigo-400 transition duration-300">Food & Drinks</a></li>
            <li><a href="#handicrafts" className="hover:text-indigo-400 transition duration-300">Handicrafts</a></li>
            <li><a href="#electronics" className="hover:text-indigo-400 transition duration-300">Electronics</a></li>
            <li><a href="#books-media" className="hover:text-indigo-400 transition duration-300">Books & Media</a></li>
            <li><a href="#toys-games" className="hover:text-indigo-400 transition duration-300">Toys & Games</a></li>
            <li><a href="#sports-outdoors" className="hover:text-indigo-400 transition duration-300">Sports & Outdoors</a></li>
            <li><a href="#gifts-souvenirs" className="hover:text-indigo-400 transition duration-300">Gifts & Souvenirs</a></li>
            <li><a href="#ayurveda-wellness" className="hover:text-indigo-400 transition duration-300">Ayurveda & Wellness</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};


export default NavbarCategory;
