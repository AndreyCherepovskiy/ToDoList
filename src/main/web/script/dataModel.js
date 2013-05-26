login = "Author";

function Task(task, date, author, responsible) {
    this.content = task;
    this.date = date;
    this.author = author;
    this.responsible = responsible;
    this.isDone = false;
    this.id = freeId.getId();
};

collectionTask = {
    countOfTasks: 0,
    collection: [],
    addTask: function(argument){
        this.collection[this.countOfTasks] = argument;
        this.countOfTasks++;
    },
    getTask: function(id){
       for(i=0; i < this.collection.length;i++){
            if(this.collection[i].id == id){
                return this.collection[i];
            }
        }
    },
    removeTask: function(id){
        for(i=0; i < this.collection.length;i++){
            if(this.collection[i].id === id){
                this.collection.splice(i,1);
                break;
            }
        }
    },
    isEmpty: function(){
        return (this.countOfTasks === 0);
    }
};

var freeId = {
    id: 0,
    getId: function(){
        return this.id++;
    }
};