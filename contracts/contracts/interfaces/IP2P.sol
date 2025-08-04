// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IP2P {
    enum LoanState {
        Created,
        Canceled,
        Accepted,
        Repaid,
        Liquidated
    }

    struct Loan {
        address borrower;
        address lender;
        uint256 amount;
        uint256 repaymentAmount;
        uint256 nftId;
        uint256 duration;
        uint256 startTime;
        address token;
        address nft;
        LoanState state;
    }

    event LoanCreated(uint256 indexed loanId, address indexed borrower);
    event LoanCanceled(uint256 indexed loanId);
    event LoanAccepted(uint256 indexed loanId, address indexed lender);
    event LoanRepaid(uint256 indexed loanId);
    event LoanLiquidated(uint256 indexed loanId);

    function createLoan(
        uint256 _amount,
        uint256 _repaymentAmount,
        uint256 _nftId,
        uint256 _duration,
        address _token,
        address _nft
    ) external returns (uint256);

    function cancelLoan(uint256 _loanId) external;

    function acceptLoan(uint256 _loanId) external;

    function repayLoan(uint256 _loanId) external;

    function liquidateLoan(uint256 _loanId) external;

    function getLoan(uint256 _loanId) external view returns (Loan memory);
}
