export function getBodyStatus(body) {
    if (!isAllFieldsPresent(body)) {
        return {
            isValid: false,
            message: getFieldAbsentMessage(body),
        }
    }

    if (!isAllFieldsValid(body)) {
        return {
            isValid: false,
            message: getFieldInvalidMessage(body),
        }
    }

    return {
        isValid: true,
        message: "",
    };
};

function isAllFieldsPresent({ title, description, price, count }) {
    return title && description && price && count;
}

function getFieldAbsentMessage({ title, description, price, count }) {
    if (!title) {
        return "Title is missing!";
    }
    if (!description) {
        return "Description is missing!";
    }
    if (!price) {
        return "Price is missing!";
    }
    if (!count) {
        return "Count is missing!";
    }
    return "Missing required fields!";
}

function isAllFieldsValid({ title, description, price, count }) {
    return isTitleValid(title) && isDescriptionValid(description) && isPriceValid(price) && isCountValid(count);
}

function getFieldInvalidMessage({ title, description, price, count }) {
    if (!isTitleValid(title)) {
        return "Title is invalid!";
    }
    if (!isDescriptionValid(description)) {
        return "Description is invalid!";
    }
    if (!isPriceValid(price)) {
        return "Price is invalid!";
    }
    if (!isCountValid(count)) {
        return "Count is invalid!";
    }
    return "Invalid fields!";
}

function isTitleValid(title) {
    return typeof title === "string" && title.length > 0;
}

function isDescriptionValid(description) {
    return typeof description === "string" && description.length > 0;
}

function isPriceValid(price) {
    return typeof price === "number" && price > 0;
}

function isCountValid(count) {
    return typeof count === "number" && count > 0;
}


