// User Interface Variables
const form = document.getElementById('topic-form');
const topicList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-topics');
const filter = document.getElementById('filter');
const topicInput = document.getElementById('topic');

// Load all event listeners function call
loadEventListeners();

// Load all event listeners function declaration
function loadEventListeners() {
    // DOM load event from local storage
    document.addEventListener('DOMContentLoaded', getTopics);
    // Add topic event
    form.addEventListener('submit', addTopic);
    // Remove topic event
    topicList.addEventListener('click', removeTopic);
    // Remove all topics event
    clearBtn.addEventListener('click', clearTopics);
    // Filter through topics event
    filter.addEventListener('keyup', filterTopics);
}

// getTopics from LS
function getTopics() {
    let topics;
    if (localStorage.getItem('topics') === null) {
        topics = [];
    }
    else {
        topics = JSON.parse(localStorage.getItem('topics'));
    }

    topics.forEach(function(topic) {
        // Create li (list-item) element
        const li = document.createElement('li');
        // Add a class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(topic));
        // Create new link element
        const link = document.createElement('a');
        // Add href attribute
        link.setAttribute('href', '#');
        // Add a class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append the li to the ul
        topicList.appendChild(li);
    });
}

// addTopic function
function addTopic(e) {

    // some validation
    if(topicInput.value === '') {
        alert('Add a task');
    }

    // Create li (list-item) element
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(topicInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add href attribute
    link.setAttribute('href', '#');
    // Add a class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append the li to the ul
    topicList.appendChild(li);

    // Store topic in local storage
    storeTopicLocally(topicInput.value);

    // Clear input
    topicInput.value = '';

    e.preventDefault();
}

// Store Topic to Local Storage function
function storeTopicLocally(topic) {
    let topics;
    if(localStorage.getItem('topics') === null) {
        topics = [];
    }
    else {
        topics = JSON.parse(localStorage.getItem('topics'));
    }

    topics.push(topic);

    localStorage.setItem('topics', JSON.stringify(topics));
}

// remove topic function
function removeTopic(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTopicFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTopicFromLocalStorage(topicItem) {
    let topics;
    if (localStorage.getItem('topics') === null) {
        topics = [];
    }
    else {
        topics = JSON.parse(localStorage.getItem('topics'));
    }

    topics.forEach(function(topic, index) {
        if(topicItem.textContent === topic) {
            topics.splice(index, 1);
        }
    });

    localStorage.setItem('topics', JSON.stringify(topics));
}

// cleat all topics function
function clearTopics(e) {
    //topicList.innerHTML = '';

    // Faster
    while(topicList.firstChild) {
        topicList.removeChild(topicList.firstChild);
    }

    // Clear from LS
    clearTopicsFromLS();
}

// Clear Topics from LS
function clearTopicsFromLS() {
    localStorage.clear();
}

// Filter Topics
function filterTopics(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(topic) {
            const item = topic.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                topic.style.display = 'block';
            }
            else {
                topic.style.display = 'none';
            }
        }
    );
}