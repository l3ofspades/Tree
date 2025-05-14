/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    function dfs(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return dfs(node.right) + 1;
      if (!node.right) return dfs(node.left) + 1;
      return Math.min(dfs(node.left), dfs(node.right)) +1;
    }
    return dfs(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
if (!this.root) return 0;

function dfs(node) {
  if (!node) return 0;
  return Math.max(dfs(node.left), dfs(node.right)) + 1;


}

return dfs(this.root);

  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = -Infinity;

    function dfs(node) {
      if (!node) return 0;

      const left = Math.max(0, dfs(node.left));
      const right = Math.max(0, dfs(node.right));

      // max sum at this node as root of the path 
      result = Math.max(result, node.val + left + right);
      return node.val + Math.max(left, right);

    }
dfs(this.root);
return result === -Infinity ? 0 : result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let result = null;

    while (queue.length) {
      let node = queue.shift();

      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;

        }
      }
if (node.left) queue.push(node.left);
if (node.right) queue.push(node.right);
    }
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;

    let queue = [{ node: this.root, parent: null, depth: 0 }];
    let info = {};

    while (queue.length) {
      const { node, parent, depth, } = queue.shift();

      if (node === node1) info.node1 = { parent, depth };
      if (node === node2) info.node2 = { parent, depth };

      if (node.left) queue.push({ node: node.left, parent: node, depth: depth + 1 });
      if (node.right) queue.push({ node: node.right, parent: node, depth: depth + 1});

      if (info.node1 && info.node2) break;
    }


    return (
      info.node1 &&
      info.node2 &&
      info.node1.depth === info.node2.depth &&
      info.node1.parent !== info.node2.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    function helper(node) {
      if (!node) return "null";

      return `${node.val},${helper(node.left)},${helper(node.right)}`;
    }
    return helper(tree.root);

  }


  

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(data) {
    const values = data.split(",");

    function helper() {
      if (!values.length) return null;

      const val = values.shift();
      if(val === "null") return null;

      const node = new BinaryTreeNode(+val);
      node.left = helper();
      node.right = helper();
      return node;
    }

    return new BinaryTree(helper());

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function helper(current) {
      if (!current) return null;
      if (current === node1 || current === node2) return current;

      const left = helper(current.left);
      const right = helper(current.right);

      if (left && right) return current;
      return left || right;
    }

    return helper(this.root);

    }

  }
module.exports = { BinaryTree, BinaryTreeNode };
