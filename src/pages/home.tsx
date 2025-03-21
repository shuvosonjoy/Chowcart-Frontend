import landingpage from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'
import SearchBar, { SearchForm } from '../components/searchBar'
import {  useNavigate } from 'react-router-dom'
const Homepage = ()=>{
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues:SearchForm)=>{
     
        navigate({
            pathname:`/search/${searchFormValues.searchQuery}`
        })

    }
    
    return(
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-8 text-center -mt-18">
            <h1 className="font-bold text-4xl md:text-5xl tracking-tight text-blue-900 p-1 md:p-0">Delicious Meals at Your Doorstep</h1>
            <span className=" -mt-4 font-bold text-gray-600 md:text-2xl text-xl"> Crave it? We deliver it!</span>
            <div className='md:mx-20 mx-3'><SearchBar placeholder='Search By City' onSubmit={handleSearchSubmit}  /></div>
            </div>


            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingpage}/>
               <div className='flex flex-col items-center justify-center gap-2'>
                <span className='font-bold text-3xl tracking-tighter'>Order Takeway Even Faster</span>
                <span>Try Our Mobile App</span>
               <img src ={appDownload}/>
               </div>
            </div>

        
            
        </div>
    )

}

export default Homepage;