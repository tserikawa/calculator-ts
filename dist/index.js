import { evaluate } from '../node_modules/mathjs/';
// 電卓ディスプレイへの参照
const displayResult = document.getElementById("display-result");
const displayProcess = document.getElementById("display-process");
// ボタンへの参照（NodeListとして取得）
const buttons = document.querySelectorAll("button");
// 現在の入力と過去の入力を保持する変数
let currentInput = "";
let result = "";
let fullExpression = "";
// 全てのボタンにイベントリスナーを追加
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        // 数字や小数点の場合の処理
        if (!isNaN(Number(value)) || value === ".") {
            handleNumber(value);
        }
        // 演算子の場合の処理
        else if (value === "+" || value === "-" || value === "*" || value === "/") {
            handleOperator(value);
        }
        // パーセンテージ処理
        else if (value === "%") {
            handlePercentage();
        }
        // 括弧の処理
        else if (value === "(" || value === ")") {
            handleParentheses(value);
        }
        // =ボタンの処理
        else if (value === "=") {
            calculateResult();
        }
        // Cボタンの処理（クリア）
        else if (value === "C") {
            clearDisplay();
        }
    });
});
// 数字を入力したときの処理
function handleNumber(value) {
    if (currentInput.length < 10) { // 最大10桁まで
        currentInput += value;
        fullExpression += value;
        displayProcess.value = fullExpression; // 式全体を表示
    }
}
// 演算子を入力したときの処理
function handleOperator(value) {
    if (currentInput !== "") {
        currentInput = "";
        fullExpression += value; // 式全体に演算子を追加
        displayProcess.value = fullExpression; // 式全体を表示
    }
}
// パーセンテージを入力したときの処理
function handlePercentage() {
    if (currentInput !== "") {
        currentInput = (parseFloat(currentInput) / 100).toString();
        fullExpression = fullExpression.slice(0, -currentInput.length) + currentInput; // 式全体を更新
        displayResult.value = fullExpression;
    }
}
// 括弧を入力したときの処理
function handleParentheses(value) {
    fullExpression += value;
    displayProcess.value = fullExpression; // 式全体を表示
}
// 計算を実行する処理
function calculateResult() {
    try {
        const result = evaluate(fullExpression);
        displayProcess.value += "=";
        displayResult.value = result.toString(); // 結果を表示
        fullExpression = result.toString(); // 計算結果を次の計算に利用
        currentInput = ""; // 現在の入力をリセット
    }
    catch (error) {
        displayResult.value = "Error"; // エラー時はエラーメッセージを表示
    }
}
// ディスプレイをクリアする処理
function clearDisplay() {
    currentInput = "";
    fullExpression = "";
    displayResult.value = "";
    displayProcess.value = "";
}
