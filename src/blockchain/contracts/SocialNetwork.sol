// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SocialNetwork {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  string public name;

  mapping (uint256 => Post) public posts;
  Counters.Counter public postsIdCounter;

  struct Post {
    uint256 id;
    address payable author;
    string content;
    uint256 tipAmount;
  }

  event PostCreated(
    uint256 id,
    address payable author,
    string content,
    uint256 tipAmount
  );

  event PostTipped(
    uint256 id,
    address payable author,
    string content,
    uint256 tipAmount
  );

  constructor() {
    name = "Social Network";
  }

  function createPost(string memory _content) public {
    require(bytes(_content).length > 0, "The post must contain some content.");

    postsIdCounter.increment();
    uint256 id = postsIdCounter.current();
    posts[id] = Post(id, payable(msg.sender), _content, 0);
    emit PostCreated(id, payable(msg.sender), _content, 0);
  }

  function tipPost(uint256 _id) public payable {
    require(_id > 0 && _id <= postsIdCounter.current(), "You cannot tip a post that does not exist.");

    Post memory post = posts[_id];
    address payable author = post.author;
    author.transfer(msg.value);
    post.tipAmount += msg.value;
    posts[_id] = post;
    emit PostTipped(_id, post.author, post.content, post.tipAmount);
  }
}
