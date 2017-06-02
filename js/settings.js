$(document).ready(function() {

    var container = document.getElementById("jsoneditor");
    var options = {
        mode: 'tree'
    };
    var editor = new JSONEditor(container, options);


    var json = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": { "a": "b", "c": "d" },
        "String": "Hello World"
    };


    editor.set(json);


    console.log(editor.get());

});

/*



*/