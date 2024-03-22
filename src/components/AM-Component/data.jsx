export const nodes = [
    {
        id: 1,
        name: "Design homepage",
        deadline: new Date(2024, 3, 30), // Note: JavaScript months are 0-indexed
        type: "Design",
        isComplete: false,
        nodes: [
            {
                id: 2,
                name: "Create wireframe",
                deadline: new Date(2024, 3, 20),
                type: "Subtask",
                isComplete: false,

            },
            {
                id: 3,
                name: "Collect feedback",
                deadline: new Date(2024, 3, 25),
                type: "Subtask",
                isComplete: false,
            },
        ],
    },
    {
        id: 4,
        name: "Implement login feature",
        deadline: new Date(2024, 4, 15),
        type: "Development",
        isComplete: true,
        nodes: [
            {
                id: 5,
                name: "Write authentication logic",
                deadline: new Date(2024, 4, 5),
                type: "Subtask",
                isComplete: true,
            },
            {
                id: 6,
                name: "Design login form",
                deadline: new Date(2024, 4, 10),
                type: "Subtask",
                isComplete: true,
            },
        ],
    },
    // Add more tasks as needed
];
