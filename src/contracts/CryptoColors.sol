pragma solidity ^0.5.8;
    import "./Token.sol";

    contract CryptoColors is Token{
    uint time = block.timestamp;
    uint public colorsCount;
    //List of added but not bought colors
    struct FreeColors{
        address owner;
        uint price;
        string color;
        bool bought;
    }
    mapping(uint => FreeColors) public colors;
    address payable public mainPerson;  //contract deployer
    //Someone who wants to collect our colors
    struct Person {
        uint howMuch;
         mapping(uint => string) colors;
    }
    mapping(address => Person) public people;
    //Function that allows main person to add new color to website (it can be done once a day)
    function addColor(string memory _color, uint _price) public {
        require(bytes(_color).length>0);
        require(_price>0);
        require(block.timestamp>=time);
        require(msg.sender == mainPerson);
       colors[colorsCount].price = _price;
       colors[colorsCount].color = _color;
       colors[colorsCount].owner = msg.sender;
       colorsCount++;
       time += 86400;
    }
    function sellColor(uint _id, uint _price) public {
        require(bytes(people[msg.sender].colors[_id]).length>0);
        colors[colorsCount].price = _price;
        colors[colorsCount].color = people[msg.sender].colors[_id];
        colors[colorsCount].owner = msg.sender;
        colorsCount++;
        people[msg.sender].colors[_id] = "";
    }
    function buyColor(uint _id) public {
        require(_id<colorsCount);
        require(!colors[_id].bought);
        require(balances[msg.sender]>=colors[_id].price);
        transfer(colors[_id].owner, colors[_id].price);
        people[msg.sender].howMuch++;
        people[msg.sender].colors[people[msg.sender].howMuch]=colors[_id].color;

        colors[_id].bought = true;
        colors[_id].owner = msg.sender;

    }
    //How much time left to new color add
    function getTime() public view returns(uint) {
        return time-block.timestamp;
    }
    constructor(
          string memory _name,
          string memory _symbol,
          uint8 _decimals,
          uint _totalSupply)
    Token(_name, _symbol, _decimals, _totalSupply) public {
        mainPerson=msg.sender;
    }
}
