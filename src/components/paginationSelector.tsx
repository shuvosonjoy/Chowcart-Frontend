import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";


type Props = {
    page: number;
    pages: number;
    onSetPage: (page: number) => void;
};
export const PaginationSelector = ({page,pages,onSetPage}:Props) => {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  return (
    <Pagination>
        <PaginationContent>
    {page!==1 &&(
                <PaginationItem>
                <PaginationPrevious href="#" onClick={()=>onSetPage(page-1)}/>
            </PaginationItem>
    )}
            {pageNumber.map((number)=>(
                <PaginationItem key = {number}>
                <PaginationLink href="#" onClick={()=>onSetPage(number)} isActive={number===page}>
                    {number}
                </PaginationLink>
                </PaginationItem>
            ))}
            {page!==pageNumber.length &&(
                <PaginationItem>
                    <PaginationNext href="#" onClick={()=>onSetPage(page+1)}/>
                </PaginationItem>
            )}
        </PaginationContent>
    </Pagination>
  )
};

