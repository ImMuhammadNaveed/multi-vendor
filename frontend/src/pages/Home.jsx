import PopularEvents from "../components/events/PopularEvents"
import BrandigList from "../components/hero/BrandingList"
import Hero from "../components/hero/Hero"
import BestDeal from "../components/product/BestDeal"
import FeatureProducts from "../components/product/FeatureProducts"
import Sponser from "../components/sponser/Sponsers"
import Header from "../components/header/Header"
import Navbar from "../components/header/Navbar"

function Home() {
    
    return(
        <div className="bg-[#F6F6F5] pb-10">
        {/* <Header/> */}
        <Hero/>
        <BrandigList/>
        <BestDeal/>
        <PopularEvents/>
        <FeatureProducts/>
        <Sponser/>
        </div>
    )
}



export default Home