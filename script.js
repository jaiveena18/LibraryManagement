const bookListElement = document.getElementById('booksContainer');
const loadingElement = document.getElementById('loading');
const paginationElement = document.getElementById('pagination');
const resultsPerPage = 10;
let currentPage = 1;
let books = [
  // Replace with your book data
  { title: 'Book 1', author: 'Author 1', subject: 'Subject 1', publishDate: '2023-01-01' },
  { title: 'Book 2', author: 'Author 2', subject: 'Subject 2', publishDate: '2023-02-01' },
  { title: 'Book 3', author: 'Author 3', subject: 'Subject 3', publishDate: '2023-09-01' },
  { title: 'Book 4', author: 'Author 4', subject: 'Subject 2', publishDate: '2023-03-01' },
  { title: 'Book 5', author: 'Author 5', subject: 'Subject 9', publishDate: '2023-04-01' },
  { title: 'Book 6', author: 'Author 6', subject: 'Subject 2', publishDate: '2023-08-01' },
  { title: 'Book 7', author: 'Author 7', subject: 'Subject 9', publishDate: '2023-07-01' },
  { title: 'Book 8', author: 'Author 2', subject: 'Subject 2', publishDate: '2023-06-01' },
  { title: 'Book 9', author: 'Author 2', subject: 'Subject 4', publishDate: '2023-08-01' },
  { title: 'Book 10', author: 'Author 3', subject: 'Subject 4', publishDate: '2023-11-01' },
  { title: 'Book 12', author: 'Author 3', subject: 'Subject 4', publishDate: '2023-02-01' },
  { title: 'Book 13', author: 'Author 4', subject: 'Subject 4', publishDate: '2023-02-01' },
  { title: 'Book 14', author: 'Author 5', subject: 'Subject 2', publishDate: '2023-11-01' },
  { title: 'Book 15', author: 'Author 5', subject: 'Subject 5', publishDate: '2023-11-01' },
  { title: 'Book 16', author: 'Author 5', subject: 'Subject 2', publishDate: '2023-02-01' },
  { title: 'Book 17', author: 'Author 5', subject: 'Subject 4', publishDate: '2023-03-01' },
  { title: 'Book 18', author: 'Author 6', subject: 'Subject 6', publishDate: '2023-02-01' },
  { title: 'Book 19', author: 'Author 6', subject: 'Subject 2', publishDate: '2023-12-01' },
  { title: 'Book 20', author: 'Author 6', subject: 'Subject 2', publishDate: '2023-12-01' },
  { title: 'Book 21', author: 'Author 6', subject: 'Subject 4', publishDate: '2023-12-01' },
  { title: 'Book 22', author: 'Author 7', subject: 'Subject 2', publishDate: '2023-08-01' },
  { title: 'Book 23', author: 'Author 7', subject: 'Subject 2', publishDate: '2023-02-01' },
  { title: 'Book 24', author: 'Author 7', subject: 'Subject 7', publishDate: '2023-02-01' },
  { title: 'Book 25', author: 'Author 9', subject: 'Subject 4', publishDate: '2023-02-01' },
  { title: 'Book 26', author: 'Author 8', subject: 'Subject 2', publishDate: '2023-02-01' },
  { title: 'Book 27', author: 'Author 8', subject: 'Subject 4', publishDate: '2023-01-01' },
  { title: 'Book 28', author: 'Author 9', subject: 'Subject 7', publishDate: '2023-06-01' },
  { title: 'Book 29', author: 'Author 3', subject: 'Subject 1', publishDate: '2023-07-01' },
  { title: 'Book 30', author: 'Author 7', subject: 'Subject 2', publishDate: '2023-08-01' },
  { title: 'Book 31', author: 'Author 9', subject: 'Subject 8', publishDate: '2023-05-01' },
  { title: 'Book 32', author: 'Author 9', subject: 'Subject 2', publishDate: '2023-04-01' },
  { title: 'Book 33', author: 'Author 9', subject: 'Subject 2', publishDate: '2023-03-01' },
  { title: 'Book 34', author: 'Author 9', subject: 'Subject 1', publishDate: '2023-12-01' },
  { title: 'Book 35', author: 'Author 9', subject: 'Subject 2', publishDate: '2023-11-01' },
  { title: 'Book 36', author: 'Author 1', subject: 'Subject 2', publishDate: '2023-11-01' },
  // Add more books as needed
];

function displayBooks() {
  bookListElement.innerHTML = '';
  loadingElement.style.display = 'block';

  setTimeout(() => {
    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;

    for (let i = startIdx; i < endIdx && i < books.length; i++) {
      const book = books[i];
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <p style="font-family:Verdana;">Author: ${book.author}</p>
        <p style="font-family:Verdana;">Subject: ${book.subject}</p>
        <p style="font-family:Verdana;">Publish Date: ${book.publishDate}</p>
      `;
      bookListElement.appendChild(bookDiv);
    }

    displayPagination();

    loadingElement.style.display = 'none';
    bookListElement.style.opacity = '1';
    bookListElement.style.animation = 'fadeIn 1s ease-in-out';
  }, 1500);
}

function displayPagination() {
  const totalPages = Math.ceil(books.length / resultsPerPage);
  paginationElement.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('span');
    pageLink.classList.add('pagination-link');
    pageLink.textContent = i;

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', () => {
      currentPage = i;
      displayBooks();
    });

    paginationElement.appendChild(pageLink);
  }
}

function filterBooks() {
  const title = document.getElementById('title').value.toLowerCase();
  const author = document.getElementById('author').value.toLowerCase();
  const subject = document.getElementById('subject').value.toLowerCase();
  const publishDate = document.getElementById('publishDate').value;

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(title) &&
    book.author.toLowerCase().includes(author) &&
    book.subject.toLowerCase().includes(subject) &&
    (publishDate === '' || book.publishDate === publishDate)
  );

  books = filteredBooks;
  currentPage = 1;
  displayBooks();
}

displayBooks();
