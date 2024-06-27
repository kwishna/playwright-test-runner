export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASEURL: string
        }
    }
}