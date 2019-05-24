let board = new Array();
let i,j;
$(document).ready(function(e){
    newgame();
});

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个各自声称的数字
    generateOneNumber();
    generateOneNumber();
}

function getPosTop(i, j) {
    return 40 + i * 120;
}

function getPosLeft(i, j) {
    return 40 + j * 120;
}
function getNumberBackgroundColor(number) {
    switch (number) {
    case 2:
        return "#eee4da";
        break;
    case 4:
        return "#eee4da";
        break;
    case 8:
        return "#f26179";
        break;
    case 16:
        return "#f59563";
        break;
    case 32:
        return "#f67c5f";
        break;
    case 64:
        return "#f65e36";
        break;
    case 128:
        return "#edcf72";
        break;
    case 256:
        return "#edcc61";
        break;
    case 512:
        return "#9c0";
        break;
    case 1024:
        return "#3365a5";
        break;
    case 2048:
        return "#09c";
        break;
    case 4096:
        return "#a6bc";
        break;
    case 8192:
        return "#93c";
        break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}

//在随机生成数字的时候判断16宫格中是否还有空间
function nospace(board) {
    for ( let i = 0; i < 4; i++) 
        for ( let j = 0; j < 4; j++) 
            if (board[i][j] == 0)
                return false;
    return true;
}

//实现功能判断
function canMoveLeft( board ){
    for(let i = 0;i<4;i++)
        for(let j = 1;j<4;j++)
            if( board[i][j] !=0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                    return true;
                    
    return false;
}
function canMoveRight( board ){
    for(let i = 0;i<4;i++)
        for(let j = 0;j<3;j++)
            if( board[i][j] !=0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
                    
    return false;
}
function canMoveUp( board ){
    for(let i = 1;i<4;i++)
        for(let j = 0;j<4;j++)
            if( board[i][j] !=0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
                    
    return false;
}
function canMoveDown( board ){
    for(let i = 0;i<3;i++)
        for(let j = 0;j<4;j++)
            if( board[i][j] !=0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
                    
    return false;
}
//判断水平方向是否有障碍物
function noBlockHorizontal(row, col1, col2, board){
    for(let i = col1 + 1; i<col2; i++)
        if(board[row][i]!=0)
            return false;
    return true;
}
function noBlockVertical(cow, row1, row2, board){
    for(let i = row1+1; i<row2; i++)
        if(board[i][cow]!=0)
            return false;
    return true;
}
//最后收尾
function nomove(board){
    if(canMoveLeft(board)|| canMoveRight(board))
        return false;
    return true;
}
function showNumberWithAnimation(i, j, randNumber) {

    let numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);
    
    numberCell.animate({
        width : "100px",
        height : "100px",
        top : getPosTop(i, j),
        left : getPosLeft(i, j)
    }, 50);

}

function showMoveAnimation(fromx, fromy, tox, toy){
    
    let numberCell = $('#number-cell-'+fromx +'-'+fromy);
    numberCell.animate({top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy)},200);
}
function init(){
    for(let i = 0;i<4;i++){
        for(let j = 0;j<4;j++){
            let gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    
    for(let i = 0; i<4;i++){
        board[i] = new Array();
        for(let j = 0;j<4;j++){
            board[i][j] = 0;
        }
    }
    updateBoardView();
}
function updateBoardView(){
    $(".number-cell").remove();
    for(let i = 0;i<4;i++){
        for ( let j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            let theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //NumberCell覆盖
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(board[i][j]));//返回前景色
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
function generateOneNumber(){
    if (nospace(board)) 
        return false;
    
    //随机一个位置
    let randx = parseInt(Math.floor(Math.random()*4));
    let randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (board[randx][randy] == 0) 
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字
    let randNumber = Math.random()<0.5 ?2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

//事件响应循环
$(document).keydown(function(event){
    switch (event.keyCode) {
    case 37://left
        if(moveLeft()){
            //setTimeout("generateOneNumber()",210);
            generateOneNumber();//每次新增一个数字就可能出现游戏结束
            isgameover();//300毫秒
        }
        break;
    case 38://up
        if(moveUp()){
            generateOneNumber();//每次新增一个数字就可能出现游戏结束
            isgameover();
        }
        break;
    case 39://right
        if(moveRight()){
            generateOneNumber();//每次新增一个数字就可能出现游戏结束
            isgameover();
        }
        break;
    case 40://down
        if(moveDown()){
            generateOneNumber();//每次新增一个数字就可能出现游戏结束
            isgameover();
        }
        break;

    }
});

function isgameover(){
    if(nospace(board)&&nomove(board))
    alert("gameover");
    console.log("lose")
}

function moveLeft(){//更多地细节信息
    //判断格子是否能够向左移动
    if( !canMoveLeft(board))
        return false;
    
    //真正的moveLeft函数//标准
    for(let i = 0;i<4;i++)
        for(let j = 1;j<4;j++){//第一列的数字不可能向左移动
            if(board[i][j] !=0){
                //(i,j)左侧的元素
                for(let k = 0;k<j;k++){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight(){//更多地细节信息
    //判断格子是否能够向左移动
    if( !canMoveRight(board))
        return false;
    
    //真正的moveLeft函数//标准
    for(let i = 0;i<4;i++)
        for(let j = 0;j<3;j++){//第一列的数字不可能向左移动
            if(board[i][j] !=0){
                //(i,j)右侧的元素
                for(let k = 3;k>j;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){//更多地细节信息
    //判断格子是否能够向上移动
    if( !canMoveUp(board))
        return false;
    //真正的moveLeft函数//标准
    for(let i = 1;i<4;i++)
        for(let j = 0;j<4;j++){//第一列的数字不可能向左移动
            if(board[i][j] !=0){
                //(i,j)上侧的元素
                for(let k = 0;k<i;k++){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){//更多地细节信息
    //判断格子是否能够向左移动
    if( !canMoveDown(board))
        return false;
    
    //真正的moveLeft函数//标准
    for(let i = 0;i<3;i++)
        for(let j = 0;j<4;j++){//第一列的数字不可能向左移动
            if(board[i][j] !=0){
                //(i,j)左侧的元素
                for(let k = 3;k>i;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}