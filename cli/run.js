import inquirer from 'inquirer';

export default class RunScript {
    constructor(questions, answersHandler) {
        this.id = (new Date()).getTime();
        this.questions = questions || [];
        this.answersHandler = answersHandler || (() => {});
    }

    run() {
        inquirer.prompt(this.questions, this.answersHandler);
    }
}