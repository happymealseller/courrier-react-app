import { PartyAddress } from "./PartyAddress";
import { SortingWarehouseAddress } from "./SortingWarehouseAddress";

export type {TripDetail};
export {Route};

enum Route {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND"
}

interface TripDetail {
    tripId: string; 
    tripDate: string; 
    sortingWarehouse: SortingWarehouseAddress;
    partyAddress: PartyAddress; 
    tripStatus: string;
    route: Route;
  }