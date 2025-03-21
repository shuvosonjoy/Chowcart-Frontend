import { Link } from "react-router-dom";

type Props = {
    total:number;
    city:string;


};
export const SearchResultInfo = ({total,city}:Props) => {
    return (
        <div className=" font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
        <span>
          {total} Restaurants found in <span className="text-green-700">{city}</span> 
          <Link
            to="/"
            className="ml-2 text-sm  underline cursor-pointer text-blue-800"
          >
            Change Location
          </Link>
        </span>
       
      </div>
    );
};

export default SearchResultInfo;