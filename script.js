window.onload = function() {
    const articles = document.querySelectorAll('.article');

    articles.forEach(article => {
        const title = article.querySelector('h2');
        const content = article.querySelector('.article-content');

        title.addEventListener('click', () => {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
};

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

	articlesContainer.appendChild(newArticle);

	titleInput.value = '';
	contentInput.value = '';
	imageInput.value = '';
	imagePreview.src = '';
}

function showSection() {
	const sectionSelection = document.getElementById('section-selection');
	const selectedSection = sectionSelection.querySelector('#section').value;
	const articlesContainer = document.getElementById('articles-container');
	const announcementsContainer = document.getElementById('announcements-container');

	if (selectedSection === 'articles') {
		articlesContainer.style.display = 'block';
		announcementsContainer.style.display = 'none';
	} else if (selectedSection === 'announcements') {
		articlesContainer.style.display = 'none';
		announcementsContainer.style.display = 'block';
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
