//实例1
//点击 选择文件 按钮，选择一个图片文件后会执行这个方法，将图片的内容（以base64）写入 img标签 的src
function previewFile() {
    var preview = document.querySelector("img");
    var file = document.querySelector("#file1").files[0];
    var reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            preview.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file); //调用该方法读取文件 文件内容加载完成触发load事件
    }
}

function previewFile2() {
    var file = document.querySelector("#file2").files[0];
    var reader = new FileReader();

    reader.addEventListener(
        "load",
        function () {
            editor.setValue(reader.result);
        },
        false
    );

    if (file) {
        reader.readAsText(file);
    }
}

function saveContent(){
    writeFile(editor.getValue());
}

function getNewFileHandle() {
    const opts = {
        types: [
            {
                description: "Js file",
                accept: { "text/plain": [".js"] },
            },
        ],
    };
    return window.showSaveFilePicker(opts);
}

async function writeFile(contents) {
    const opts = {
        types: [
            {
                description: "Js file",
                accept: { "text/plain": [".js"] },
            },
        ],
    };
    var fileHandle = await window.showSaveFilePicker(opts);

    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();

    // Write the contents of the file to the stream.
    await writable.write(contents);

    // Close the file and write the contents to disk.
    await writable.close();
}
