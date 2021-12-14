export class ResultNotFoundError extends Error {
    constructor() {
        super(`Result not found`);
        this.name = `Register not found on database`;
    }
}
