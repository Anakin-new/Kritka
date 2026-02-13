const quizData = {
    "Database Management": {
        "Full BCA Question Bank": [
            {
                "q": "What is known as the 'heart' of a database that manages data storage and retrieval?",
                "options": ["DBMS Engine", "SQL Viewer", "Data Dictionary", "Metadata"],
                "correct": 0
            },
            {
                "q": "Which level of the 3-schema architecture describes how the data is physically stored on the disk?",
                "options": ["Conceptual Level", "Internal Level", "External Level", "Logical Level"],
                "correct": 1
            },
            {
                "q": "In the Relational Model, a 'Tuple' refers to which of the following?",
                "options": ["A Column", "A Table", "A Row", "A Primary Key"],
                "correct": 2
            },
            {
                "q": "Which of the following is a 'Data Definition Language' (DDL) command?",
                "options": ["SELECT", "INSERT", "UPDATE", "CREATE"],
                "correct": 3
            },
            {
                "q": "A Primary Key must be both ________ and ________.",
                "options": ["Null and Unique", "Unique and Not Null", "Foreign and Primary", "Large and Complex"],
                "correct": 1
            },
            {
                "q": "Which type of join returns all records when there is a match in either left or right table?",
                "options": ["Inner Join", "Left Join", "Full Outer Join", "Cross Join"],
                "correct": 2
            },
            {
                "q": "In an E-R Diagram, what does a 'Diamond' shape represent?",
                "options": ["Entity", "Attribute", "Relationship", "Weak Entity"],
                "correct": 2
            },
            {
                "q": "Which Normal Form is based on the concept of 'Transitive Dependency'?",
                "options": ["1NF", "2NF", "3NF", "BCNF"],
                "correct": 2
            },
            {
                "q": "A 'Foreign Key' is used to establish which of the following?",
                "options": ["Data Redundancy", "Relationship between tables", "Physical Storage", "Index"],
                "correct": 1
            },
            {
                "q": "The 'ACID' property 'I' stands for what?",
                "options": ["Integration", "Isolation", "Iteration", "Information"],
                "correct": 1
            },
            {
                "q": "Which command is used to remove all records from a table but keep the structure?",
                "options": ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
                "correct": 2
            },
            {
                "q": "The number of tuples in a relation is called its ________.",
                "options": ["Degree", "Cardinality", "Attribute count", "Domain"],
                "correct": 1
            },
            {
                "q": "Which of the following is an example of an Object-Based Data Model?",
                "options": ["Network Model", "Hierarchical Model", "E-R Model", "Relational Model"],
                "correct": 2
            },
            {
                "q": "What is 'Data Independence' in DBMS?",
                "options": ["Ability to share data", "Security of data", "Ability to change schema at one level without affecting others", "Backup recovery"],
                "correct": 2
            },
            {
                "q": "Which Normal Form requires that there are no partial functional dependencies?",
                "options": ["1NF", "2NF", "3NF", "4NF"],
                "correct": 1
            },
            {
                "q": "In SQL, which operator is used for pattern matching (wildcards)?",
                "options": ["EXISTS", "BETWEEN", "LIKE", "MATCH"],
                "correct": 2
            },
            {
                "q": "What is the full form of BCNF?",
                "options": ["Basic Codd Normal Form", "Boyce-Codd Normal Form", "Binary Codd Normal Form", "Base Code Normal Form"],
                "correct": 1
            },
            {
                "q": "An attribute that can have multiple values (like phone numbers) is called:",
                "options": ["Simple Attribute", "Composite Attribute", "Multi-valued Attribute", "Derived Attribute"],
                "correct": 2
            },
            {
                "q": "Which command is used to save changes made by a transaction permanently?",
                "options": ["ROLLBACK", "COMMIT", "SAVEPOINT", "GRANT"],
                "correct": 1
            },
            {
                "q": "Who is considered the father of the Relational Database Model?",
                "options": ["Charles Bachman", "E.F. Codd", "James Gosling", "Bill Gates"],
                "correct": 1
            }
        ]
    },


    "Data Structures": {
    "Full BCA Question Bank": [
        {
            "q": "Which data structure follows the 'Last In First Out' (LIFO) principle?",
            "options": ["Queue", "Linked List", "Stack", "Tree"],
            "correct": 2
        },
        {
            "q": "What is the time complexity of accessing an element in an array by its index?",
            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            "correct": 0
        },
        {
            "q": "In a Singly Linked List, what does the 'next' pointer of the last node contain?",
            "options": ["Address of head", "Address of previous node", "NULL", "Zero"],
            "correct": 2
        },
        {
            "q": "Which data structure is best for implementing a 'First In First Out' (FIFO) scenario?",
            "options": ["Stack", "Queue", "Binary Tree", "Graph"],
            "correct": 1
        },
        {
            "q": "What is the process of visiting every node in a data structure exactly once called?",
            "options": ["Searching", "Sorting", "Traversing", "Inserting"],
            "correct": 2
        },
        {
            "q": "A Doubly Linked List contains which of the following pointers in each node?",
            "options": ["Next only", "Prev only", "Next and Prev", "None"],
            "correct": 2
        },
        {
            "q": "In a Binary Tree, what is the maximum number of children a node can have?",
            "options": ["1", "2", "3", "Unlimited"],
            "correct": 1
        },
        {
            "q": "Which sorting algorithm works by repeatedly swapping adjacent elements if they are in the wrong order?",
            "options": ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
            "correct": 2
        },
        {
            "q": "A queue where elements can be added or removed from both ends is called a ________.",
            "options": ["Priority Queue", "Circular Queue", "Deque", "Linear Queue"],
            "correct": 2
        },
        {
            "q": "What is the result of an 'In-order' traversal of a Binary Search Tree (BST)?",
            "options": ["Descending Order", "Random Order", "Ascending Order", "Root is always first"],
            "correct": 2
        },
        {
            "q": "Which data structure is required to implement Recursion?",
            "options": ["Stack", "Queue", "Linked List", "Array"],
            "correct": 0
        },
        {
            "q": "What is the main advantage of a Circular Linked List?",
            "options": ["Uses less memory", "Can be traversed from any node", "Easier to delete nodes", "No pointers used"],
            "correct": 1
        },
        {
            "q": "In a Binary Search algorithm, the list must already be ________.",
            "options": ["Unsorted", "Sorted", "Small", "Empty"],
            "correct": 1
        },
        {
            "q": "Which data structure is used to represent a hierarchical relationship?",
            "options": ["Queue", "Stack", "Tree", "Array"],
            "correct": 2
        },
        {
            "q": "What is a 'Full Binary Tree'?",
            "options": ["All nodes have 2 children", "Every node has 0 or 2 children", "Leaves are at different levels", "Only the root has children"],
            "correct": 1
        },
        {
            "q": "Which sorting algorithm is based on the 'Divide and Conquer' strategy?",
            "options": ["Bubble Sort", "Selection Sort", "Merge Sort", "Linear Search"],
            "correct": 2
        },
        {
            "q": "In a Stack, the operation to remove an element is called ________.",
            "options": ["Push", "Enqueue", "Pop", "Dequeue"],
            "correct": 2
        },
        {
            "q": "What is the height of an empty tree?",
            "options": ["0", "-1", "1", "Infinity"],
            "correct": 1
        },
        {
            "q": "Which of the following is a non-linear data structure?",
            "options": ["Stack", "Queue", "Graph", "Array"],
            "correct": 2
        },
        {
            "q": "The 'Front' and 'Rear' pointers are used in which data structure?",
            "options": ["Stack", "Queue", "Tree", "Linked List"],
            "correct": 1
        }
    ]
}



    
};