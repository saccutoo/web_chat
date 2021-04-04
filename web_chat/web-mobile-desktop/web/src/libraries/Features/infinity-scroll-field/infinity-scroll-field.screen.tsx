import SkeletonNavbarDetailScreen from "../skeleton-navbar-detail/skeleton-navbar-detail.screen";
import InfiniteScrollFieldAdapter from "./infinity-scroll-field.adapter";
import { IInfiniteScrollField } from "./infinity-scroll-field.props";

function InfiniteScrollFieldScreen(props : IInfiniteScrollField) {
    const { child , iconpanel , length , totalPages , className , page , setPage , isUpdating } = props;

    const {
        listRef,
        handleScroll
    } = InfiniteScrollFieldAdapter({page , setPage , isUpdating , totalPages})


    return (
        <div className={ className } onScroll={ handleScroll } ref={ listRef }>
            <div className="full-width">
                {
                    child    
                } 
                {
                    (page < totalPages) && (
                        <>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                        </>
                    )
                }  
                {
                    (length === 0) && (
                        <>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                            <SkeletonNavbarDetailScreen iconpanel={ iconpanel }></SkeletonNavbarDetailScreen>
                        </>
                    )
                }  
            </div>
 
        </div>
    )
}

export default InfiniteScrollFieldScreen;