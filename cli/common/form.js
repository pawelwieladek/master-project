import inquirer from 'inquirer';

export default class Form {
    constructor(questions, answersHandler) {
        this.id = (new Date()).getTime();
        this.questions = questions || [];
        this.answersHandler = answersHandler || (() => {});
    }

    submit() {
        inquirer.prompt(this.questions, this.answersHandler);
    }
}
