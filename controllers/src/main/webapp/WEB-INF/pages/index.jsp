<html>
<head>
    <title>To Do List</title>
    <script type="text/javascript" src="pages\script\jquery-1.9.1.js"></script>
    <script type="text/javascript" src="pages\script\jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="pages\script\dataModel.js"></script>
    <script type="text/javascript" src="pages\script\toDoList.js"></script>
    <script type="text/javascript" src="pages\script\util.js"></script>

    <link href="pages\style/style.css" rel="stylesheet">
    <link href="pages\style/jquery-ui-1.10.3.custom.css" rel="stylesheet">

    <script id="templateRow" type="text/x-jquery-tmpl">
        <div class="lineExecutedTask">
            <div class="divTask">
                <p class="fieldTask"></p>
                <textarea class="textAreaEdit"></textarea>
            </div>
            <div class="divButton">
                <button class="buttonToDo">
                    <img src="pages\\img\\check1.png" width="50px" height="50px">
                </button>
                <button class="buttonDelete">
                    <img src="pages\\img\\delete.png" width="50px" height="50px">
                </button>
            </div>
            <div class="divButtonEdit">
                <button class="buttonSave">
                    <img src="pages\\img\\save.png" width="50px" height="50px">
                </button>
                <button class="buttonCancel">
                    <img src="pages\\img\\cancel.png" width="50px" height="50px">
                </button>
            </div>
            <div class="divInformation">
                <p>Author:</p>

                <p class="authorField">Author:</p>

                <p>Assignee:</p>

                <p class="assigneeField">

                <p>
                    <input class="assigneeInput" type="text"/>

                <p>Date:</p>

                <p class="dateField">

                <p>
            </div>
        </div>
    </script>

</head>
<body>
<div id="headline">
    <h1> To do list</h1>
</div>
<div id="divCreateTask">
    <textarea id="taskInput"></textarea>
    <input class="assigneeInput" style="height: 36px;" type="text"/>
    <button id="buttonAdd" disabled=1>Add task</button>
</div>
<div class="tabbed_area">

    <ul class="tabs">
        <li><a id="tab_1" class="active">My tasks</a></li>
        <li><a id="tab_2">Other tasks</a></li>
    </ul>

    <div id="content_1" class="content">
        <h2 class="message">List task is empty.</h2>

        <div class="ListNotExecutedTasks"></div>
        <div class="ListExecutedTasks"></div>

    </div>
    <div id="content_2" class="content">
        <h2 class="message">List task is empty.</h2>

        <div class="ListNotExecutedTasks"></div>
        <div class="ListExecutedTasks"></div>
    </div>
</div>
</body>
</html>