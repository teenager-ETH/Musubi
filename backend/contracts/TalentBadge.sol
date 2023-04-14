// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// TalentBadge is a soulbound token that represents a talent skill for recruiter screening
contract TalentBadge is ERC721 {
    string public constant Token_URI = "https://i";
    uint256 private s_badgeCounter;

    event BadgeMinted(address indexed talentAddress, uint256 indexed badgeId);

    modifier hasPassedTest() {
        // check if the talent has passed the test
        _;
    }

    constructor() ERC721("TalentBadge", "TB") {}

    // after a talent passes a test, the test contract will call this function to mint a badge
    function mintBadge() public hasPassedTest returns (uint256) {
        uint256 newBadgeId = s_badgeCounter;
        s_badgeCounter++;
        _safeMint(msg.sender, newBadgeId);
        // _setTokenURI(s_badgeCounter, Token_URI);
        emit BadgeMinted(msg.sender, newBadgeId);
        return s_badgeCounter;
    }

    function tokenURI(
        uint256 /*tokenId*/
    ) public view virtual override returns (string memory) {
        return Token_URI;
    }

    function getBadgeCounter() public view returns (uint256) {
        return s_badgeCounter;
    }

    function ownerOf() public {}
}

// contract TalentBadge is ERC721, ERC721URIStorage {
//     // owner is the address of the TalentBadge contract issuer, who can issue issue badge to talents
//     uint256 private s_badgeCounter;

//     address public owner;

//     struct Skill {
//         string name;
//         uint256 level;
//     }

//     mapping(uint256 => Skill) private _tokenSkills;
//     mapping(address => bool) private hasUnclaimedBadge;

//     constructor() ERC721("TalentBadge", "TB") {}

//     modifier onlyOwner() {
//         require(msg.sender == owner, "TalentBadge: caller is not the owner");
//         _;
//     }

//     function awardBadge(
//         address recipient,
//         uint256 tokenId,
//         string memory tokenURI,
//         string memory skillName,
//         uint256 skillLevel
//     ) external onlyOwner {
//         hasUnclaimedBadge[recipient] = true;
//     }

//     function claimBadge(
//         uint256 tokenId,
//         string memory tokenURI,
//         string memory skillName,
//         uint256 skillLevel
//     ) external {
//         require(
//             hasUnclaimedBadge[msg.sender],
//             "TalentBadge: caller has no unclaimed badge"
//         );
//         _mint(msg.sender, tokenId);
//         _setTokenURI(tokenId, tokenURI);
//         _tokenSkills[tokenId] = Skill(skillName, skillLevel);
//         hasUnclaimedBadge[msg.sender] = false;
//     }

//     function getSkillLevel(
//         uint256 tokenId
//     ) external view returns (string memory, uint256) {
//         SkillLevel memory skill = _tokenSkills[tokenId];
//         return (skill.name, skill.level);
//     }

//     // for recruiter to check talent's badge status
//     mapping(address => bool) private _hasBadge;

//     // remove the safetrasnferfrom function

//     // Update the skill level after passing a test
// }
