const QUESTION_BANK = [

/* ================= DSA | Arrays & Strings ================= */

/* ---------- EASY (10) ---------- */
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "What is the index of the first element in most programming languages?",
  options: ["1", "0", "Depends on language", "None"],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which method is used to reverse an array in JavaScript?",
  options: ["reverse()", "flip()", "invert()", "turn()"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which data structure stores elements in contiguous memory?",
  options: ["Array", "Linked List", "Stack", "Tree"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which operator finds string length in JavaScript?",
  options: [".size", ".count", ".length", ".len()"],
  answer: 2
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which method converts string to lowercase?",
  options: ["toLowerCase()", "lower()", "small()", "down()"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which of the following is a mutable data type?",
  options: ["String", "Array", "Number", "Boolean"],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Accessing out-of-range index in array returns?",
  options: ["Error", "0", "undefined / null", "Random value"],
  answer: 2
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which method adds an item to end of array?",
  options: ["push()", "append()", "insert()", "add()"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Which string method removes whitespace?",
  options: ["trim()", "strip()", "removeSpace()", "clean()"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "easy",
  question: "Palindrome means?",
  options: [
    "Reads same backward and forward",
    "Sorted string",
    "Reversed string",
    "Encrypted string"
  ],
  answer: 0
},

/* ---------- MEDIUM (10) ---------- */

{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "What is the time complexity of reversing an array?",
  options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "Which technique helps when array is sorted?",
  options: ["Two pointers", "Hashing", "Stack", "Recursion"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "How to remove duplicates efficiently?",
  options: ["Use Set", "Sort then compare", "Loop twice", "All of the above"],
  answer: 3
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "What is sliding window used for?",
  options: [
    "Shortest path",
    "Subarray / substring problems",
    "Sorting",
    "Tree traversal"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "Find second largest number — best approach?",
  options: [
    "Sort fully",
    "Track max and second max",
    "Use recursion",
    "Binary search"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "Which is fastest lookup?",
  options: ["Array", "Linked list", "Hash map", "Queue"],
  answer: 2
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "Which operation is costly in arrays?",
  options: [
    "Access element",
    "Insert in middle",
    "Update index",
    "Iterate once"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "Check anagram: best way?",
  options: [
    "Compare sorted strings",
    "Reverse string",
    "Use stack",
    "Use queue"
  ],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "When would you use a char array instead of string?",
  options: [
    "When immutable",
    "For performance & editing characters",
    "Never",
    "Only for recursion"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "medium",
  question: "Which data structure helps track frequency?",
  options: ["Stack", "Map/Dictionary", "Queue", "Graph"],
  answer: 1
},

/* ---------- HARD (10) ---------- */

{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Find longest substring without repeating characters.",
  options: ["Brute force", "Sliding window", "Recursion", "Sorting"],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Find missing number from 1..n array.",
  options: [
    "Sort then scan",
    "Use XOR trick",
    "Binary search",
    "Use recursion"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Maximum subarray sum problem solution?",
  options: [
    "Kadane’s Algorithm",
    "Backtracking",
    "Divide & conquer only",
    "Greedy always"
  ],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Rotate array by k — best approach?",
  options: [
    "Shift elements repeatedly",
    "Reverse parts",
    "Copy to new array",
    "Recursion"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Find duplicate in array where numbers 1..n.",
  options: [
    "Sort and scan",
    "Floyd cycle detection",
    "Binary search only",
    "Recursion"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Minimum window substring problem uses?",
  options: [
    "Binary search",
    "Sliding window + hashmap",
    "Recursion",
    "Stack"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Find majority element (appears > n/2).",
  options: [
    "Hash map",
    "Moore Voting Algorithm",
    "Sorting only",
    "Binary search"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Find 0/1 matrix region sizes — best?",
  options: ["DFS", "Sorting", "Hashing", "Two pointer"],
  answer: 0
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Check if string can become palindrome by removing one char.",
  options: [
    "Sort characters",
    "Two-pointer skip check",
    "Hash map",
    "Recursion only"
  ],
  answer: 1
},
{
  module: "Arrays & Strings",
  difficulty: "hard",
  question: "Find k most frequent elements.",
  options: [
    "Sort array",
    "Hash map + min heap",
    "Sliding window",
    "Recursion"
  ],
  answer: 1
},

/* Continue similarly for other modules… */
/* ================= DSA | Linked Lists ================= */

/* ---------- EASY (10) ---------- */
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "What does each node in a linked list store?",
  options: ["Only data", "Only address", "Data and address", "Only index"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Which pointer stores the start of the list?",
  options: ["tail", "start", "root", "head"],
  answer: 3
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Which linked list allows traversal in both directions?",
  options: ["Singly", "Circular", "Doubly", "Static"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Insertion at the beginning of a linked list is:",
  options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
  answer: 0
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Which linked list last node points back to head?",
  options: ["Singly", "Circular", "Doubly", "Queue"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Linked lists are better than arrays when:",
  options: [
    "Random access needed",
    "Frequent insertions/deletions",
    "Memory is contiguous",
    "Sorting required"
  ],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "What is NULL pointer used for?",
  options: ["End of list", "Head pointer", "Middle node", "Loop detection"],
  answer: 0
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Which operation requires traversal?",
  options: ["Insert at head", "Delete tail", "Access head", "Create node"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "What is stored in the next pointer?",
  options: ["Previous node", "Random node", "Address of next node", "Index"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "easy",
  question: "Which is NOT a linked list type?",
  options: ["Singly", "Doubly", "Triply", "Circular"],
  answer: 2
},

/* ---------- MEDIUM (10) ---------- */

{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Deleting a node in the middle requires:",
  options: ["Tail pointer", "Head pointer", "Previous node", "Random node"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Find length of linked list complexity?",
  options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Detect cycle technique?",
  options: ["Sliding window", "Two pointers", "Stack", "Queue"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Reverse a linked list best approach?",
  options: ["Recursion", "Iterative pointer swap", "Hashing", "Sorting"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Find middle node efficiently:",
  options: ["Traverse once", "Traverse twice", "Fast/slow pointer", "Binary search"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Deleting tail requires:",
  options: ["Head only", "Tail only", "Traversal", "Hash map"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Merging two sorted lists complexity:",
  options: ["O(1)", "O(n)", "O(n+m)", "O(n log n)"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Which is a drawback?",
  options: ["Dynamic size", "Slow random access", "Fast insert", "Low memory"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "What causes memory leak?",
  options: ["Deleting node", "Not freeing deleted node", "Traversal", "Search"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "medium",
  question: "Convert linked list to array complexity:",
  options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
  answer: 1
},

/* ---------- HARD (10) ---------- */

{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Remove nth node from end uses:",
  options: ["Stack", "Two pointers", "Recursion only", "Sorting"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Clone list with random pointers requires:",
  options: ["Hash map", "Two pointers", "DFS", "Sorting"],
  answer: 0
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Detect and remove loop method?",
  options: ["Stack", "Hashing", "Floyd cycle", "Binary search"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Sort linked list efficiently:",
  options: ["Quick sort", "Merge sort", "Bubble sort", "Insertion sort"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Check palindrome list technique:",
  options: ["Reverse second half", "Stack", "Recursion", "All of the above"],
  answer: 3
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Flatten multilevel list best approach?",
  options: ["DFS", "BFS", "Recursion", "Priority queue"],
  answer: 0
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Intersection of two lists uses:",
  options: ["Sorting", "Two pointer sync", "Hashing", "Stack"],
  answer: 1
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Reverse nodes in k-group complexity:",
  options: ["O(1)", "O(k)", "O(n)", "O(n log n)"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "LRU cache internally uses:",
  options: ["Queue", "Heap", "Hash map + doubly list", "Stack"],
  answer: 2
},
{
  module: "Linked Lists",
  difficulty: "hard",
  question: "Remove duplicates from unsorted list efficiently:",
  options: ["Sort", "Recursion", "Hashing", "Brute force"],
  answer: 2
},

];
// ---------------- PYTHON BASICS ----------------
QUESTION_BANK.push(
  // EASY (10)
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which function is used to output text in Python?",
    options: ["echo()", "print()", "printf()", "display()"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/* */", "--"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "What is the correct file extension for Python files?",
    options: [".py", ".pt", ".p", ".python"],
    answer: 0
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which keyword is used to create a variable?",
    options: ["var", "let", "const", "No keyword required"],
    answer: 3
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "What is the output of: print(3 + 2 * 2)?",
    options: ["10", "7", "8", "9"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which data type is used for True/False?",
    options: ["str", "bool", "int", "float"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "What does len('abc') return?",
    options: ["1", "2", "3", "4"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which function converts input to integer?",
    options: ["str()", "float()", "int()", "input()"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which operator is used for exponent in Python?",
    options: ["^", "**", "//", "%"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "easy",
    question: "Which built-in type is unordered and unique?",
    options: ["list", "tuple", "set", "dict"],
    answer: 2
  },

  // MEDIUM (10)
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "What is the result of: 10 // 3 ?",
    options: ["3.33", "3", "4", "Error"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "Which method removes the last element from a list?",
    options: ["remove()", "delete()", "pop()", "clear()"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "What does range(5) generate?",
    options: ["1–5", "0–5", "0–4", "1–4"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "Which loop runs until condition becomes false?",
    options: ["for", "while", "loop", "repeat"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "What keyword is used to define a function?",
    options: ["func", "function", "def", "define"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "Which statement is used to handle exceptions?",
    options: ["catch", "except", "error", "throw"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "How do you open a file in read mode?",
    options: ["open('a.txt','r')", "open('a.txt','w')", "file.read()", "open('a.txt')"],
    answer: 0
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "What is the output of type([])?",
    options: ["list", "<class 'list'>", "[]", "object"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "Which operator checks equality?",
    options: ["=", "==", "===", "equals()"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "medium",
    question: "Which keyword exits a loop?",
    options: ["stop", "exit", "break", "return"],
    answer: 2
  },

  // HARD (10)
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "What will this print: print(bool(''))?",
    options: ["True", "False", "None", "Error"],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "Lists are stored as:",
    options: ["Linked lists", "Arrays", "Objects with dynamic arrays", "Hash tables"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "Which statement is TRUE about tuples?",
    options: [
      "They are mutable",
      "They are immutable",
      "They cannot be indexed",
      "They store only numbers"
    ],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "What does zip() do?",
    options: [
      "Compress files",
      "Combine iterables element-wise",
      "Sort values",
      "Iterate backwards"
    ],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "What is list comprehension used for?",
    options: [
      "Faster loops",
      "Creating lists from iterables",
      "Filtering data",
      "All of the above"
    ],
    answer: 3
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "Which concept allows functions inside functions?",
    options: ["Encapsulation", "Recursion", "Nested functions", "Inheritance"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "What does *args mean?",
    options: [
      "Keyword arguments",
      "Positional arguments (variable length)",
      "Default parameter",
      "Dictionary input"
    ],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "Which data type is best for key-value pairs?",
    options: ["list", "tuple", "dict", "set"],
    answer: 2
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "What is recursion?",
    options: [
      "Looping using while",
      "Function calling itself",
      "Parallel execution",
      "A syntax error"
    ],
    answer: 1
  },
  {
    module: "Python Basics",
    difficulty: "hard",
    question: "Which is faster in Python?",
    options: ["Loop", "List comprehension", "map()", "All same"],
    answer: 1
  }
);
// ---------------- OOP ----------------
QUESTION_BANK.push(
  // EASY (10)
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "What does OOP stand for?",
    options: ["Object-Oriented Programming", "Object Operating Program", "Open Object Protocol", "Object Order Processing"],
    answer: 0
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "What is an object?",
    options: ["A variable", "An instance of a class", "A function", "A database"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "What is a class?",
    options: ["A datatype", "A blueprint for objects", "A method", "A loop"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "Which concept hides internal details?",
    options: ["Inheritance", "Abstraction", "Encapsulation", "Polymorphism"],
    answer: 2
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "Which keyword is used to create an object in many languages?",
    options: ["class", "object", "new", "instance"],
    answer: 2
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "Which feature allows using the same method name with different behaviors?",
    options: ["Abstraction", "Encapsulation", "Polymorphism", "Inheritance"],
    answer: 2
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "What is inheritance?",
    options: ["Copying code", "Passing attributes from one class to another", "Deleting classes", "Hiding data"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "What is a constructor?",
    options: ["A special method that initializes objects", "A loop", "A variable", "A class"],
    answer: 0
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "Which of the following is NOT OOP?",
    options: ["Java", "C++", "Python", "C"],
    answer: 3
  },
  {
    module: "Object Oriented Programming",
    difficulty: "easy",
    question: "Which is an example of an object?",
    options: ["Dog", "int", "if statement", "for loop"],
    answer: 0
  },

  // MEDIUM (10)
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "Which relationship is represented by Inheritance?",
    options: ["Has-a", "Is-a", "Uses-a", "Runs-on"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "What is method overloading?",
    options: ["Same method name, different classes", "Same method name, different parameters", "Different method names", "Methods calling each other"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "What is method overriding?",
    options: ["Parent and child class have same method", "Method inside method", "Two classes using same variable", "Changing object type"],
    answer: 0
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "What is abstraction?",
    options: ["Showing all details", "Hiding unnecessary details", "Deleting code", "Renaming classes"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "Which keyword prevents inheritance (in many languages)?",
    options: ["lock", "sealed/final", "stop", "private"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "What is an abstract class?",
    options: ["A normal class", "A class that cannot be instantiated", "A class with no variables", "A class without methods"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "What is an interface?",
    options: ["A class", "A contract defining methods", "An object", "A constructor"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "Which concept binds data and functions together?",
    options: ["Abstraction", "Polymorphism", "Encapsulation", "Overriding"],
    answer: 2
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "What happens when two classes inherit from the same parent?",
    options: ["Multiple inheritance", "Single inheritance", "Hybrid inheritance", "Hierarchical inheritance"],
    answer: 3
  },
  {
    module: "Object Oriented Programming",
    difficulty: "medium",
    question: "Which principle increases code reusability?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    answer: 1
  },

  // HARD (10)
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "Which principle allows substituting a child class wherever parent is expected?",
    options: ["Open-Closed Principle", "Liskov Substitution Principle", "DRY Principle", "Dependency Inversion"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "What is composition?",
    options: ["Weak relationship", "Object contains another object", "Inheritance", "Polymorphism"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "Which is TRUE for polymorphism?",
    options: ["Only runtime", "Only compile-time", "Can be compile-time or runtime", "Not supported"],
    answer: 2
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "What is a destructor?",
    options: ["Deletes objects", "Initializes objects", "Creates objects", "Copies objects"],
    answer: 0
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "What is the diamond problem?",
    options: [
      "Conflict in multiple inheritance",
      "Memory leak",
      "Recursion error",
      "Variable shadowing"
    ],
    answer: 0
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "Which keyword gives access to parent class methods?",
    options: ["this", "base/super", "parent()", "root"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "What is static polymorphism?",
    options: ["Method overriding", "Function overloading", "Dynamic binding", "Late binding"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "What is late binding?",
    options: ["Decided at compile-time", "Decided at runtime", "Fixed behavior", "Compile error"],
    answer: 1
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "What are getters and setters used for?",
    options: ["Hide data access", "Improve speed", "Debug errors", "Store files"],
    answer: 0
  },
  {
    module: "Object Oriented Programming",
    difficulty: "hard",
    question: "Which principle says: “Classes should depend on abstractions, not details”?",
    options: ["SRP", "LSP", "DIP", "ISP"],
    answer: 2
  }
);
// ---------------- HTML & CSS ----------------
QUESTION_BANK.push(
  // EASY (10)
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Hyperlink Text Management Language"
    ],
    answer: 0
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<heading>", "<head>"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which tag is used to insert an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: 0
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: 0
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style System",
      "Colorful Styling Script"
    ],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which property changes text color?",
    options: ["font-color", "text-style", "color", "style"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which tag is used for a line break?",
    options: ["<break>", "<lb>", "<br>", "<line>"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which attribute sets an image source?",
    options: ["href", "src", "link", "file"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which tag is used to create a list with bullets?",
    options: ["<ol>", "<ul>", "<list>", "<li>"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "easy",
    question: "Which property makes text bold?",
    options: ["font-weight", "bold-text", "text-style", "font-bold"],
    answer: 0
  },

  // MEDIUM (10)
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which element is used to define a table row?",
    options: ["<td>", "<tr>", "<th>", "<row>"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which attribute opens a link in a new tab?",
    options: ['target="_blank"', 'open="new"', 'href="_new"', "tab=new"],
    answer: 0
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which CSS property controls spacing inside a box?",
    options: ["margin", "padding", "border", "gap"],
    answer: 1
  },
      {
        module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "What does the <div> tag represent?",
    options: ["Image", "Document section", "Hyperlink", "Table"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which selector targets an element with id='box'?",
    options: ["box", ".box", "#box", "*box"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which layout uses flexbox?",
    options: ["display: block", "display: flex", "display: grid", "display: none"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which property centers text?",
    options: ["align", "text-center", "text-align", "center-text"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which tag is semantic?",
    options: ["<div>", "<span>", "<section>", "<b>"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which property controls outer spacing?",
    options: ["padding", "margin", "space", "outline"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "medium",
    question: "Which CSS unit is relative to font size?",
    options: ["px", "em", "%", "vh"],
    answer: 1
  },

  // HARD (10)
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "What does the 'box-sizing: border-box' property do?",
    options: [
      "Ignores padding",
      "Includes padding & border inside width",
      "Adds extra margin",
      "Resizes fonts"
    ],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "Which layout system is best for 2-D grids?",
    options: ["Flexbox", "Float", "Grid", "Position"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "Which meta tag improves SEO and search keywords?",
    options: ["<meta charset>", "<meta keywords>", "<meta viewport>", "<meta title>"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "What does z-index control?",
    options: ["Font size", "Layer stacking order", "Position", "Color depth"],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "What does position: absolute do?",
    options: [
      "Moves relative to parent/nearest positioned element",
      "Locks element to screen",
      "Centers element",
      "Adds borders"
    ],
    answer: 0
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "What does the <canvas> tag do?",
    options: ["Draw graphics", "Store data", "Create tables", "Play audio"],
    answer: 0
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "What is specificity in CSS?",
    options: [
      "File size",
      "Rule priority",
      "Font sharpness",
      "Color accuracy"
    ],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "Which selector has highest priority?",
    options: ["Class selector", "Tag selector", "ID selector", "Universal selector"],
    answer: 2
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "What is responsive design?",
    options: [
      "Design that only works on desktop",
      "Design that adapts to all screen sizes",
      "Design without CSS",
      "Fixed-width design"
    ],
    answer: 1
  },
  {
    module: "HTML & CSS Fundamentals",
    difficulty: "hard",
    question: "Which attribute improves accessibility by describing images?",
    options: ["title", "desc", "alt", "info"],
    answer: 2
  }
);
// ---------------- JavaScript ----------------
QUESTION_BANK.push(
  // EASY (10)
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "Which keyword declares a variable that can change?",
    options: ["const", "var", "static", "define"],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "How do you write a comment in JavaScript?",
    options: ["<!-- comment -->", "// comment", "## comment", "** comment **"],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "Which symbol is used for strict equality?",
    options: ["=", "==", "===", "!==" ],
    answer: 2
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "How do you display output in the console?",
    options: ["alert()", "print()", "console.log()", "document.write()"],
    answer: 2
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "Which data type is NOT primitive?",
    options: ["Number", "String", "Object", "Boolean"],
    answer: 2
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "How do you create an array?",
    options: ["{}", "[]", "()", "<>"],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "Which operator adds 1 to a value?",
    options: ["++", "+=", "+1", "add()"],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "What is the default value of an uninitialized variable?",
    options: ["null", "0", "undefined", "false"],
    answer: 2
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "Which method converts a string to an integer?",
    options: ["parseInt()", "int()", "convert()", "toInt()"],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "easy",
    question: "Which statement executes code repeatedly?",
    options: ["if", "for", "return", "break"],
    answer: 1
  },

  // MEDIUM (10)
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "What is a function expression?",
    options: [
      "A function stored in a variable",
      "A function without parameters",
      "A built-in function",
      "A function that runs automatically"
    ],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "What does 'this' refer to inside an object method?",
    options: [
      "The window object",
      "The current object",
      "The parent function",
      "Global scope"
    ],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "add()", "append()", "insert()"],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "Which statement stops a loop?",
    options: ["stop", "return", "halt", "break"],
    answer: 3
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "What is a callback function?",
    options: [
      "A function called as a parameter",
      "A function that calls itself",
      "A hidden function",
      "A function without arguments"
    ],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "What does JSON stand for?",
    options: [
      "JavaScript Online Notation",
      "JavaScript Object Notation",
      "Java System Object Node",
      "Joined Script Object Network"
    ],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "Which method removes the last array element?",
    options: ["delete()", "pop()", "remove()", "cut()"],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "What does 'let' provide that 'var' does NOT?",
    options: [
      "Hoisting",
      "Global scope",
      "Block scope",
      "Automatic constants"
    ],
    answer: 2
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "Which operator is used for logical AND?",
    options: ["&&", "&", "and", "##"],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "medium",
    question: "How do you convert JSON to an object?",
    options: [
      "JSON.parse()",
      "JSON.convert()",
      "JSON.toObject()",
      "parseJSON()"
    ],
    answer: 0
  },

  // HARD (10)
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What is a closure?",
    options: [
      "A function with access to its outer scope",
      "A function that closes automatically",
      "A private function",
      "A function stored in memory"
    ],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What is event bubbling?",
    options: [
      "Events move from child to parent",
      "Events move from parent to child",
      "Event stops automatically",
      "Multiple events combine"
    ],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What does async/await simplify?",
    options: [
      "DOM manipulation",
      "Asynchronous code handling",
      "CSS animation",
      "Browser storage"
    ],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What is the purpose of Promises?",
    options: [
      "Store values",
      "Handle future results of async operations",
      "Repeat loops",
      "Share data across files"
    ],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "Which method creates a copy of an array?",
    options: ["clone()", "slice()", "copy()", "dup()"],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What does the spread operator (...) do?",
    options: [
      "Multiplies values",
      "Expands arrays/objects",
      "Joins functions",
      "Copies files"
    ],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What is debouncing used for?",
    options: [
      "Reducing function call frequency",
      "Speeding up loops",
      "Caching results",
      "Memory cleanup"
    ],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What is the DOM?",
    options: [
      "Document Object Model",
      "Data Object Machine",
      "Dynamic Output Manager",
      "Digital Object Method"
    ],
    answer: 0
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What does 'use strict' do?",
    options: [
      "Enables older syntax",
      "Prevents unsafe behavior",
      "Speeds up code",
      "Blocks async code"
    ],
    answer: 1
  },
  {
    module: "JavaScript Basics",
    difficulty: "hard",
    question: "What is hoisting?",
    options: [
      "Moving variables/functions to the top of scope",
      "Memory cleanup",
      "Loop optimization",
      "Code compression"
    ],
    answer: 0
  }
);
// ---------------- SQL Basics ----------------
QUESTION_BANK.push(
  // EASY (10)
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Sequential Query Language",
      "Server Query Layer",
      "System Question Language"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which command retrieves data from a table?",
    options: ["GET", "SELECT", "SHOW", "FETCH"],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which clause filters rows?",
    options: ["WHERE", "ORDER BY", "GROUP BY", "FILTER"],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which keyword sorts results?",
    options: ["SORT", "ORDER", "ORDER BY", "ARRANGE"],
    answer: 2
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which statement inserts new rows?",
    options: ["ADD", "CREATE", "INSERT INTO", "APPEND"],
    answer: 2
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which symbol represents all columns?",
    options: ["@", "#", "*", "%"],
    answer: 2
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which command deletes all data from a table?",
    options: ["DELETE", "DROP", "REMOVE", "CLEAR"],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which command creates a table?",
    options: ["BUILD TABLE", "MAKE TABLE", "CREATE TABLE", "NEW TABLE"],
    answer: 2
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which SQL statement updates data?",
    options: ["CHANGE", "UPDATE", "SET ROW", "ALTER"],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "easy",
    question: "Which clause removes duplicate values?",
    options: ["ONLY", "DISTINCT", "UNIQUE", "FILTER"],
    answer: 1
  },

  // MEDIUM (10)
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which clause groups rows?",
    options: ["GROUP BY", "ORDER BY", "COLLECT", "BUNDLE"],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "What does PRIMARY KEY ensure?",
    options: [
      "Duplicate values allowed",
      "Each row is unique",
      "Faster queries only",
      "Automatic sorting"
    ],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which constraint prevents null values?",
    options: ["BLOCK", "NOT NULL", "NO EMPTY", "RESTRICT"],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "What does COUNT(*) return?",
    options: [
      "Number of columns",
      "Number of rows",
      "Total memory used",
      "Primary key count"
    ],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which command removes a table?",
    options: ["ERASE TABLE", "DELETE TABLE", "DROP TABLE", "CLEAR TABLE"],
    answer: 2
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which operator checks a range?",
    options: ["IN", "BETWEEN", "WITHIN", "RANGE"],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which clause limits results?",
    options: ["TOP", "LIMIT", "ASK", "RESTRICT"],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "What does LIKE do?",
    options: [
      "Compares patterns in text",
      "Matches exact numbers",
      "Sorts data",
      "Deletes values"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which keyword combines multiple conditions?",
    options: ["IF", "CHECK", "AND/OR", "CASE"],
    answer: 2
  },
  {
    module: "SQL Basics",
    difficulty: "medium",
    question: "Which function returns the largest value?",
    options: ["MAX()", "HIGH()", "LARGEST()", "TOP()"],
    answer: 0
  },

  // HARD (10)
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is normalization?",
    options: [
      "Joining tables together",
      "Organizing data to reduce redundancy",
      "Encrypting tables",
      "Sorting data faster"
    ],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is a foreign key used for?",
    options: [
      "Speed up queries",
      "Link two tables",
      "Store external files",
      "Encrypt records"
    ],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What does ACID refer to?",
    options: [
      "Transaction reliability properties",
      "File system format",
      "Backup standard",
      "Query optimizer"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What happens in a LEFT JOIN?",
    options: [
      "Only matching records are shown",
      "All rows from the left table are returned",
      "All rows from both tables",
      "Only unmatched rows"
    ],
    answer: 1
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is a composite key?",
    options: [
      "Two or more columns forming a key",
      "A key with encryption",
      "A generated key",
      "A backup key"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is a view?",
    options: [
      "A stored SELECT query",
      "A backup copy",
      "Temporary file",
      "Log table"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What does TRUNCATE do?",
    options: [
      "Deletes all rows but keeps structure",
      "Deletes table structure",
      "Removes selected rows only",
      "Backs up table"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is an index?",
    options: [
      "A pointer improving search speed",
      "A table copy",
      "A log file",
      "A key constraint"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is a stored procedure?",
    options: [
      "Saved SQL code that can run repeatedly",
      "A data file",
      "A trigger type",
      "A backup task"
    ],
    answer: 0
  },
  {
    module: "SQL Basics",
    difficulty: "hard",
    question: "What is a transaction?",
    options: [
      "A single logical unit of work",
      "A backup process",
      "A schema change",
      "A user login"
    ],
    answer: 0
  }
);
// --------------- Joins & Subqueries ---------------
QUESTION_BANK.push(

  // EASY (10)
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "What does a JOIN do?",
    options: [
      "Combines rows from two tables",
      "Deletes duplicate rows",
      "Sorts table rows",
      "Creates a backup"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "Which join returns only matching rows?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
    answer: 2
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "Which clause is required in most joins?",
    options: ["WHERE", "ON", "GROUP BY", "LIMIT"],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "What does LEFT JOIN return?",
    options: [
      "Only matching rows",
      "All rows from left table + matches",
      "All rows from both tables",
      "Unmatched rows only"
    ],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "What is a subquery?",
    options: [
      "A query inside another query",
      "A deleted query",
      "A backup query",
      "A temporary table"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "Where can a subquery appear?",
    options: ["SELECT", "WHERE", "FROM", "All of the above"],
    answer: 3
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "Which operator often works with subqueries?",
    options: ["IN", "BETWEEN", "LIKE", "UNION"],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "What is the result of FULL JOIN?",
    options: [
      "Only matching rows",
      "Rows only in left table",
      "Rows only in right table",
      "All rows with matches where possible"
    ],
    answer: 3
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "Which join may return NULL values?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "Both LEFT and RIGHT"],
    answer: 3
  },
  {
    module: "Joins & Subqueries",
    difficulty: "easy",
    question: "Another name for self-join?",
    options: ["Mirror join", "Recursive join", "Loop join", "Same-table join"],
    answer: 3
  },

  // MEDIUM (10)
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "What is the purpose of USING() in joins?",
    options: [
      "To simplify join on same column names",
      "To filter duplicates",
      "To rename columns",
      "To create a new key"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "A subquery that returns multiple rows is commonly paired with:",
    options: ["=", ">", "IN", "BETWEEN"],
    answer: 2
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "Which join is most expensive typically?",
    options: ["INNER", "LEFT", "FULL", "CROSS"],
    answer: 2
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "What is a correlated subquery?",
    options: [
      "Independent query executed first",
      "Subquery that refers to outer query values",
      "A backup query",
      "Query inside SELECT only"
    ],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "Which query type can replace some joins?",
    options: ["Subqueries", "Triggers", "Views", "Indexes"],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "Which join produces Cartesian product?",
    options: ["INNER", "CROSS", "FULL", "SELF"],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "Where is NOT IN useful?",
    options: [
      "Finding missing records",
      "Counting rows",
      "Sorting data",
      "Joining large tables"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "What does EXISTS check?",
    options: [
      "Row count accuracy",
      "Whether any rows satisfy a subquery",
      "Duplicate records",
      "Join performance"
    ],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "What can replace NOT EXISTS efficiently?",
    options: ["LEFT JOIN with NULL check", "COUNT(*)", "HAVING", "GROUP BY"],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "medium",
    question: "Which join returns only unmatched rows?",
    options: [
      "ANTI JOIN",
      "SELF JOIN",
      "FILTER JOIN",
      "RIGHT INNER JOIN"
    ],
    answer: 0
  },

  // HARD (10)
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "Correlated subqueries generally run:",
    options: [
      "Once per query",
      "Once per outer row",
      "Only at load time",
      "Before indexing"
    ],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "What improves join performance most?",
    options: [
      "Indexes on join columns",
      "More subqueries",
      "Using SELECT *",
      "Extra constraints"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "Which operator compares value with subquery max result?",
    options: ["=", "ANY", "ALL", "IN"],
    answer: 2
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "What does UNION remove automatically?",
    options: ["NULLs", "Extra spaces", "Duplicate rows", "Indexes"],
    answer: 2
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "Which join ensures referential integrity checks?",
    options: [
      "Foreign key joins",
      "Self join",
      "Natural join",
      "Outer join"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "Which query finds rows greater than all returned values?",
    options: ["> ANY", "> ALL", "< ANY", "= ALL"],
    answer: 1
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "Which subquery executes first in SQL?",
    options: ["Innermost", "Outermost", "Random", "Depends on DB vendor"],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "What does correlated NOT EXISTS emulate?",
    options: [
      "LEFT JOIN where column IS NULL",
      "FULL JOIN",
      "RIGHT JOIN",
      "SELF JOIN"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "What is a derived table?",
    options: [
      "A subquery used as a temporary table",
      "Permanent backup",
      "Index table",
      "Partition table"
    ],
    answer: 0
  },
  {
    module: "Joins & Subqueries",
    difficulty: "hard",
    question: "What is the biggest drawback of nested subqueries?",
    options: [
      "They cannot filter results",
      "They may be slow and hard to optimize",
      "They delete data",
      "They require triggers"
    ],
    answer: 1
  }
);
// --------------- Aptitude ---------------
QUESTION_BANK.push(

  /* EASY (10) */
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "What is 25% of 200?",
    options: ["25", "40", "50", "75"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "If a train travels 60 km in 1 hour, how far in 3 hours?",
    options: ["90 km", "120 km", "150 km", "180 km"],
    answer: 3
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "Simplify: 15 × 4",
    options: ["45", "50", "55", "60"],
    answer: 3
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "What is 3/4 as a percentage?",
    options: ["50%", "60%", "75%", "90%"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "What is 10 more than 45?",
    options: ["40", "45", "50", "55"],
    answer: 3
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "Find the next number: 2, 4, 6, 8, ?",
    options: ["9", "10", "12", "14"],
    answer: 1
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "What is the square of 7?",
    options: ["42", "45", "48", "49"],
    answer: 3
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "A man has ₹50. Spends ₹20. Remaining?",
    options: ["₹10", "₹20", "₹30", "₹40"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "What is the average of 2, 4, 6, 8?",
    options: ["4", "5", "6", "7"],
    answer: 1
  },
  {
    module: "Aptitude",
    difficulty: "easy",
    question: "How many minutes in 2 hours?",
    options: ["60", "90", "100", "120"],
    answer: 3
  },

  /* MEDIUM (10) */
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "A shop gives 10% discount on ₹500. Selling price?",
    options: ["₹400", "₹450", "₹460", "₹480"],
    answer: 1
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "Find simple interest: P=₹1000, R=10%, T=2 years",
    options: ["₹100", "₹150", "₹180", "₹200"],
    answer: 3
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "Ratio 2:3. Total = 50. Larger share?",
    options: ["20", "25", "30", "35"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "Speed = Distance / ?",
    options: ["Time", "Work", "Weight", "Power"],
    answer: 0
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "A number is divisible by 9 if:",
    options: [
      "Last digit is even",
      "Sum of digits divisible by 9",
      "Number is prime",
      "Ends with zero"
    ],
    answer: 1
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "If CP=₹100 and SP=₹120, profit % = ?",
    options: ["10%", "15%", "20%", "25%"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "Find HCF of 18 and 24",
    options: ["2", "3", "6", "9"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "A man travels 30 km at 30 km/h and 30 km at 60 km/h. Avg speed?",
    options: ["40", "45", "50", "55"],
    answer: 1
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "What is the value of √144?",
    options: ["10", "11", "12", "14"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "medium",
    question: "If 8 workers complete a job in 6 days, 4 workers take?",
    options: ["3 days", "6 days", "9 days", "12 days"],
    answer: 3
  },

  /* HARD (10) */
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "A sum doubles in 8 years at simple interest. Rate %?",
    options: ["8%", "10%", "12.5%", "15%"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "Pipe A fills in 4 hrs, Pipe B in 6 hrs. Together?",
    options: ["1 hr", "2 hr", "2.4 hr", "3 hr"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "What is compound interest on ₹5000 at 10% for 2 years?",
    options: ["₹500", "₹1000", "₹1050", "₹1100"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "Train 100m long at 30m/s passes pole in?",
    options: ["2 sec", "3 sec", "3.3 sec", "5 sec"],
    answer: 1
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "Find missing term: 3, 9, 27, 81, ?",
    options: ["121", "230", "243", "324"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "Salary increases 20% then decreases 20%. Net effect?",
    options: ["No change", "Increase 4%", "Decrease 4%", "Decrease 10%"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "Boat speed 10 km/h, stream 4 km/h. Upstream speed?",
    options: ["4", "5", "6", "7"],
    answer: 3
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "A person travels 25% of distance by car, rest by bus. Which is true?",
    options: [
      "Total depends on bus speed",
      "Car speed irrelevant",
      "Bus covers 75% distance",
      "None"
    ],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "What is LCM of 12, 15, 18?",
    options: ["60", "90", "180", "240"],
    answer: 2
  },
  {
    module: "Aptitude",
    difficulty: "hard",
    question: "Find x: 2x + 3 = 19",
    options: ["5", "6", "7", "8"],
    answer: 2
  }
);
// --------------- Logical Reasoning ---------------
QUESTION_BANK.push(

  /* EASY (10) */
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "If ALL = 36, what is CAT? (A=1, B=2..)",
    options: ["24", "27", "30", "36"],
    answer: 1
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "What comes next? A, C, E, G, ?",
    options: ["H", "I", "J", "K"],
    answer: 3
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Odd one out: Cow, Goat, Lion, Dog",
    options: ["Cow", "Goat", "Lion", "Dog"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Sun : Day :: Moon : ?",
    options: ["Night", "Light", "Planet", "Star"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Find missing number: 5, 10, 15, 20, ?",
    options: ["22", "25", "30", "35"],
    answer: 1
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "If TOM is coded as 201513, how is CAT?",
    options: ["3120", "031020", "3120", "0312"],
    answer: 3
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Which does NOT belong: Square, Triangle, Circle, Rectangle",
    options: ["Square", "Triangle", "Circle", "Rectangle"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Rohan is taller than Vivek but shorter than Aman. Who is tallest?",
    options: ["Rohan", "Vivek", "Aman", "Cannot say"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Fill series: 2, 6, 12, 20, ?",
    options: ["24", "28", "30", "32"],
    answer: 3
  },
  {
    module: "Logical Reasoning",
    difficulty: "easy",
    question: "Find the mirror image of EAST",
    options: ["TSAE", "TEAS", "TSAE", "SAET"],
    answer: 0
  },

  /* MEDIUM (10) */
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "In a family: A is mother of B. B is brother of C. C is father of D. How is A related to D?",
    options: ["Mother", "Grandmother", "Sister", "Aunt"],
    answer: 1
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Clock: At 3:15, angle between hour & minute hand?",
    options: ["0°", "7.5°", "30°", "37.5°"],
    answer: 3
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Find missing number: 7, 14, 28, 56, ?",
    options: ["84", "98", "112", "120"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Statements: All fishes swim. Sharks are fish. Conclusion?",
    options: [
      "Sharks do not swim",
      "Some sharks swim",
      "All sharks swim",
      "None"
    ],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "A man walks North 5 km, East 5 km, South 5 km. Where is he now?",
    options: ["At start", "5 km East", "5 km North", "5 km South"],
    answer: 1
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Find odd one: 121, 144, 169, 196",
    options: ["121", "144", "169", "196"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Code: If PEN = QFO, then CAT = ?",
    options: ["DBU", "CBU", "DBV", "CBV"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Series: 3, 9, 27, ?, 243",
    options: ["54", "72", "81", "108"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "If + means × and × means +, find 4 + 5 × 2",
    options: ["14", "18", "22", "24"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "medium",
    question: "Find missing: AZ, BY, CX, ?",
    options: ["DW", "EV", "DX", "FW"],
    answer: 0
  },

  /* HARD (10) */
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Two trains cross each other in 12 sec. Speed ratio 3:5. Length ratio?",
    options: ["1:1", "3:5", "5:3", "Cannot determine"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Find missing: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Statement: No cats are dogs. Some dogs are pets. Conclusion?",
    options: [
      "Some pets are cats",
      "No pets are cats",
      "Some cats are not pets",
      "Cannot be determined"
    ],
    answer: 3
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Series: 4, 6, 9, 13, 18, ?",
    options: ["22", "23", "24", "25"],
    answer: 1
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Find code: If BOOK = CRRL, then READ = ?",
    options: ["SFBE", "SFDC", "SEBF", "SFEA"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "In a class of 60, 30 like Maths, 25 like Science, 10 like both. How many like neither?",
    options: ["10", "15", "20", "25"],
    answer: 1
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Find missing: 11, 23, 47, 95, ?",
    options: ["191", "192", "183", "200"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Clock: Angle at 5:40?",
    options: ["100°", "120°", "140°", "150°"],
    answer: 2
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "If 2x = 3y and y = 4z, find ratio x:z",
    options: ["3:4", "4:3", "6:1", "3:2"],
    answer: 0
  },
  {
    module: "Logical Reasoning",
    difficulty: "hard",
    question: "Find odd word: Pen, Book, Paper, Chair",
    options: ["Pen", "Book", "Paper", "Chair"],
    answer: 3
  }
);
// --------------- HR Interview ---------------
QUESTION_BANK.push(

/* EASY (10) */
{
  module: "HR Interview",
  difficulty: "easy",
  question: "Why do HRs ask 'Tell me about yourself' first?",
  options: [
    "To check technical knowledge",
    "To break the ice and understand background",
    "To test English grammar only",
    "To check coding speed"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "What should you avoid when answering about weaknesses?",
  options: [
    "Being honest",
    "Showing willingness to improve",
    "Saying you have no weaknesses",
    "Giving a real-life example"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "What is the best reason for 'Why should we hire you?'",
  options: [
    "Because I need a job",
    "I am better than everyone",
    "My skills match the job and I can contribute",
    "I will work for low salary"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "Which is a good attitude in an interview?",
  options: [
    "Overconfidence",
    "Polite confidence",
    "Arguing",
    "Talking too much"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "What should you research before interview?",
  options: [
    "TV shows",
    "Company & role",
    "Interviewer hobbies",
    "Nothing"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "Best dress code for an interview?",
  options: [
    "Casual T-shirt",
    "Formal and neat",
    "Party wear",
    "Gym clothes"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "How should you talk during interview?",
  options: [
    "Very fast",
    "Very slow",
    "Clear and confident",
    "Shout to show confidence"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "What should you do if you don’t know an answer?",
  options: [
    "Guess something",
    "Lie confidently",
    "Admit and explain how you'd find it",
    "Stay silent"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "What does HR mainly check?",
  options: [
    "Only coding",
    "Only IQ",
    "Behavior, communication, fit",
    "Typing speed"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "When should you arrive?",
  options: [
    "30 minutes late",
    "Exactly on time",
    "5–10 minutes early",
    "Whenever"
  ],
  answer: 2
},

/* MEDIUM (10) */
{
  module: "HR Interview",
  difficulty: "medium",
  question: "How do you answer: 'Why do you want to join our company?'",
  options: [
    "Because salary is high",
    "Your projects, culture and learning fit my goals",
    "My friend works here",
    "I couldn't get anywhere else"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "What is STAR method used for?",
  options: [
    "Technical coding",
    "Behavioral answers (Situation-Task-Action-Result)",
    "Salary discussion",
    "Resume formatting"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "How to answer 'Gap in education/career'?",
  options: [
    "Hide it",
    "Blame others",
    "Explain honestly + what you learned",
    "Say it was useless"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "Which shows teamwork?",
  options: [
    "I always work alone",
    "I help teammates and communicate clearly",
    "I ignore others",
    "I take credit for all work"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "What is the safest answer to 'salary expectations' (fresher)?",
  options: [
    "Very high demand",
    "Anything, I don’t care",
    "As per company standards and role",
    "Double the market"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "How do you respond to criticism?",
  options: [
    "Argue",
    "Take feedback, improve, clarify if needed",
    "Ignore it",
    "Get angry"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "Best answer for 'strengths'?",
  options: [
    "Random skills",
    "Strengths matching job role",
    "Everything",
    "Copy resume text"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "Employer asks: 'Can you relocate?'",
  options: [
    "Say NO immediately",
    "Say YES always",
    "Answer honestly with reason",
    "Ignore question"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "What should you ask at end of interview?",
  options: [
    "When will I be fired?",
    "No questions",
    "Questions about role, team, expectations",
    "Salary again"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "medium",
  question: "What is cultural fit?",
  options: [
    "Same religion",
    "Same age",
    "Values match company work culture",
    "Same hobbies"
  ],
  answer: 2
},

/* HARD (10) */
{
  module: "HR Interview",
  difficulty: "hard",
  question: "Interviewer asks: 'Convince me to hire you in 60 seconds.' Best approach?",
  options: [
    "Talk non-stop fast",
    "Summarize skills + impact + passion relevant to role",
    "Criticize competitors",
    "Repeat resume"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "How to answer: 'Tell me about a failure'?",
  options: [
    "Say you never failed",
    "Blame others",
    "Explain situation, mistake, lesson, improvement",
    "Laugh it off"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "What is behavioral interview mainly testing?",
  options: [
    "Who you know",
    "Past actions predict future behavior",
    "IQ score",
    "Dress style"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "How to handle stress-interview style questions?",
  options: [
    "Get emotional",
    "Stay calm, think logically, answer respectfully",
    "Argue",
    "Walk out"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "Answer for 'Why should we NOT hire you?'",
  options: [
    "Because I am lazy",
    "Because I hate deadlines",
    "I may need guidance initially, but I learn fast",
    "I don't like teamwork"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "What is the correct way to discuss weaknesses?",
  options: [
    "Choose unrelated weakness",
    "Show weakness + improvement plan",
    "Say you have none",
    "Share personal problems"
  ],
  answer: 1
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "What if interviewer interrupts repeatedly?",
  options: [
    "Interrupt back",
    "Stop answering",
    "Stay composed and adjust briefly",
    "Complain"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "How to answer: 'Where do you see yourself in 5 years?'",
  options: [
    "CEO of your company",
    "Abroad definitely",
    "Growing in role with more responsibilities",
    "Don't know"
  ],
  answer: 2
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "What should NOT be discussed in HR interview?",
  options: [
    "Company values",
    "Your goals",
    "Work expectations",
    "Negative talk about previous employer"
  ],
  answer: 3
},
{
  module: "HR Interview",
  difficulty: "hard",
  question: "Final tip for HR interview?",
  options: [
    "Be yourself, honest, prepared",
    "Memorize all answers",
    "Copy friends' answers",
    "Speak nonstop"
  ],
  answer: 0
}

);
// --------------- Technical Interview ---------------
QUESTION_BANK.push(

/* EASY (10) */
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "What is the main purpose of an operating system?",
  options: [
    "Play games",
    "Manage hardware and software resources",
    "Store only images",
    "Connect to internet only"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "Which data structure works on FIFO?",
  options: ["Stack", "Queue", "Tree", "Graph"],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "Which language is best known for web styling?",
  options: ["HTML", "Python", "CSS", "SQL"],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "What does SQL stand for?",
  options: [
    "Structured Query Language",
    "Simple Question List",
    "System Query Log",
    "Software Quality Lab"
  ],
  answer: 0
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "What is debugging?",
  options: [
    "Creating code",
    "Removing errors from code",
    "Writing comments",
    "Compiling"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "Which is an example of compiled language?",
  options: ["Python", "JavaScript", "C++", "HTML"],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "Which device stores data permanently?",
  options: ["RAM", "Hard Disk", "Cache", "Register"],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "What is a function?",
  options: [
    "A variable",
    "A block of reusable code",
    "A database",
    "A library"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "Which of the following is NOT a programming language?",
  options: ["Java", "C", "Photoshop", "Python"],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "easy",
  question: "Which protocol is used for web communication?",
  options: ["HTTP", "FTP", "SSH", "SMTP"],
  answer: 0
},

/* MEDIUM (10) */
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is the time complexity of binary search?",
  options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is encapsulation in OOP?",
  options: [
    "Hiding data and exposing only necessary parts",
    "Writing long code",
    "Connecting classes",
    "Running code faster"
  ],
  answer: 0
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "Which sorting algorithm is generally fastest on average?",
  options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is a foreign key in SQL?",
  options: [
    "Primary key of the same table",
    "Column that uniquely identifies each row",
    "Key linking one table to another",
    "Temporary key"
  ],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What does API stand for?",
  options: [
    "Application Programming Interface",
    "Advanced Program Input",
    "Applied Program Interaction",
    "Automatic Process Instruction"
  ],
  answer: 0
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is recursion?",
  options: [
    "Looping infinitely",
    "Function calling itself",
    "Program crash",
    "Compiling multiple times"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "Which is NOT NoSQL?",
  options: ["MongoDB", "Cassandra", "MySQL", "Redis"],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is multithreading?",
  options: [
    "Running one process",
    "Running multiple threads concurrently",
    "Deleting processes",
    "Encrypting code"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is a pointer in C?",
  options: [
    "Stores images",
    "Stores memory address of another variable",
    "Stores functions",
    "Stores constants"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "medium",
  question: "What is continuous integration (CI)?",
  options: [
    "Writing code manually",
    "Deploying directly on prod",
    "Frequently merging code to shared repo",
    "Copying code"
  ],
  answer: 2
},

/* HARD (10) */
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What problem does deadlock describe?",
  options: [
    "Loop stuck forever",
    "Two processes waiting on each other indefinitely",
    "Memory overflow",
    "CPU overheating"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What is normalization in databases?",
  options: [
    "Adding redundancy",
    "Removing redundancy & improving consistency",
    "Encrypting tables",
    "Deleting duplicates manually"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What is big-O of Merge Sort?",
  options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What is a race condition?",
  options: [
    "Two users running",
    "Output depends on execution timing of threads",
    "Slow program",
    "Cache issue"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What is polymorphism?",
  options: [
    "Ability to take many forms",
    "Copying objects",
    "Deleting objects",
    "Encrypting objects"
  ],
  answer: 0
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "Why do we use indexing in SQL?",
  options: [
    "To slow queries",
    "To store more rows",
    "To speed up search operations",
    "To delete data faster"
  ],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What does CAP theorem say?",
  options: [
    "All systems must be perfect",
    "Cannot have consistency, availability, partition tolerance all fully",
    "Databases never fail",
    "Only NoSQL matters"
  ],
  answer: 1
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What is garbage collection?",
  options: [
    "Freeing unused memory automatically",
    "Deleting files",
    "Cleaning database",
    "Restarting programs"
  ],
  answer: 0
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "What is Docker mainly used for?",
  options: [
    "Games",
    "Virtualizing full OS",
    "Containerizing apps consistently",
    "Debugging logs"
  ],
  answer: 2
},
{
  module: "Technical Interview",
  difficulty: "hard",
  question: "Why microservices are used?",
  options: [
    "Single large codebase",
    "Hard to scale",
    "Independent deployable small services",
    "Slower development"
  ],
  answer: 2
}

);
// --------------- Quantitative Aptitude ---------------
QUESTION_BANK.push(

/* EASY (10) */
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "What is 25% of 200?",
  options: ["25", "40", "50", "75"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "Solve: 12 × 6",
  options: ["60", "66", "72", "84"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "If a pen costs ₹10, what is the cost of 8 pens?",
  options: ["₹60", "₹70", "₹80", "₹90"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "Simplify: 100 ÷ 4",
  options: ["20", "25", "30", "40"],
  answer: 1
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "What is the square of 9?",
  options: ["72", "81", "90", "99"],
  answer: 1
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "Which is greater: 3/4 or 2/3?",
  options: ["3/4", "2/3", "Equal", "Cannot say"],
  answer: 0
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "A dozen means:",
  options: ["6", "8", "10", "12"],
  answer: 3
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "What is 10% of 500?",
  options: ["30", "40", "50", "60"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "Convert 0.5 to a fraction.",
  options: ["1/4", "1/2", "2/5", "5/2"],
  answer: 1
},
{
  module: "Quantitative Aptitude",
  difficulty: "easy",
  question: "What is the average of 4, 6, 8?",
  options: ["5", "6", "7", "8"],
  answer: 2
},

/* MEDIUM (10) */
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "A train runs 120 km in 2 hours. What is its speed?",
  options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "If selling price is ₹120 and profit is ₹20, cost price is:",
  options: ["₹80", "₹90", "₹100", "₹110"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "Ratio of 2:3 is equal to:",
  options: ["4:6", "6:10", "8:10", "10:12"],
  answer: 0
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "Solve: Simple Interest on ₹1000 at 10% for 2 years.",
  options: ["₹100", "₹150", "₹200", "₹250"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "Find missing number: 2, 4, 8, 16, __",
  options: ["24", "30", "32", "36"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "A man spends 2/5 of his salary. He saves:",
  options: ["1/5", "2/5", "3/5", "4/5"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "If 3 workers complete work in 6 days, 6 workers complete in:",
  options: ["1 day", "2 days", "3 days", "6 days"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "The perimeter of a square of side 5 cm is:",
  options: ["10 cm", "15 cm", "20 cm", "25 cm"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "Find x: 4x = 24",
  options: ["4", "5", "6", "8"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "medium",
  question: "Selling price ₹240, loss ₹40. Cost price?",
  options: ["₹180", "₹200", "₹220", "₹260"],
  answer: 1
},

/* HARD (10) */
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "Compound interest on ₹1000 at 10% for 2 years is:",
  options: ["₹200", "₹210", "₹220", "₹230"],
  answer: 1
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "Two numbers are in ratio 3:5 and sum is 64. Larger number is:",
  options: ["24", "32", "40", "48"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "A car travels 300 km at 60 km/h. Time taken?",
  options: ["3 hours", "4 hours", "5 hours", "6 hours"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "Find missing term: 5, 11, 23, 47, __",
  options: ["95", "97", "99", "101"],
  answer: 1
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "Average of 8 numbers is 20. Sum is:",
  options: ["120", "140", "150", "160"],
  answer: 3
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "Pipe A fills tank in 4 hrs, B in 6 hrs. Together:",
  options: ["1 hr", "1.5 hrs", "2.4 hrs", "5 hrs"],
  answer: 2
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "If SP is ₹150 and profit is 20%, CP is:",
  options: ["₹100", "₹110", "₹120", "₹125"],
  answer: 3
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "What is 15% of 240?",
  options: ["30", "32", "34", "36"],
  answer: 3
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "If 12 men finish work in 15 days, 6 men finish in:",
  options: ["10", "15", "20", "30"],
  answer: 3
},
{
  module: "Quantitative Aptitude",
  difficulty: "hard",
  question: "Profit % when CP=₹200, SP=₹250:",
  options: ["15%", "20%", "25%", "30%"],
  answer: 2
}

);
// --------------- HR Interview ---------------
QUESTION_BANK.push(

/* EASY (10) */
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "Why do recruiters ask 'Tell me about yourself'?",
  options: [
    "To check hobbies only",
    "To understand your profile summary",
    "To test coding skills",
    "To evaluate handwriting"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "What should you avoid during interviews?",
  options: [
    "Eye contact",
    "Clear answers",
    "Talking negatively about previous jobs",
    "Listening carefully"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "What is your weakness best answer style?",
  options: [
    "Say you have no weaknesses",
    "Blame others",
    "Share real weakness with improvement plan",
    "Ignore question"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "Why companies ask 'Why should we hire you?'",
  options: [
    "To check salary expectation",
    "To check self-confidence and fit",
    "To check degree",
    "To check family details"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "What shows good communication?",
  options: [
    "Talking fast",
    "Listening actively",
    "Interrupting",
    "Using slang"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "What is professional dress code called?",
  options: ["Formal", "Casual", "Sports", "Ethnic"],
  answer: 0
},
{
  module: "HR Interview",
  difficulty: "easy",
  question: "What is notice period?",
  options: [
    "Holiday duration",
    "Time before leaving a job",
    "Training time",
    "Overtime hours"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "Why employers ask about teamwork?",
  options: [
    "To judge friend circle",
    "To check leadership ability",
    "To see work culture fit",
    "To check marks"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "What should you do if you don’t know an answer?",
  options: [
    "Guess",
    "Stay silent",
    "Politely admit & show willingness to learn",
    "Leave interview"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "easy",
  question: "Best way to end interview?",
  options: [
    "Walk out silently",
    "Say bye casually",
    "Thank interviewer and ask questions",
    "Check phone"
  ],
  answer: 2
},

/* MEDIUM (10) */
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "Why do HRs ask about career goals?",
  options: [
    "To judge future stability",
    "To plan salary hikes",
    "To test memory",
    "To discuss vacations"
  ],
  answer: 0
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "What is cultural fit?",
  options: [
    "Wearing same clothes",
    "Matching company values & work style",
    "Age similarity",
    "Same hometown"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "How to answer gap in resume?",
  options: [
    "Hide it",
    "Lie",
    "Explain honestly with learning done",
    "Blame college"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "Why ask 'What motivates you?'",
  options: [
    "To test emotions",
    "To understand workplace drivers",
    "To increase workload",
    "To compare hobbies"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "Handling conflict best response?",
  options: [
    "Avoid always",
    "Argue strongly",
    "Listen, discuss, resolve professionally",
    "Complain immediately"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "What is work ethic?",
  options: [
    "Time pass",
    "Commitment and responsibility",
    "Salary demand",
    "Friendliness"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "What is STAR method?",
  options: [
    "Resume format",
    "Interview storytelling technique",
    "Salary formula",
    "Project plan"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "How to discuss salary?",
  options: [
    "Demand maximum",
    "Say anything",
    "Discuss respectfully with justification",
    "Avoid topic always"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "Why ask about failures?",
  options: [
    "To insult candidate",
    "To see learning attitude",
    "To reduce marks",
    "For fun"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "medium",
  question: "What is job hopping?",
  options: [
    "Changing jobs frequently",
    "Doing remote work",
    "Doing internships",
    "Night shifts"
  ],
  answer: 0
},

/* HARD (10) */
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "Explain handling toxic coworker.",
  options: [
    "Argue openly",
    "Ignore deadlines",
    "Address professionally & escalate if needed",
    "Quit immediately"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "Why HR checks stability history?",
  options: [
    "For gossip",
    "To ensure long-term retention",
    "To reduce training",
    "To negotiate salary"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "How to answer overqualification concerns?",
  options: [
    "Say job is easy",
    "Show willingness to grow with role",
    "Ask for less work",
    "Say nothing"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "What should you say when asked about previous manager?",
  options: [
    "Complain",
    "Criticize",
    "Stay respectful & professional",
    "Blame team"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "Describe handling missed deadline.",
  options: [
    "Hide mistake",
    "Blame team",
    "Communicate early & plan recovery",
    "Quit project"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "Why companies value adaptability?",
  options: [
    "To increase workload",
    "Because tech & roles change fast",
    "To avoid hiring",
    "For fun"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "How to answer 'Why leaving your job?'",
  options: [
    "Salary only",
    "Negative comments",
    "Growth & learning focus",
    "Blame company"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "What is emotional intelligence at work?",
  options: [
    "Ignoring emotions",
    "Managing own & others' emotions wisely",
    "Crying easily",
    "Being silent"
  ],
  answer: 1
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "How to handle offer from another company?",
  options: [
    "Hide it",
    "Threaten HR",
    "Discuss transparently & respectfully",
    "Reject immediately"
  ],
  answer: 2
},
{
  module: "HR Interview Questions",
  difficulty: "hard",
  question: "What shows true leadership?",
  options: [
    "Ordering people",
    "Taking credit",
    "Owning mistakes, supporting team",
    "Being strict only"
  ],
  answer: 2
}

);
