// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";

contract TrippieceNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("SsafyNFT", "SSF") {}

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        tokenURIs[newTokenId] = _tokenURI;
        
        return newTokenId;
    }
}