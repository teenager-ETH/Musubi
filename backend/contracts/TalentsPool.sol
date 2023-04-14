// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// TalentsPool is a contract that allows users to list their badges to be screened by employers

error TalentsPool__OnlyOwner();
error TalentsPool__PriceMustBeGreaterThanZero();
error TalentsPool__NotApprovedForListing();
error TalentsPool__BadgeAlreadyListed(address talentAddress, uint256 badgeId);
error TalentsPool__BadgeNotListed(address talentAddress, uint256 badgeId);
error TalentsPool__PayNotEnough(
    address talentAddress,
    uint256 badgeId,
    uint256 price
);
error TalentsPool__NoEarnings();
error TalentsPool__TransferFailed();

contract TalentsPool {
    // BadgeListing is a struct that contains the badge owner and the price
    struct BadgeListing {
        address talentAddress;
        uint256 price;
    }

    // BadgeListed is an event that is emitted when a badge is listed
    event BadgeListed(
        address indexed talentAddress,
        address indexed badgeAddress,
        uint256 indexed badgeId,
        uint256 price
    );

    // BadgePrepaid is an event that is emitted when a badge is prepaid
    event BadgePrepaid(
        address indexed employerAddress,
        address indexed badgeAddress,
        uint256 indexed badgeId,
        address talentAddress,
        uint256 price
    );

    event BadgeUnlisted(
        address indexed talentAddress,
        address indexed badgeAddress,
        uint256 indexed badgeId
    );

    // mapping from badge address to badge id to badge listing
    mapping(address => mapping(uint256 => BadgeListing))
        private s_badgeListings;

    // mapping from talent address to the total earnings
    mapping(address => uint256) private s_earnings;

    ////////////////////
    //    Modifers    //
    ////////////////////

    modifier isOwner(
        address badgeaddress,
        uint256 badgeId,
        address sender
    ) {
        IERC721 badge = IERC721(badgeaddress);
        if (badge.ownerOf(badgeId) != sender) {
            revert TalentsPool__OnlyOwner();
        }
        _;
    }

    // notListed checks if the badge is not listed
    modifier notListed(address badgeAddress, uint256 badgeId) {
        if (
            s_badgeListings[badgeAddress][badgeId].talentAddress != address(0)
            // check if the talent address exists, address(0) means it's an empty address
        ) {
            revert TalentsPool__BadgeAlreadyListed(badgeAddress, badgeId);
        }
        _;
    }

    modifier isListed(address badgeAddress, uint256 badgeId) {
        if (
            s_badgeListings[badgeAddress][badgeId].talentAddress == address(0)
        ) {
            revert TalentsPool__BadgeNotListed(badgeAddress, badgeId);
        }
        _;
    }

    ////////////////////
    // Main Functions //
    ////////////////////

    /**
     * @dev listBadge lists a badge for screening
     * @param badgeAddress the address of the badge contract, one talent can list multiple badges
     * @param badgeId the id of the badge
     * @param price the price for hiring the talent under this badge
     * @dev the badge can be listed on the talents pool only if the badge is approved by the owner
     */
    function listBadge(
        address badgeAddress,
        uint256 badgeId,
        uint256 price
    )
        external
        isOwner(badgeAddress, badgeId, msg.sender)
        notListed(badgeAddress, badgeId)
    {
        if (price < 0) {
            revert TalentsPool__PriceMustBeGreaterThanZero();
        }

        // badge is an ERC721 token, we need to approve this contract to list it
        IERC721 badge = IERC721(badgeAddress);
        if (badge.getApproved(badgeId) != address(this)) {
            revert TalentsPool__NotApprovedForListing();
        }
        s_badgeListings[badgeAddress][badgeId] = BadgeListing(
            msg.sender,
            price
        );
        emit BadgeListed(msg.sender, badgeAddress, badgeId, price);
    }

    function prepayBadge(
        address badgeAddress,
        uint256 badgeId
    ) external payable isListed(badgeAddress, badgeId) {
        BadgeListing memory listedBadge = s_badgeListings[badgeAddress][
            badgeId
        ];
        if (msg.value < listedBadge.price) {
            revert TalentsPool__PayNotEnough(
                badgeAddress,
                badgeId,
                listedBadge.price
            );
        }
        s_earnings[listedBadge.talentAddress] += msg.value;
        // delete s_badgeListings[badgeAddress][badgeId]; // shoudn't delete the listing, the talents can accept multiple tasks if they'd like

        // don't transfer the payment to the talent address, let talents withdraw their earnings.
        emit BadgePrepaid(
            msg.sender,
            badgeAddress,
            badgeId,
            listedBadge.talentAddress,
            listedBadge.price
        );
    }

    function unlistBadge(
        address badgeAddress,
        uint256 badgeId
    )
        external
        isOwner(badgeAddress, badgeId, msg.sender)
        isListed(badgeAddress, badgeId)
    {
        delete s_badgeListings[badgeAddress][badgeId];
        emit BadgeUnlisted(msg.sender, badgeAddress, badgeId);
    }

    function updatePrice(
        address badgeAddress,
        uint256 badgeId,
        uint256 price
    )
        external
        isOwner(badgeAddress, badgeId, msg.sender)
        isListed(badgeAddress, badgeId)
    {
        s_badgeListings[badgeAddress][badgeId].price = price;
    }

    function withdrawIncome() external {
        uint256 earning = s_earnings[msg.sender];
        if (earning <= 0) {
            revert TalentsPool__NoEarnings();
        }
        s_earnings[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: earning}("");
        if (!success) {
            revert TalentsPool__TransferFailed();
        }
    }

    ////////////////////
    //     Getters    //
    ////////////////////

    function getBadgeListing(
        address badgeAddress,
        uint256 badgeId
    ) external view returns (BadgeListing memory) {
        return s_badgeListings[badgeAddress][badgeId];
    }

    function getEarnings(
        address talentAddress
    ) external view returns (uint256) {
        return s_earnings[talentAddress];
    }
}
