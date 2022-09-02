import view from "../utils/view.js";
import Story from "../components/Story.js"
import baseUrl from "../utils/baseUrl.js"
import Comment from "../components/Comment.js"
export default async function Item() {
    let story = null;
    let hasComments = false;
    let hasError = false;
    try {
        story = await getStory();
        hasComments = story.comments.length > 0;
    } catch(error) {
        hasError = true;
        console.error(error);
    };
    if (hasError) {
        view.innerHTML = `<div class="error">Error fetching story.</div>`
    } else {
        view.innerHTML = `
            <div>
                ${Story(story)}
            </div>
            <hr></hr>
            ${hasComments ? story.comments.map(comment => Comment(comment)).join("") : "No comments."}
        `
    }
};
async function getStory() {
    const storyId = window.location.hash.split("?id=")[1];
    const response = await fetch(`${baseUrl}/item/${storyId}`)
    const result = response.json();
    return result;
};
// ${hasComments ? story.comments.map(comment => JSON.stringify(comment)).join("") : "No comments."}
