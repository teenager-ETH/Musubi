# Musubi
## Project Description

After the ETHGlobal Tokyo Hackathon, we have been continuously developing the tool until it is ready for public use.

Initial Product Goal: Enable everyone, from non-tech founders to Web3 natives, to swiftly find web3 engineering talent while empowering talents to fully control their own data and minimize trust barriers.

Our Project Mission: 
We want to build a community of engineers where merit is the sole criterion, without considering one's background.

This project consists of 4 main components:

Skill Assessment Challenge Tool: A web3-based platform similar to Leetcode, focusing on practical challenges to gauge engineers' true understanding of technology stacks, rather than arbitrary algorithmic interview questions.
Skills-Based Tokens (SBTs): Skills are minted as SBTs to showcase talents' abilities. Talents have full control over their SBTs, deciding when to list or unlist them in the pool. SBTs can dynamically update to reflect skill development. Recruiters can hire talents based on their SBT skill levels.
Zero-Knowledge (Zk) Privacy: Zk ensures talents' privacy, allowing them to prove their abilities without revealing their key info. So they can explore better job opportunities without alerting their current employers, or find supplementary well-paid positions during their free time.
Bounty Pools (Under Construction): Businesses/DAOs can post public bounties for talents to participate in, resolving issues and assisting in building projects.
Payment Layer (Under Construction).
Talents' user flow: Talents take challenges -> generate SBTs -> list in the talent pool, awaiting tasks (deciding if they want to accept offers or reveal contact info for further steps) or take bounty tasks from recruiters -> update SBT based on their completion status.

Clients (recruiters) user flow: Filter talents from the pool directly and make them an offer or customize bounties and publish them in the bounties pool.

Although the above flows haven't been fully completed yet, we are working tirelessly to make both flows available for use as soon as possible.

## How it's Made
Drawing from our experience in the web2 recruiting space, we identified the pain points of centralized solutions and the complexities of hiring overseas employees, particularly in the absence of a proper standard, payment layer, and an intense political environment.

As a result, we decided to create a fully decentralized platform. We used The Graph for data querying, IPFS for data storage, and UniRep for privacy protection. This ensures our platform is accessible anywhere in the world with internet and computer access.

For the Skill Assessment Challenge Tool, we integrated Chainlink's random number solution to select challenges for talents.

To maintain talents' privacy, we utilized UniRep solutions, which allow us to present skill levels safely.

For permanent data storage, we employed Piñata/IPFS solutions and plan to extend this to NFT storage and FVM Solutions in the future.

To query data from smart contract events, we implemented The Graph for complete decentralization.
## Contact us
- Twitter account: <a href="https://twitter.com/@MusubiLabs">Musubi</a>
