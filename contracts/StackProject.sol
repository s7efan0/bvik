// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract StackQuestion {
    error OnlyOwnerError();
    error WithdrawError();
    error CollectAnswerError();
    error IsClosedError();

    event answerAddedEvent();
    event answerAcceptedEvent();
    event cancelQuestionEvent();

    address private immutable owner;
    uint256 private id;
    string private title;
    string private bodyText;
    uint256 private bountyAmount;

    uint256 private answersCounter;
    bool private isClosed;
    bool private isAnswered;

    mapping(uint256 => StackAnswer) private answers;

    struct StackAnswer {
        address owner;
        uint256 id;
        string bodyText;
        bool isCorrect;
    }

    constructor(address _owner, uint256 _id, string memory _title, string memory _bodyText, uint256 _bountyAmount)
        payable
    {
        owner = _owner;
        id = _id;
        title = _title;
        bodyText = _bodyText;
        bountyAmount = _bountyAmount;

        answersCounter = 0;
        isClosed = false;
        isAnswered = false;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwnerError();
        }
        _;
    }

    modifier isStillOpen() {
        if (isClosed) {
            revert IsClosedError();
        }
        _;
    }

    function cancelQuestion() external onlyOwner isStillOpen {
        isClosed = true;
        isAnswered = false;
        (bool callSuccess,) = payable(owner).call{value: bountyAmount}("");
        if (!callSuccess) {
            revert WithdrawError();
        }

        emit cancelQuestionEvent();
    }

    function answerAccepted(uint256 answerId) external onlyOwner isStillOpen {
        isClosed = true;
        isAnswered = true;
        answers[answerId].isCorrect = true;
        (bool callSuccess,) = payable(answers[answerId].owner).call{value: bountyAmount}("");
        if (!callSuccess) {
            revert CollectAnswerError();
        }

        emit answerAcceptedEvent();
    }

    function addAnswer(string memory _bodyText) external isStillOpen {
        answers[answersCounter] = StackAnswer(msg.sender, answersCounter, _bodyText, false);
        answersCounter++;

        emit answerAddedEvent();
    }

    function getAnswer(uint256 answerId) external view returns (StackAnswer memory) {
        return answers[answerId];
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getId() external view returns (uint256) {
        return id;
    }

    function getTitle() external view returns (string memory) {
        return title;
    }

    function getBodyText() external view returns (string memory) {
        return bodyText;
    }

    function getBountyAmount() external view returns (uint256) {
        return bountyAmount;
    }

    function getAnswersCounter() external view returns (uint256) {
        return answersCounter;
    }

    function getIsClosed() external view returns (bool) {
        return isClosed;
    }

    function getIsAnswered() external view returns (bool) {
        return isAnswered;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getAllAnswers() external view returns (StackAnswer[] memory) {
        StackAnswer[] memory answerArray = new StackAnswer[](answersCounter);

        for (uint256 i = 0; i < answersCounter; i++) {
            answerArray[i] = answers[i];
        }

        return answerArray;
    }
}

contract StackQuestionsManager {
    error OnlyOwnerError();
    error WithdrawError();

    event StackQuestionsCreated(address owner, uint256 id, string title, string shortBodyText);

    event withdrawCalled(address owner);

    address private immutable owner;
    uint256 private counter;

    mapping(uint256 => StackQuestion) private questions;

    constructor() {
        owner = msg.sender;
        counter = 0;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwnerError();
        }
        _;
    }

    function addQuestion(string calldata _title, string calldata _bodyText) public payable {
        uint256 bountyAmount = msg.value;
        uint256 bountyAmountReduced = (bountyAmount * 9) / 10;
        StackQuestion stackQuestion =
            (new StackQuestion){value: bountyAmountReduced}(msg.sender, counter, _title, _bodyText, bountyAmountReduced);

        questions[counter] = stackQuestion;
        counter++;

        emit StackQuestionsCreated(msg.sender, counter, _title, _bodyText);
    }

    function withdraw() public onlyOwner {
        (bool callSuccess,) = payable(owner).call{value: address(this).balance}("");
        if (!callSuccess) {
            revert WithdrawError();
        }

        emit withdrawCalled(owner);
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getQuestion(uint256 questionId) external view returns (StackQuestion) {
        return questions[questionId];
    }

    function getCounter() external view returns (uint256) {
        return counter;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getAllQuestions() external view returns (StackQuestion[] memory) {
        StackQuestion[] memory questionsArray = new StackQuestion[](counter);

        for (uint256 i = 0; i < counter; i++) {
            questionsArray[i] = questions[i];
        }

        return questionsArray;
    }
}
