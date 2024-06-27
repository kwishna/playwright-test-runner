import { test as myTest, expect } from "@playwright/test";
type me = {
    name: string,
    age: number,
    address: string,
    skills: string[]
}

const fixturized = myTest.extend<me>({
    name: "Krishna",
    age: 25,
    address: "delhi",
    skills: ["java", "python"]
});

// fixturized.describe("my test", () => {
//     test('should add an item', async ({ page, name, age, address, skills }) => {
//         expect(name).toBe("Krishna");
//         expect(age).toBe(25);
//         expect(address).toBe("delhi");
//         expect(skills).toEqual(["java", "python"]);
//     });
// })

export const test = fixturized;