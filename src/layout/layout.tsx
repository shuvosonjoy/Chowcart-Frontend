import Header  from "../components/header";
import Hero from "../components/hero"
import Footer from "../components/footer"

const Layout = ({children,showHero=false}:Props)=> {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            {showHero && <Hero/>}
            
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer/>
         
            
        </div>
    );
};

type Props={
children: React.ReactNode;
showHero?: boolean;
}

export default Layout;