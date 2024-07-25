import "./App.css";
import Wallet from "./components/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPannel from "./components/DisplayPanel/DisplayPannel";
import TokenApproval from "./components/StakeToken/TokenApproval";
import StakeToken from "./components/StakeToken/StakeAmount";
import Withdraw from "./components/withdraw/WithDraw";
import ClaimReward from "./components/ClaimReward/ClaimedReward";
// import StakingContext from "./context/StakingContext";

function App() {
  return (
    <>
      <Wallet>
        <Navigation />
      
          <DisplayPannel />
          <StakeToken />
          <Withdraw />
      
          <TokenApproval />
          <ClaimReward />
      </Wallet>
    </>
  );
}

export default App;
