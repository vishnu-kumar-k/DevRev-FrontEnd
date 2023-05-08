import { atom } from "recoil";


export const Load=atom({
    key:"Load",
    default:false
})

export const User=atom({
    key:"User",
    default:{
        status:false,
        name:""
    }
})

export const Jwt=atom({
    key:"Jwt",
    default:localStorage.getItem("JWToken")
})

export const Admin=atom({
    key:"Admin",
    default:{
        status:false,
        name:""
    }
})

export const AdminJwt=atom({
    key:"AdminJwt",
    default:localStorage.getItem("AdminJWToken")
})

export const FlightId=atom({
    key:"FlightId",
    default:0
})

export const AdminFlightId=atom({
    key:"AdminFlightId",
    default:1
})