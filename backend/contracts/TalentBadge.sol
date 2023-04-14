// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error TalentsBadge__BadgeNotTransferrable();

// TalentBadge is a soulbound token that represents a talent skill for recruiter screening
contract TalentBadge is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // Might need to customize as unique badge later.
    enum SkillLevel {
        Beginner,
        Intermediate,
        Advanced,
        Expert,
        Master,
        Grandmaster,
        Legend
    }

    uint256 private immutable i_mintFee;
    string[] internal s_badgeURIs;
    Counters.Counter private s_badgeCounter;

    event BadgeMinted(address indexed talentAddress, uint256 indexed badgeId);

    modifier hasPassedTest() {
        // check if the talent has passed the test
        _;
    }

    constructor(uint256 mintFee, string[] memory badgeURIs) ERC721("TalentBadge", "TB") {
        i_mintFee = mintFee;
        s_badgeURIs = badgeURIs;
    }

    // override the _beforeTokenTransfer function to prevent badge for transfer
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721) {
        if (from != address(0)) {
            revert TalentsBadge__BadgeNotTransferrable();
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // after a talent passes a test, the test contract will call this function to mint a badge
    function mintBadge(uint256 skillLevel) public returns (uint256) {
        // add modifier hasPassedTest later
        // skillLevel may be changed later to reflect testing result data to metadata
        uint256 newBadgeId = s_badgeCounter.current();
        s_badgeCounter.increment();
        _safeMint(msg.sender, newBadgeId);
        _setTokenURI(newBadgeId, s_badgeURIs[skillLevel]); // to be updated
        emit BadgeMinted(msg.sender, newBadgeId);
        return s_badgeCounter.current();
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 badgeId) internal override(ERC721, ERC721URIStorage) {
        super._burn(badgeId);
    }

    function tokenURI(
        uint256 badgeId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(badgeId);
    }

    function ownerOf(uint256 badgeId) public view override returns (address) {
        return super.ownerOf(badgeId);
    }

    // getters
    function getBadgeCounter() public view returns (uint256) {
        return s_badgeCounter.current();
    }

    function getBadgeURIs(uint256 index) public view returns (string memory) {
        return s_badgeURIs[index];
    }
}
