document.addEventListener('DOMContentLoaded', () => {
    console.log("Animalia Engine Loaded.");
    
    // Highlight the active menu item based on current URL
    const links = document.querySelectorAll('nav a');
    const currentFile = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.style.color = "#ffeb3b";
            link.style.fontWeight = "bold";
            link.style.fontSize = "1.3rem";
        }
    });

    displayComments();
});

function saveComment() {
    const nameInput = document.getElementById('username');
    const textInput = document.getElementById('comment-text');

    if (nameInput.value.trim() && textInput.value.trim()) {
        const comment = {
            name: nameInput.value,
            text: textInput.value,
            date: new Date().toLocaleString()
        };
        
        let comments = JSON.parse(localStorage.getItem('myComments')) || [];
        comments.push(comment);
        localStorage.setItem('myComments', JSON.stringify(comments));

        nameInput.value = '';
        textInput.value = '';
        displayComments();
    } else {
        alert("Please fill in both fields!");
    }
}

function displayComments() {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return; 

    const comments = JSON.parse(localStorage.getItem('myComments')) || [];
    commentsList.innerHTML = ''; 

    comments.slice().reverse().forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `
            <strong>${c.name}</strong> <small style="color: #666;">(${c.date})</small>
            <p style="margin: 5px 0;">${c.text}</p>
        `;
        commentsList.appendChild(div);
    });
}



const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 1. عند تحميل الصفحة: تحقق هل هناك ثيم محفوظ سابقاً؟
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// 2. عند الضغط على الزر: بدل الثيم واحفظه
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        
        const uName = document.getElementById('uName').value;
        const uEmail = document.getElementById('uEmail').value;
        const uTopic = document.getElementById('uTopic').value;

        
        const nameErr = document.getElementById('nameErr');
        const emailErr = document.getElementById('emailErr');
        const topicErr = document.getElementById('topicErr');

        let isValid = true;


        if (uName.trim().length < 5) {
            nameErr.textContent = "The name must consist of at least 5 letters.";
            isValid = false;
        } else {
            nameErr.textContent = "";
        }

       
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(uEmail)) {
            emailErr.textContent = "Please enter a valid email address.";
            isValid = false;
        } else {
            emailErr.textContent = "";
        }

        
        if (uTopic === "") {
            topicErr.textContent = "Please select one section";
            isValid = false;
        } else {
            topicErr.textContent = "";
        }
        
        if (isValid) {
            alert("Your request has been successfully submitted!");
         
            contactForm.reset();
        }
    });
}

