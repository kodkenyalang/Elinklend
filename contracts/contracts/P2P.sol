// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IP2P.sol";
import "./libraries/Errors.sol";
import "../contracts-utils/IERC20.sol";

contract P2P is IP2P {
    string public constant name = "P2P";

    uint256 public loanId;

    mapping(uint256 => Loan) public loans;

    mapping(uint256 => bool) public isLoanExist;

    address public feeWallet;

    constructor(address _feeWallet) {
        feeWallet = _feeWallet;
    }

    // External functions

    /**
     * @inheritdoc IP2P
     */
    function createLoan(
        uint256 _amount,
        uint256 _repaymentAmount,
        uint256 _nftId,
        uint256 _duration,
        address _token,
        address _nft
    ) external override returns (uint256) {
        if (_amount == 0) revert ZeroAmount();
        if (_repaymentAmount <= _amount) revert InvalidRepaymentAmount();
        if (isLoanExist[loanId]) revert LoanAlreadyExist();

        // Transfer NFT to this contract
        IERC721(_nft).transferFrom(msg.sender, address(this), _nftId);

        // Create loan
        Loan memory newLoan = Loan({
            borrower: msg.sender,
            lender: address(0),
            amount: _amount,
            repaymentAmount: _repaymentAmount,
            nftId: _nftId,
            duration: _duration,
            startTime: 0,
            token: _token,
            nft: _nft,
            state: LoanState.Created
        });

        loans[loanId] = newLoan;

        isLoanExist[loanId] = true;

        emit LoanCreated(loanId, msg.sender);

        loanId++;

        return loanId - 1;
    }

    /**
     * @inheritdoc IP2P
     */
    function cancelLoan(uint256 _loanId) external override {
        Loan memory loan = loans[_loanId];

        // Check if loan exist and if the caller is the borrower
        if (!isLoanExist[_loanId]) revert LoanDoesNotExist();
        if (loan.borrower != msg.sender) revert NotTheBorrower();
        if (loan.state != LoanState.Created) revert NotCreatedState();

        // Change loan state
        loans[_loanId].state = LoanState.Canceled;

        // Transfer NFT back to borrower
        IERC721(loan.nft).transferFrom(address(this), loan.borrower, loan.nftId);

        emit LoanCanceled(_loanId);
    }

    /**
     * @inheritdoc IP2P
     */
    function acceptLoan(uint256 _loanId) external override {
        Loan memory loan = loans[_loanId];

        // Check if loan exist and if the caller is not the borrower
        if (!isLoanExist[_loanId]) revert LoanDoesNotExist();
        if (loan.borrower == msg.sender) revert IsTheBorrower();
        if (loan.state != LoanState.Created) revert NotCreatedState();

        // Check if the lender has enough tokens
        if (IERC20(loan.token).balanceOf(msg.sender) < loan.amount) revert InsufficientBalance();

        // Transfer tokens from lender to borrower
        IERC20(loan.token).transferFrom(msg.sender, loan.borrower, loan.amount);

        // Change loan state
        loans[_loanId].lender = msg.sender;
        loans[_loanId].startTime = block.timestamp;
        loans[_loanId].state = LoanState.Accepted;

        emit LoanAccepted(_loanId, msg.sender);
    }

    /**
     * @inheritdoc IP2P
     */
    function repayLoan(uint256 _loanId) external override {
        Loan memory loan = loans[_loanId];

        // Check if loan exist and if the caller is the borrower
        if (!isLoanExist[loanId]) revert LoanDoesNotExist();
        if (loan.borrower != msg.sender) revert NotTheBorrower();
        if (loan.state != LoanState.Accepted) revert NotAcceptedState();

        // Check if the borrower has enough tokens
        if (IERC20(loan.token).balanceOf(msg.sender) < loan.repaymentAmount) revert InsufficientBalance();

        // Transfer tokens from borrower to lender
        IERC20(loan.token).transferFrom(msg.sender, loan.lender, loan.repaymentAmount);

        // Change loan state
        loans[_loanId].state = LoanState.Repaid;

        // Transfer NFT back to borrower
        IERC721(loan.nft).transferFrom(address(this), loan.borrower, loan.nftId);

        emit LoanRepaid(_loanId);
    }

    /**
     * @inheritdoc IP2P
     */
    function liquidateLoan(uint256 _loanId) external override {
        Loan memory loan = loans[_loanId];

        // Check if loan exist
        if (!isLoanExist[loanId]) revert LoanDoesNotExist();
        if (loan.state != LoanState.Accepted) revert NotAcceptedState();

        // Check if the loan is expired
        if (loan.startTime + loan.duration > block.timestamp) revert NotExpired();

        // Change loan state
        loans[loanId].state = LoanState.Liquidated;

        // Transfer NFT to lender
        IERC721(loan.nft).transferFrom(address(this), loan.lender, loan.nftId);

        emit LoanLiquidated(_loanId);
    }

    // View functions

    /**
     * @inheritdoc IP2P
     */
    function getLoan(uint256 _loanId)
        external
        view
        override
        returns (Loan memory)
    {
        return loans[_loanId];
    }
}
