import landingpage from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'

const Homepage = ()=>{
    return(
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-8 text-center -mt-17">
            <h1 className="font-bold text-5xl tracking-tight text-blue-900">Needs to Update</h1>
            <span className="text-xl"> need to update this also</span>
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