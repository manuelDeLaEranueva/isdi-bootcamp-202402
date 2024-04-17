class ContentError extends Error {
    constructor(message) {
        super(message);
        //this.name = ContentError.name
        this.name = this.constructor.name;
    }
}
class SystemError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class DuplicityError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class CredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
const errors = {
    ContentError,
    SystemError,
    DuplicityError,
    CredentialsError,
    NotFoundError
};
export { ContentError, SystemError, DuplicityError, CredentialsError, NotFoundError };
export default errors;
