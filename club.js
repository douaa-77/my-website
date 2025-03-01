document.addEventListener("DOMContentLoaded", function () {
    const clubContainer = document.getElementById("clubContainer");
    const createClubBtn = document.getElementById("createClubBtn");
    const clubNameInput = document.getElementById("clubNameInput");
    const discussionContainer = document.getElementById("discussionContainer");
    const postInput = document.getElementById("postInput");
    const postBtn = document.getElementById("postBtn");
    const pollContainer = document.getElementById("pollContainer");
    const pollQuestionInput = document.getElementById("pollQuestionInput");
    const pollOptionsInput = document.getElementById("pollOptionsInput");
    const createPollBtn = document.getElementById("createPollBtn");
    const themeSelector = document.getElementById("themeSelector");

    let clubs = JSON.parse(localStorage.getItem("bookClubs")) || [];
    let discussions = JSON.parse(localStorage.getItem("discussions")) || {};
    let polls = JSON.parse(localStorage.getItem("polls")) || {};
    let chatTheme = localStorage.getItem("chatTheme") || "light";

    document.body.classList.add(chatTheme);

    if (themeSelector) {
        themeSelector.addEventListener("change", function () {
            document.body.classList.remove(chatTheme);
            chatTheme = themeSelector.value;
            document.body.classList.add(chatTheme);
            localStorage.setItem("chatTheme", chatTheme);
        });
    }

    function renderClubs() {
        clubContainer.innerHTML = "";
        clubs.forEach((club) => {
            const clubDiv = document.createElement("div");
            clubDiv.classList.add("club");
            clubDiv.innerText = club;
            clubDiv.onclick = () => openClub(club);
            clubContainer.appendChild(clubDiv);
        });
    }

    function openClub(clubName) {
        discussionContainer.innerHTML = "";
        pollContainer.innerHTML = "";
        postInput.dataset.club = clubName;

        const clubDiscussions = discussions[clubName] || [];
        clubDiscussions.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerText = post;
            discussionContainer.appendChild(postDiv);
        });

        renderPolls(clubName);
    }

    createClubBtn.addEventListener("click", function () {
        const clubName = clubNameInput.value.trim();
        if (!clubName) return alert("Club name cannot be empty!");
        if (clubs.includes(clubName)) return alert("Club already exists!");

        clubs.push(clubName);
        localStorage.setItem("bookClubs", JSON.stringify(clubs));
        discussions[clubName] = [];
        polls[clubName] = [];
        localStorage.setItem("discussions", JSON.stringify(discussions));
        localStorage.setItem("polls", JSON.stringify(polls));
        renderClubs();
    });

    postBtn.addEventListener("click", function () {
        const postText = postInput.value.trim();
        const clubName = postInput.dataset.club;
        if (!clubName) return alert("Please select a club first!");
        if (!postText) return;

        discussions[clubName].push(postText);
        localStorage.setItem("discussions", JSON.stringify(discussions));
        openClub(clubName);
        postInput.value = "";
    });

    createPollBtn.addEventListener("click", function () {
        const pollQuestion = pollQuestionInput.value.trim();
        const pollOptions = pollOptionsInput.value.split(",").map(opt => opt.trim());
        const clubName = postInput.dataset.club;
        if (!clubName) return alert("Please select a club first!");
        if (!pollQuestion || pollOptions.length < 2) return alert("Enter a valid poll question with at least two options!");

        const newPoll = { question: pollQuestion, options: pollOptions, votes: {} };
        polls[clubName] = polls[clubName] || [];
        polls[clubName].push(newPoll);
        localStorage.setItem("polls", JSON.stringify(polls));
        renderPolls(clubName);
        pollQuestionInput.value = "";
        pollOptionsInput.value = "";
    });

    function renderPolls(clubName) {
        pollContainer.innerHTML = "";
        const clubPolls = polls[clubName] || [];

        clubPolls.forEach((poll) => {
            const pollDiv = document.createElement("div");
            pollDiv.classList.add("poll");

            const question = document.createElement("h3");
            question.innerText = poll.question;
            pollDiv.appendChild(question);

            poll.options.forEach((option) => {
                const optionBtn = document.createElement("button");
                optionBtn.innerText = `${option} (${poll.votes[option] || 0} votes)`;
                optionBtn.onclick = function () {
                    poll.votes[option] = (poll.votes[option] || 0) + 1;
                    localStorage.setItem("polls", JSON.stringify(polls));
                    renderPolls(clubName);
                };
                pollDiv.appendChild(optionBtn);
            });

            pollContainer.appendChild(pollDiv);
        });
    }

    renderClubs();
});
