// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./extensions/IERC721Metadata.sol";
import "../../utils/Address.sol";
import "../../utils/Context.sol";
import "../../utils/Strings.sol";
import "../../utils/introspection/ERC165.sol";

/**
* ERC-721 구현
* @dev EIP-721을 준수하여 ERC721을 작성합니다. 
* https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard
*/
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
    * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
    */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
    * @dev See {IERC165-supportsInterface}.
    */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }

    /**
    * @dev See {IERC721-balanceOf}.
    */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "owner = zero address");
        return _balances[owner];
    }

    /**
    * @dev See {IERC721-ownerOf}.
    */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        require(_owners[tokenId] != address(0), "token doesn't exist");
        return _owners[tokenId];
    }

    /**
    * @dev See {IERC721Metadata-name}.
    */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
    * @dev See {IERC721Metadata-symbol}.
    */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_owners[tokenId] != address(0), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
    * @dev See {IERC721-approve}.
    */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = _owners[tokenId];
        require(
            msg.sender == owner || _operatorApprovals[owner][msg.sender],
            "not authorized"
        );

        _tokenApprovals[tokenId] = to;

        emit Approval(owner, to, tokenId);
    }

    /**
    * @dev See {IERC721-getApproved}.
    */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_owners[tokenId] != address(0), "token doesn't exist");
        return _tokenApprovals[tokenId];
    }

    /**
    * @dev See {IERC721-setApprovalForAll}.
    */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    /**
    * @dev See {IERC721-isApprovedForAll}.
    */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
    * @dev See {IERC721-transferFrom}.
    */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(from == _owners[tokenId], "from != owner");
        require(to != address(0), "transfer to zero address");
        require((msg.sender == from || 
            _operatorApprovals[from][msg.sender] ||
            msg.sender == _tokenApprovals[tokenId]), "not authorized");

        _balances[from]--;
        _balances[to]++;
        _owners[tokenId] = to;

        delete _tokenApprovals[tokenId];

        emit Transfer(from, to, tokenId);
    }

    /**
    * @dev See {IERC721-safeTransferFrom}.
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        transferFrom(from, to, tokenId);
        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, "") ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    /**
    * @dev See {IERC721-safeTransferFrom}.
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        transferFrom(from, to, tokenId);
        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data) ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }
    

    /**
    * @dev Mints `tokenId` and transfers it to `to`.
    *
    * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
    *
    * Requirements:
    *
    * - `tokenId` must not exist.
    * - `to` cannot be the zero address.
    *
    * Emits a {Transfer} event.
    */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "mint to zero address");
        require(_owners[tokenId] == address(0), "already minted");

        _balances[to]++;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    /**
    * @dev Destroys `tokenId`.
    * The approval is cleared when the token is burned.
    *
    * Requirements:
    *
    * - `tokenId` must exist.
    *
    * Emits a {Transfer} event.
    */
    function _burn(uint256 tokenId) internal virtual {
        address owner = _owners[tokenId];
        require(owner != address(0), "not minted");

        _balances[owner] -= 1;

        delete _owners[tokenId];
        delete _tokenApprovals[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }
}