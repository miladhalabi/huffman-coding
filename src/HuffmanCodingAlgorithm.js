import MinHeap from "./MinHeap";

class HuffmanBinaryTreeNode {
  constructor(
    frequency,
    character = null,
    parent = null,
    leftChild = null,
    rightChild = null
  ) {
    this.character = character;
    this.frequency = frequency;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.nodeNumber = HuffmanBinaryTreeNode.getNodeNumber();
  }

  static creationCounter = 0;

  static getNodeNumber() {
    return this.creationCounter++;
  }

  /*
   * Get methods
   */
  getFrequency() {
    return this.frequency;
  }

  getCharacter() {
    return this.character;
  }

  getNodeNumber() {
    return this.nodeNumber;
  }

  getChildren() {
    return [this.leftChild, this.rightChild];
  }

  getLeftChild() {
    return this.leftChild;
  }

  getRightChild() {
    return this.rightChild;
  }

  getParent() {
    return this.parent;
  }

  /*
   * Set and Increment methods
   */
  setFrequency(newFrequency) {
    this.frequency = newFrequency;
  }

  setCharacter(newCharacter) {
    this.character = newCharacter;
  }

  setChildren(children) {
    this.leftChild = children[0];
    this.rightChild = children[1];
  }

  setParent(parent) {
    this.parent = parent;
  }

  incrementFrequency() {
    this.frequency++;
  }
}

class HuffmanBinaryTree {
  constructor(inputText) {
    this.inputText = inputText;
    this.root = this.buildHuffmanTree();
    this.encoding = null;
  }

  constructFrequencyObject() {
    return this.inputText.reduce((currentObject, character) => {
      currentObject[character] = (currentObject[character] || 0) + 1;
      return currentObject;
    }, {});
  }

  // Prints the tree by level using BFS
  printTree() {
    console.log("Printing current tree.");

    let queue = [this.root],
      level = 0;

    // Continiously iterate through each node until queue is empty
    while (queue.length > 0) {
      let newQueue = [],
        currentLevel = [];

      // Iterate through each node in the queue
      for (let node of queue) {
        currentLevel.push([
          node.getCharacter() === null
            ? "null"
            : node.getCharacter() === " "
            ? "Space"
            : node.getCharacter(),
          node.getFrequency(),
        ]);
        const nodeChildren = node.getChildren();
        if (nodeChildren[0] !== null) {
          newQueue.push(nodeChildren[0]);
        }
        if (nodeChildren[1] !== null) {
          newQueue.push(nodeChildren[1]);
        }
      }

      // Print out each node in each level
      console.log(`Level ${level}: ${currentLevel.toString()}`);
      queue = newQueue;
      level++;
    }
  }

  /*
   * Returns the root of the Huffman tree
   */
  buildHuffmanTree() {
    // Create a dictionary storing the frequency of the inputText
    const inputTextFrequencyObject = this.constructFrequencyObject();

    // Build individual tree nodes for each unique character
    const nodes = [];
    for (const [character, frequency] of Object.entries(
      inputTextFrequencyObject
    )) {
      nodes.push(new HuffmanBinaryTreeNode(frequency, character));
    }

    // Construct a min heap storing the frequency of each character
    const minHeap = new MinHeap(nodes);
    minHeap.heapify();

    // Keep on popping off the top two elements and merging them until there is only one node left in the min heap
    while (minHeap.length > 1) {
      // Get the two smallest nodes in the minHeap
      const smallestFrequencyNode = minHeap.deleteMin(),
        secondSmallestFrequencyNode = minHeap.deleteMin();
      
      // Combine the two node's frequency
      const mergedNodeFrequency =
        smallestFrequencyNode.getFrequency() +
        secondSmallestFrequencyNode.getFrequency();

      // Merge them into one node, by creating a new node the combined frequencies
      let mergedNode = new HuffmanBinaryTreeNode(
        mergedNodeFrequency,
        null,
        null,
        smallestFrequencyNode,
        secondSmallestFrequencyNode
      );

      // Put the new node back into the minHeap
      minHeap.insert(mergedNode);
    }

    // Return the only node
    return minHeap.deleteMin();
  }

