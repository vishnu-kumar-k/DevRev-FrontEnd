import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { UserLogin } from "./Auth/UserLogin";
import { UserSignup } from "./Auth/UserSignup";
import NavBar from "./Components/NavBar";
import { MyBooking } from "./Pages/MyBooking";
import { Booking } from "./Pages/Booking";
import { AdminLogin } from "./Auth/AdminLogin";
import Menu from "./AdminPages/Menu";
import { Flight } from "./AdminPages/Flight";
import { AddFlight } from "./AdminPages/AddFlight";
import PassengerInfo from "./Pages/PassengerInfo";
import { FlightBooking } from "./AdminPages/FlightBooking";


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<><NavBar /><Booking /></>
    },
    {
      path:"/login",
      element:<UserLogin />
    },
    {
      path:"/signup",
      element:<UserSignup />
    },
    {
      path:"/mybooking",
      element:<><NavBar /><MyBooking /></>
    },
    {
      path:"/admin/login",
      element:<AdminLogin />
    },
    {
      path:"/admin",
      element:<><Menu /><Flight /></>
    },
    {
      path:"/admin/addflight",
      element:<><Menu /><AddFlight /></>
    },
    {
      path:"/passengerinfo",
      element:<><NavBar /><PassengerInfo /></>
    },
    {
      path:"/admin/booking",
      element:<><Menu /><FlightBooking /></>
    }
  ])
  return (
    <div className="App">
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  );
}

export default App;
