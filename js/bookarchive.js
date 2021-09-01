const output = document.getElementById("output");
const totalTitle = document.getElementById("totalTitle");

const searchbtn = () => {
  // get input value
  const inputBox = document.getElementById("inputField");
  const inputFieldValue = inputBox.value;
  inputBox.value = "";

  // clear
  output.innerHTML = "";
  totalTitle.innerText = "";

  if (inputFieldValue === "" || inputFieldValue === " ") {
    totalTitle.innerText = "Result Not found";
  } else {
    const url = `http://openlibrary.org/search.json?q=${inputFieldValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBook(data));
  }
};

const displayBook = (books) => {
  const bookDetails = books.docs;

  // output
  output.innerHTML = "";

  totalTitle.innerText = `total found ${bookDetails.length}`;
  if (bookDetails.length === 0) {
    totalTitle.innerText = "Your search not available";
  }
  bookDetails?.forEach((book) => {
    const div = document.createElement("div");
    div.innerHTML = `
                        <div class="card m-3" style="width: 18rem;">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="img">
                            <div class="card-body">
                                <p> <b>Book Name:</b> ${book.title}</p>
                                <p> <b>Autthor:</b> ${book.author_name ? book.author_name : "not found author name"}</p>
                                <p> <b>Publisher:</b> ${book.publisher ? book.publisher : "NOT FOUND fublisher"}</p>
                                <p> <b>first publish year:</b> ${book.first_publish_year ? book.first_publish_year : "not found "}</p>
                            </div>
                        </div>                       
                     `;
    output.appendChild(div);
  });
};
