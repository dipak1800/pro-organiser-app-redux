import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "../src/Pages/Homepage/Homepage";
import CreateBoardPage from "../src/Pages/CreateBoard Page/CreateBoardPage";
import SignIn_SignUp_page from "../src/Pages/SignIn-SignUp-Page/SignIn_SignUp";
import IndividualBoardPage from "./Pages/IndividualBoardPage/IndividualBoardPage";
function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  // let unSubscribeFromAuth = null;
  // useEffect(() => {
  //   unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //     // setCurrentUser(user);
  //     // createUserProfileDocument(user);
  //     // console.log(user);
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);
  //       userRef.onSnapshot(snapShot => {
  //         // console.log(snapShot.data());
  //         setCurrentUser({ id: snapShot.id, ...snapShot.data() });
  //       });
  //     } else {
  //       setCurrentUser(userAuth);
  //     }
  //   });
  //   return () => {
  //     console.log("it works as component will unmount.");
  //     unSubscribeFromAuth(); //it will close the subscription
  //   };
  // }, []);
  // console.log(currentUser);
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact strict component={Homepage} />
          <Route path="/createboard" exact component={CreateBoardPage} />
          <Route path="/signup" exact component={SignIn_SignUp_page} />
          <Route path="/:boardName" component={IndividualBoardPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
