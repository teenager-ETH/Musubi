// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// TalentsPool is a contract that allows users to list their badges to be screened by employers

error TalentsPool__OnlyOwnerCanListBadge();
error TalentsPool__PriceMustBeGreaterThanZero();
error TalentsPool__NotApprovedForListing();
error TalentsPool__BadgeAlreadyListed(address talentAddress, uint256 badgeId);
error TalentsPool__BadgeNotListed(address talentAddress, uint256 badgeId);

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

    // mapping from badge address to badge id to badge listing
    mapping(address => mapping(uint256 => BadgeListing))
        private s_badgeListings;

    ////////////////////
    //    Modifers    //
    ////////////////////

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

    modifier isOwner(
        address badgeaddress,
        uint256 badgeId,
        address sender
    ) {
        IERC721 badge = IERC721(badgeaddress);
        if (badge.ownerOf(badgeId) != sender) {
            revert TalentsPool__OnlyOwnerCanListBadge();
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
        notListed(badgeAddress, badgeId)
        isOwner(badgeAddress, badgeId, msg.sender)
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

    function payBadge() external payable {}
}
