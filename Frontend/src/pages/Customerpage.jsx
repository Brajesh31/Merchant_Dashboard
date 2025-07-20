import React from 'react'
import Heading from '../Components/Heading'
import NavbarCategory from '../Components/NavbarCategory'
import Banner from '../Components/Banner'
import Recommendations from '../Components/Recommendations'

export default function Home(){
    return(
    <>    
      <Heading/>
      <NavbarCategory/>
      <Banner/>
      <Recommendations/>
    </>
);
}