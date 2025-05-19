export type User = {
    id: number;
    name: string;
    avatar: string | null;
};

export interface ChatMessage {
    id: number,
    user: User;
    body: string;
    time: Date;
};

const latte: User = {
    id: 1,
    name: "Latte",
    avatar: null
};

const mocha: User = {
    id: 2,
    name: "Mocha",
    avatar: null
};

const domino: User = {
    id: 3,
    name: "Domino",
    avatar: null
};

export const users: User[] = [latte, mocha, domino];

export const messages: ChatMessage[] = [
    {
        id: 1,
        user: latte,
        body: "aluwefhliawuhliufwehliufhawlifeh",
        time: new Date()
    },
    {
        id: 2,
        user: mocha,
        body: "laiuehfiauwhei",
        time: new Date()
    },
    {
        id: 3,
        user: domino,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim ornare sapien vitae rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis erat eu quam auctor dapibus. Quisque ut erat imperdiet, elementum arcu eget, commodo lorem. Nunc nisi ipsum, viverra nec enim eget, malesuada gravida ex. Maecenas sollicitudin ante ante, a molestie augue vestibulum eu. Donec convallis bibendum erat accumsan fringilla. Proin pellentesque mi id dolor volutpat pharetra. Etiam eget felis sed augue dictum tincidunt id vitae justo. Integer tincidunt felis pellentesque, condimentum odio feugiat, commodo urna. Donec et mauris scelerisque quam lobortis bibendum in vel augue. Nullam tincidunt posuere fermentum. Nullam iaculis risus eu pretium faucibus. ",
        time: new Date()
    },
    {
        id: 4,
        user: latte,
        body: "aluwefhliawuhliufwehliufhawlifeh",
        time: new Date()
    },
    {
        id: 5,
        user: mocha,
        body: "laiuehfiauwhei",
        time: new Date()
    },
    {
        id: 6,
        user: domino,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim ornare sapien vitae rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis erat eu quam auctor dapibus. Quisque ut erat imperdiet, elementum arcu eget, commodo lorem. Nunc nisi ipsum, viverra nec enim eget, malesuada gravida ex. Maecenas sollicitudin ante ante, a molestie augue vestibulum eu. Donec convallis bibendum erat accumsan fringilla. Proin pellentesque mi id dolor volutpat pharetra. Etiam eget felis sed augue dictum tincidunt id vitae justo. Integer tincidunt felis pellentesque, condimentum odio feugiat, commodo urna. Donec et mauris scelerisque quam lobortis bibendum in vel augue. Nullam tincidunt posuere fermentum. Nullam iaculis risus eu pretium faucibus. ",
        time: new Date()
    },
    {
        id: 7,
        user: domino,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim ornare sapien vitae rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis erat eu quam auctor dapibus. Quisque ut erat imperdiet, elementum arcu eget, commodo lorem. Nunc nisi ipsum, viverra nec enim eget, malesuada gravida ex. Maecenas sollicitudin ante ante, a molestie augue vestibulum eu. Donec convallis bibendum erat accumsan fringilla. Proin pellentesque mi id dolor volutpat pharetra. Etiam eget felis sed augue dictum tincidunt id vitae justo. Integer tincidunt felis pellentesque, condimentum odio feugiat, commodo urna. Donec et mauris scelerisque quam lobortis bibendum in vel augue. Nullam tincidunt posuere fermentum. Nullam iaculis risus eu pretium faucibus. ",
        time: new Date()
    }
];