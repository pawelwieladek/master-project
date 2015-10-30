import inquirer from 'inquirer';

class Form {
    constructor(questions, answersHandler) {
        this.id = (new Date()).getTime();
        this.questions = questions || [];
        this.answersHandler = answersHandler || (() => {});
    }

    submit() {
        inquirer.prompt(this.questions, this.answersHandler);
    }
}

class FormBuilder {
    constructor() {
        this.questions = null;
        this.answersHandler = null;
    }

    withQuestions(questions) {
        this.questions = questions;
        return this;
    }

    withAnswersHandler(answersHandler) {
        this.answersHandler = answersHandler;
        return this;
    }

    build() {
        return new Form(this.questions, this.answersHandler);
    }
}

export default function formBuilder() {
    return new FormBuilder();
}