  createDeepCopy(array) {
    return JSON.parse(JSON.stringify(array));
  }

  /*
   * Generate encoding
   * Using BFS, explore the entire tree and capture all the characters
   * encoding - key: character, value: [huffmanEncoding, [circleNodesNumber], [pathNodesNumber], leafNodeNumber]
   */
  generateEncoding() {
    // Check if the root is the only element in the tree
    if (this.root.getCharacter() !== null) {
      const encoding = {};
      encoding[this.root.getCharacter()] = {
        "stringPath" : '0',
        "nodePath" : [],
        "branchPath" : [],
        "leafNumber" : 0
      };
      this.encoding = encoding;
      return encoding;
    }

    // Create a queue that holds the tree node and the current string to that node;
    // create a encoding that holds all the encodings: key - character ; value - string to character
    let queue = [[this.root, '', [0], []]],
      encoding = {};
    
    let pathCounter = 0,
      nodeCounter = 1,
      leafCounter = 0;
    
    while (queue.length > 0) {
      const newQueue = [];

      // Iterate through the queue
      for (const [node, stringPath, nodePath, branchPath] of queue) {

        // If the current node has a character, then it's a leaf node
        if (node.getCharacter() !== null) {
          encoding[node.getCharacter()] = {
            "stringPath" : stringPath, 
            "nodePath" : nodePath, // Remove the last node from the list, because it's the leaf node 
            "branchPath" : branchPath, 
            "leafNumber" : leafCounter++
          };
          continue;
        }

        // Check if there is a left child; if so, then append a '0' to the current path
        if (node.getLeftChild() !== null) {
          if (node.getLeftChild().getCharacter() !== null) {
            newQueue.push([node.getLeftChild(), stringPath + '0', nodePath, branchPath.concat([pathCounter++])]); 
          } else {
            newQueue.push([node.getLeftChild(), stringPath + '0', nodePath.concat([nodeCounter++]), branchPath.concat([pathCounter++])]); 
          }
        }

        // Check if there is a right child; if so, then append a '1' to the current path
        if (node.getRightChild() !== null) {
          if (node.getRightChild().getCharacter() !== null) {
            newQueue.push([node.getRightChild(), stringPath + '1', nodePath, branchPath.concat([pathCounter++])]); 
          } else {
            newQueue.push([node.getRightChild(), stringPath + '1', nodePath.concat([nodeCounter++]), branchPath.concat([pathCounter++])]); 
          }
        }
      }

      // Reassign the queue
      queue = newQueue;
    }

    // Update the encoding attribute and return the encoding dictionary
    this.encoding = encoding;
    return encoding;
  }

  /*
   * Do a DFS and recursively create json of the tree 
   * Each node needs: name, parent, children, frequency
   */
  jsonifyHelper(node) {
    // Create a default node, each node has
    const currentNode = {
      "name" : node.getCharacter(), // ! Have to convert the characters to readable if its characters that arent readiable
      "parent" : node.getParent(),
      "count" : node.getFrequency(),
    };

    // Check if its a leaf node
    if (node.getCharacter() !== null) {
      return currentNode;
    }

    const nodeChildren = [];

    if (node.getLeftChild() !== null) {
      nodeChildren.push(this.jsonifyHelper(node.getLeftChild()));
    }

    if (node.getRightChild() !== null) {
      nodeChildren.push(this.jsonifyHelper(node.getRightChild()));
    }

    // Assign the children back to the node
    currentNode["children"] = nodeChildren;

    return currentNode
  }

  /*
   * Generate json of tree
   */
  jsonify() {
    return this.jsonifyHelper(this.root);
  }
}

export default HuffmanBinaryTree;
