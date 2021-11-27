const assert = require("assert");

const SocialNetwork = artifacts.require("./SocialNetwork.sol");

const { web3 } = require("../test-helper");

contract("SocialNetwork", ([deployer, author, tipper]) => {
  let socialNetwork;

  before(async () => {
    socialNetwork = await SocialNetwork.deployed();
  });

  describe("Deployment", () => {
    it("should deploy successfully", async () => {
      const address = socialNetwork.address;
      assert.notStrictEqual(address, 0x0);
      assert.notStrictEqual(address, "");
      assert.notStrictEqual(address, null);
      assert.notStrictEqual(address, undefined);
    });

    it("should have the name 'Social Network'", async () => {
      const name = await socialNetwork.name();

      assert.strictEqual(
        name,
        "Social Network",
        "The contract name was incorrect."
      );
    });
  });

  describe("Posts", () => {
    let result;
    let postCount;

    before(async () => {
      result = await socialNetwork.createPost("This is a test post.", {
        from: author,
      });

      postCount = await socialNetwork.postsIdCounter();
    });

    it("should create a post successfully", async () => {
      const event = result.logs[0].args;

      assert.strictEqual(
        postCount.toNumber(),
        1,
        "The post count was incorrect."
      );
      assert.strictEqual(
        event.id.toNumber(),
        1,
        "The post's id was incorrect."
      );
      assert.strictEqual(
        event.author,
        author,
        "The post's author was incorrect."
      );
      assert.strictEqual(
        event.content,
        "This is a test post.",
        "The post's content was incorrect."
      );
      assert.strictEqual(
        event.tipAmount.toNumber(),
        0,
        "The post's tip amount was incorrect."
      );
    });

    it("should fail to create a post without the required arguments", async () => {
      try {
        await socialNetwork.createPost("", {
          from: author,
        });
      } catch (error) {
        assert.strictEqual(
          error.message.includes("The post must contain some content."),
          true,
          "The error message returned was not correct."
        );
      }
    });

    it("should list posts", async () => {
      const post = await socialNetwork.posts(postCount.toNumber());

      assert.strictEqual(post.id.toNumber(), 1, "The post's id was incorrect.");
      assert.strictEqual(
        post.author,
        author,
        "The post's author was incorrect."
      );
      assert.strictEqual(
        post.content,
        "This is a test post.",
        "The post's content was incorrect."
      );
      assert.strictEqual(
        post.tipAmount.toNumber(),
        0,
        "The post's tip amount was incorrect."
      );
    });

    it("should allow users to tip a post", async () => {
      let oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = web3.utils.toBN(oldAuthorBalance);

      const result = await socialNetwork.tipPost(1, {
        from: tipper,
        value: web3.utils.toWei("1", "ether"),
      });

      const event = result.logs[0].args;

      assert.strictEqual(
        postCount.toNumber(),
        1,
        "The post count was incorrect."
      );
      assert.strictEqual(
        event.id.toNumber(),
        1,
        "The post's id was incorrect."
      );
      assert.strictEqual(
        event.author,
        author,
        "The post's author was incorrect."
      );
      assert.strictEqual(
        event.content,
        "This is a test post.",
        "The post's content was incorrect."
      );
      assert.strictEqual(
        event.tipAmount.toString(),
        web3.utils.toWei("1", "ether").toString(),
        "The post's tip amount was incorrect."
      );

      let newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      let tipAmount = web3.utils.toWei("1", "ether");
      tipAmount = web3.utils.toBN(tipAmount);

      const expectedBalance = oldAuthorBalance.add(tipAmount);

      assert.strictEqual(
        newAuthorBalance.toString(),
        expectedBalance.toString()
      );
    });

    it("should fail when the user tries to tip a post that doesn't exist", async () => {
      try {
        await socialNetwork.tipPost(2, {
          from: tipper,
          value: web3.utils.toWei("1", "ether"),
        });
      } catch (error) {
        assert.strictEqual(
          error.message.includes("You cannot tip a post that does not exist."),
          true,
          "The error message was not correct."
        );
      }
    });
  });
});
