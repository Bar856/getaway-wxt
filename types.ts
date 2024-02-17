
export interface Site {
    title?: string | undefined;
    url: string;
    last?: boolean;
}

export interface CardProps {
    title: string;
    data: any;
    typeOfData: "hotels" | "flights"; 
}

export interface HotelDeal {
    id: number;
    city: string;
    hotel: string;
    price: string;
}
  
export interface FlightDeal {
    id: number;
    to: string;
    price: string;
}
export interface SiteContainerProps {
    typeOfData: "Bookmarks" | "Most Recent"
}
export interface BookmarkNode {
    id: string;
    title: string;
    url?: string; // url might not be present on folders
    children?: BookmarkNode[];
}