// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TalentBadge is a soulbound token that represents a talent skill for recruiter screening
contract TalentBadge is ERC721URIStorage, Ownable {
    // Might need to customize as unique badge later.
    enum SkillLevel {
        Novice_Coders, // 1
        Apprentice_Engineers, // 2
        Journeyman_Developers, // 3
        Skilled_Programmers, // 4
        Adept_Architects, // 5
        Expert_Artisans, // 6
        Elite_Enthusiasts, // 7
        Master_Makers, // 8
        Grandmaster_Guru // 9
    }

    uint256 private immutable i_mintFee;
    string[] internal s_badgeURIs;
    uint256 private s_badgeCounter;

    event BadgeMinted(address indexed talentAddress, uint256 indexed badgeId);

    modifier hasPassedTest() {
        // check if the talent has passed the test
        _;
    }

    constructor(uint256 mintFee) ERC721("TalentBadge", "TB") {
        i_mintFee = mintFee;
    }

    // after a talent passes a test, the test contract will call this function to mint a badge
    function mintBadge(
        uint256 skillLevel
    ) public hasPassedTest returns (uint256) {
        uint256 newBadgeId = s_badgeCounter;
        s_badgeCounter++;
        _safeMint(msg.sender, newBadgeId);
        _setTokenURI(s_badgeCounter, s_badgeURIs[skillLevel]); // to be updated
        emit BadgeMinted(msg.sender, newBadgeId);
        return s_badgeCounter;
    }

    function getBadgeCounter() public view returns (uint256) {
        return s_badgeCounter;
    }

    function getBadgeURIs(uint256 index) public view returns (string memory) {
        return s_badgeURIs[index];
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
