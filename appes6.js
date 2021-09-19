class Book {
    constructor(title ,author ,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
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
    }

    showAlert(message,className){
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

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFiled(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = ''; 
    }
}

class Store {
    static getBooks(){
        let books ;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const  ui = new UI;
            ui.addBookToList(book);
        })

    }
    static addBooks(book){
        const books = Store.getBooks();
            books.push(book);
        

        localStorage.setItem('books',JSON.stringify(books));


    }

    static removeBooks(isbn){
        const books = Store.getBooks();
        books.forEach(function(book,index){
           if (book.isbn === isbn) {
               books.splice(index,1);
           }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}
document.addEventListener('DOMContentLoaded',Store.displayBooks)
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

         Store.addBooks(book);
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
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book removed' , 'success');
    e.preventDefault();
});