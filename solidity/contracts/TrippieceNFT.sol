// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract TrippieceNFT is ERC721 {
    struct Sticker {
        uint256 tokenId;
        string tokenURI;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("MySticker", "MSK") {}

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenURIs[tokenId];
    }

    function getStickerList(address walletAddress) public view returns(Sticker[] memory ){
        uint256 max = _tokenIds.current(); //총 토큰아이디 개수라고 생각함 
        require( balanceOf(walletAddress)> 0,"you don't have any sticker Oopsie!!!");
         Sticker[] memory stickerLists = new Sticker[](balanceOf(walletAddress));
         uint256 index = 0;
              for (uint256 t = 1; t <= max; t++) {
            if (ownerOf(t) == walletAddress) {
              stickerLists[index].tokenId = t;
              stickerLists[index].tokenURI = tokenURIs[t];
              index=index+1;
            }
        }
     
        return stickerLists;
    }

    function create(address to, string memory _tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        tokenURIs[newTokenId] = _tokenURI;        
        return newTokenId;
    }
}
