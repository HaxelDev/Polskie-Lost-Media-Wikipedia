const authButtons = document.getElementById('auth-buttons');

let currentUser = null;

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('articles-container').style.display = 'none';
    document.querySelector('.add-article-form').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('articles-container').style.display = 'none';
    document.querySelector('.add-article-form').style.display = 'none';
}

function cancelLoginOrRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('articles-container').style.display = 'block';
    document.querySelector('.add-article-form').style.display = 'block';
}

function showAuthButtons() {
    authButtons.style.display = 'block';
}

function hideAuthButtons() {
    authButtons.style.display = 'none';
}

function addNewArticle() {
	const articlesContainer = document.getElementById('articles-container');
	const titleInput = document.getElementById('title-input');
	const contentInput = document.getElementById('content-input');
	const imageInput = document.getElementById('image-input');
	const imagePreview = document.getElementById('image-preview');

	const newArticle = document.createElement('div');
	newArticle.classList.add('article');

	const newTitle = document.createElement('h2');
	newTitle.textContent = titleInput.value;

	const newContent = document.createElement('div');
	newContent.classList.add('article-content');
	newContent.textContent = contentInput.value;

	if (imageInput.files && imageInput.files[0]) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const newImage = document.createElement('img');
			newImage.src = e.target.result;
			newImage.alt = 'Zdjęcie do artykułu';
			newContent.appendChild(newImage);
		};
		reader.readAsDataURL(imageInput.files[0]);
	}

	newArticle.appendChild(newTitle);
	newArticle.appendChild(newContent);

    const deleteArticleBtn = document.createElement('button');
    deleteArticleBtn.classList.add('delete-article-btn');
    deleteArticleBtn.textContent = 'Usuń artykuł';
    deleteArticleBtn.onclick = function() {
        deleteArticle(this);
    };
    newArticle.appendChild(deleteArticleBtn);

	articlesContainer.appendChild(newArticle);

	titleInput.value = '';
	contentInput.value = '';
	imageInput.value = '';
	imagePreview.src = '';

    saveArticlesToLocalStorage();
}

function deleteArticle(button) {
    const article = button.closest('.article');
    if (article) {
        article.remove();
        saveArticlesToLocalStorage();
    }
}

function saveArticlesToLocalStorage() {
    const articlesContainer = document.getElementById('articles-container');
    const articles = articlesContainer.querySelectorAll('.article');

    const articlesData = [];
    articles.forEach(article => {
        const title = article.querySelector('h2').textContent;
        const content = article.querySelector('.article-content').textContent;
        articlesData.push({ title, content });
    });

    localStorage.setItem('articles', JSON.stringify(articlesData));
}

function loadArticlesFromLocalStorage() {
    const articlesContainer = document.getElementById('articles-container');
    const articlesData = JSON.parse(localStorage.getItem('articles')) || [];

    articlesData.forEach(articleData => {
        const newArticle = document.createElement('div');
        newArticle.classList.add('article');

        const newTitle = document.createElement('h2');
        newTitle.textContent = articleData.title;

        const newContent = document.createElement('div');
        newContent.classList.add('article-content');
        newContent.textContent = articleData.content;

        newArticle.appendChild(newTitle);
        newArticle.appendChild(newContent);

        const deleteArticleBtn = document.createElement('button');
        deleteArticleBtn.classList.add('delete-article-btn');
        deleteArticleBtn.textContent = 'Usuń artykuł';
        deleteArticleBtn.onclick = function() {
            deleteArticle(this);
        };
        newArticle.appendChild(deleteArticleBtn);

        articlesContainer.appendChild(newArticle);
    });
}

function showSection() {
	const sectionSelection = document.getElementById('section-selection');
	const selectedSection = sectionSelection.querySelector('#section').value;
	const articlesContainer = document.getElementById('articles-container');
	const announcementsContainer = document.getElementById('announcements-container');
    const addArticleForm = document.querySelector('.add-article-form');

	if (selectedSection === 'articles') {
		articlesContainer.style.display = 'block';
		announcementsContainer.style.display = 'none';
		addArticleForm.style.display = 'block';
	} else if (selectedSection === 'announcements') {
		articlesContainer.style.display = 'none';
		announcementsContainer.style.display = 'block';
		addArticleForm.style.display = 'none';
	}
}

function searchItems() {
	const searchInput = document.getElementById('search-input').value.toLowerCase();
	const articles = document.querySelectorAll('.article');
	const announcements = document.querySelectorAll('.announcement');

	articles.forEach(article => {
		const articleTitle = article.querySelector('h2').textContent.toLowerCase();
		const articleContent = article.querySelector('.article-content').textContent.toLowerCase();

		if (articleTitle.includes(searchInput) || articleContent.includes(searchInput)) {
			article.style.display = 'block';
		} else {
			article.style.display = 'none';
		}
	});

	announcements.forEach(announcement => {
		const announcementText = announcement.textContent.toLowerCase();

		if (announcementText.includes(searchInput)) {
			announcement.style.display = 'block';
		} else {
			announcement.style.display = 'none';
		}
	});
}

function previewImage(event) {
	const imagePreview = document.getElementById('image-preview');
	const selectedFile = event.target.files[0];

	if (selectedFile) {
		imagePreview.src = URL.createObjectURL(selectedFile);
	}
}

window.onload = function() {
    loadArticlesFromLocalStorage();

    const articles = document.querySelectorAll('.article');

    articles.forEach(article => {
        const title = article.querySelector('h2');
        const content = article.querySelector('.article-content');

        title.addEventListener('click', () => {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
};

showLoginForm();
showAuthButtons();
