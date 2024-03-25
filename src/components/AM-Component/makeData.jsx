export function makeData(...lens) {
    const range = len => {
        const arr = []
        for (let i = 0; i < len; i++) {
            arr.push(i)
        }
        return arr
    }

    const jsonData = [

        {
            "name": "John Doe",
            "username": "johndoe123",
            "email": "johndoe@example.com",
            "emailVerifiedDate": "2023-05-15",
            "identityProvider": "Google",
            "multiFactorAuth": true,
            "createdDate": "2023-01-10",
            "lastModifiedDate": "2023-06-20",
            "lastLoginDate": "2023-06-25",
            "status": "active"
        },
        {
            "name": "Jane Smith",
            "username": "janesmith456",
            "email": "janesmith@example.com",
            "emailVerifiedDate": "2023-04-20",
            "identityProvider": "Facebook",
            "multiFactorAuth": false,
            "createdDate": "2023-02-15",
            "lastModifiedDate": "2023-07-30",
            "lastLoginDate": "2023-08-02",
            "status": "inactive"
        },
        {
            "name": "Michael Johnson",
            "username": "michaeljohnson789",
            "email": "michaeljohnson@example.com",
            "emailVerifiedDate": "2023-03-10",
            "identityProvider": "LinkedIn",
            "multiFactorAuth": true,
            "createdDate": "2023-03-01",
            "lastModifiedDate": "2023-09-10",
            "lastLoginDate": "2023-09-15",
            "status": "active"
        }



    ];

    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return jsonData.slice(0, len).map(data => {
            return {
                ...data,
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }


    return makeDataLevel()
}
