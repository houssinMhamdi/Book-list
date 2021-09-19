// book constractor
    function Book(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn ;
    }

// UI constractor

function UI(){}

//add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //creat element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = 
    `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>`

    list.appendChild(row);

    UI.prototype.showAlert = function(message,className){
        //creat div
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        //add text noode
        div.appendChild(document.createTextNode(message));
        //ger the parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
           //desepear after 2 sec
           setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000)
     
    }
    //delet book
    UI.prototype.deleteBook = function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }


    UI.prototype.clearFiled = function(){
     title = document.getElementById('title').value = '';
     author = document.getElementById('author').value = '';
     isbn = document.getElementById('isbn').value = '';
    }

}

// Event Listeners 

document.getElementById("book-form").addEventListener('submit',function(e){
    // get form values
    const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const  isbn = document.getElementById('isbn').value;

     //Instantiat book 
     const book = new Book(title ,author, isbn);
     
     //Instantiat Ui 
     const ui = new UI();
    //validate
     if (title === '' || author === '' || isbn === '') {
        //error alert
      
        ui.showAlert('Pleas fill in all fileds','error');
     }
     else{
         //add book to list
         ui.addBookToList(book);
         ui.showAlert('book added succesfuly','success');
        //clear filed
         ui.clearFiled();
        
     }
    

    e.preventDefault();
});
//event listener to delete 
document.getElementById('book-list').addEventListener('click',function(e){

    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book removed' , 'success');
    e.preventDefault();
});