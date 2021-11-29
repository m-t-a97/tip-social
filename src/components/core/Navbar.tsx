import styled from "@emotion/styled";

import { WalletAccountContextType } from "src/context/blockchain/WalletAccountContextProvider";
import useWalletAccount from "src/hooks/blockchain/useWalletAccount";
import SvgTooltipIcon from "../shared/SvgTooltipIcon";

function Navbar() {
  const { account }: WalletAccountContextType = useWalletAccount();

  return (
    <StyledNav>
      <StyledTitle>{process.env.REACT_APP_NAME}</StyledTitle>

      <StyledTooltipIconContainer>
        <SvgTooltipIcon data={account} size={40} />
      </StyledTooltipIconContainer>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #0f2c67;
`;

const StyledTitle = styled.h3`
  color: white;
`;

const StyledTooltipIconContainer = styled.div`
  padding: 0.1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  background-color: #191a19;
`;

export default Navbar;
