// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TrippieceNFT.sol";

contract StickerMarket {
    TrippieceNFT public trippieceNFT; //TrippieceNFT contract 주소로 생성 

    constructor (address _tokenAddress) {
        trippieceNFT = TrippieceNFT(_tokenAddress);
    }

    mapping(uint256 => uint256) stickerPrices;
    uint256[] public onSaleStickerArray;



    function insertIntoMarket(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = trippieceNFT.ownerOf(_tokenId);

        require(tokenOwner == msg.sender, "Sender is not sticker owner.");
        require(_price > 0, "Price is zero or lower.");
        require(stickerPrices[_tokenId] == 0, "This sticker is already on sale.");
        require(trippieceNFT.isApprovedForAll(tokenOwner, address(this)), "Sticker owner did not approve token.");

        stickerPrices[_tokenId] = _price;

        onSaleStickerArray.push(_tokenId);
    }

    function purchaseSticker(uint256 _tokenId) public payable {
        uint256 price = stickerPrices[_tokenId];
        address tokenOnwer = trippieceNFT.ownerOf(_tokenId);

        require(price > 0, "this token is not on sale.");
        require(price <= msg.value, "Sender sent lower than price.");
        require(tokenOnwer != msg.sender, "Sender is already owner of this sticker.");

        payable(tokenOnwer).transfer(msg.value);
        trippieceNFT.safeTransferFrom(tokenOnwer, msg.sender, _tokenId);

        stickerPrices[_tokenId] = 0;

        for(uint256 i = 0; i < onSaleStickerArray.length; i++) {
            if(stickerPrices[onSaleStickerArray[i]] == 0) {
                onSaleStickerArray[i] = onSaleStickerArray[onSaleStickerArray.length - 1];
                onSaleStickerArray.pop();
            }
        }
    }

    function getOnSaleStickerArrayLength() view public returns (uint256) {
        return onSaleStickerArray.length;
    }

    function getTokenPrice(uint256 _tokenId) view public returns (uint256) {
        return stickerPrices[_tokenId];
    }
}
