$(document).ready(function () {
    $('#inputTask').bind('input',function () {
        if(isEmpty(this.value) === true){
            $('#button')[0].disabled = 1;
        }
        else{
            $('#button')[0].disabled = 0;
        }
    });
    
    if(collectionTask.isEmpty()){
        createMessage();
    }else{
        createList();
    }
    
 $("#button").click(function(){
        if(collectionTask.isEmpty()){
            deleteMessage();
            createList();
        }
        var textArea = $('#inputTask');
        var task = new Task(textArea.val(), getCurrentDate(), login);
        collectionTask.addTask(task);
        
        addRow(task);
        
        this.disabled = 1;
        textArea.val('');
    });
    
    
});

function createMessage(){
    var h2 = document.createElement("h2");
    h2.innerHTML =  'You have no tasks';
    h2.align = "center";
    h2.id = "message";
    document.body.appendChild(h2);
};

deleteMessage = function(){
   document.body.removeChild($('#message')[0]);
};


function createList(){
    var list = document.createElement("ol");
    list.border = "1";
    list.id = "list";
    document.body.appendChild(list);
}

deleteList = function(){
    document.body.removeChild($('#list')[0]);
};

addRow = function(task){
    var list = $('#list')[0];
    var row = document.createElement("li");
    row.id = task.id;
      
    var divTask = document.createElement("div");
    divTask.className = "divTask";

    var textTask = document.createElement("p");
    textTask.innerHTML = task.content;
    textTask.className = "fieldTask";
    if(task.isDone){
        textTask.style = "text-decoration: line-through";
    }
    divTask.appendChild(textTask);
    
    var textArea = document.createElement("textarea");
    textArea.className = "textAreaEdit";
    $(textArea).hide();   
    divTask.appendChild(textArea);
    
    row.appendChild(divTask);
    
    var divButton = document.createElement("div");
    $(divButton).hide();
    divButton.className = "divButton";
   
    var buttonToDo = document.createElement("button");
    buttonToDo.className = "buttonToDo";
    buttonToDo.innerHTML = '<img src="img\\check1.png" width="50px" height="50px">';
    divButton.appendChild(buttonToDo);
    
    var buttonDelete = document.createElement("button");
    buttonDelete.className = "buttonDelete";
    buttonDelete.innerHTML = '<img src="img\\delete.png" width="50px" height="50px">';
    divButton.appendChild(buttonDelete);
    
    row.appendChild(divButton);
    
    
    var divButtonEdit = document.createElement("div");
    $(divButtonEdit).hide();
    divButtonEdit.className = "divButtonEdit";
   
    var buttonSave = document.createElement("button");
    buttonSave.className = "buttonSave";
    buttonSave.innerHTML = '<img src="img\\save.png" width="50px" height="50px">';
    divButtonEdit.appendChild(buttonSave);
    
    var buttonCancel = document.createElement("button");
    buttonCancel.className = "buttonCancel";
    buttonCancel.innerHTML = '<img src="img\\cancel.png" width="50px" height="50px">';
    divButtonEdit.appendChild(buttonCancel);
    
    row.appendChild(divButtonEdit);
    
    var textAuthorDate = document.createElement("p");
    textAuthorDate.innerHTML = task.author + ' ' +task.date;
    textAuthorDate.className = "fieldAuthorDate";
    textAuthorDate.align = "right";
    row.appendChild(textAuthorDate);

    if(task.isDone){
        list.appendChild(row);
    }else{
        list.insertBefore(row, list.firstChild);
    }

    addEventHideDivButton(row);
    addEventShowDivButton(row);
    addEventDelete(buttonDelete);
    addEventToDo(buttonToDo);
    addEventEdit(row);
};

 addEventShowDivButton = function(row){
    $(row).mouseover(function(){
        if($(row).find(".fieldTask")[0].style.display !== "none"){
            $(this).find(".divButton").show();
        }
    });
 };
 
addEventHideDivButton = function(row){
     $(row).mouseout(function(){
        if($(row).find(".fieldTask")[0].style.display !== "none"){
            $(this).find(".divButton").hide();
        }
    });
 };

addEventEdit = function(row){
    var task = collectionTask.getTask(row.id);
    $(row).find(".fieldTask").dblclick(function(){
        $(row).find(".fieldTask").hide();
        $(row).find(".divButton").hide();
        $(row).find(".divButtonEdit").show();
        $(row).find(".textAreaEdit").show();        
        $(row).find(".textAreaEdit").val(task.content);
    });
    
    $(row).find(".textAreaEdit").bind('input',function () {
        if(isEmpty(this.value) === true){
           $(row).find(".buttonSave")[0].disabled = 1;
        }
        else{
           $(row).find(".buttonSave")[0].disabled = 0;
        }
    });
    
    $(row).find(".buttonSave").click(function(){
        $(row).find(".fieldTask").show();
        $(row).find(".divButton").show();
        $(row).find(".divButtonEdit").hide();
        $(row).find(".textAreaEdit").hide();;
        task.content = $(row).find(".textAreaEdit").val();
        $(row).find(".fieldTask").html(task.content);
    });
   
    $(row).find(".buttonCancel").click(function(){
        $(row).find(".fieldTask").show();
        $(row).find(".divButton").show();
        $(row).find(".divButtonEdit").hide();
        $(row).find(".textAreaEdit").hide();;
    });
};

addEventDelete = function(buttonDelete){
    $(buttonDelete).click(function(){
        var row = $(this).parent().parent();
        var task = collectionTask.getTask(row[0].id);
        if(task.author === login){
            if(confirm("Are you sure?")){             
               collectionTask.removeTask(row[0].id);
               row.remove();
            }
        }else{
            alert("You do not have permission to delete tasks if you are not the author.");
        }
        
    });
};

addEventToDo = function(buttonToDo){
    $(buttonToDo).click(function(){
        var row = $(this).parent().parent();
        var task = collectionTask.getTask(row[0].id);
        var list = $("#list");
        if(task.isDone === false){
           task.isDone = true;
           row.find($(".fieldTask"))[0].style.textDecoration  = "line-through";
           row.detach();
           row.appendTo('#list');
        }else{
           task.isDone = false;
           row.find($(".fieldTask"))[0].style.textDecoration  = "none";
           row.detach();
          list[0].insertBefore(row[0], list[0].firstChild);
        }
        
        
    });
};